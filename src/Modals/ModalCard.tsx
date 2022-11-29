import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuid } from "uuid";
import { StandardComponentProps } from "../StandardProps/StandardProps";


type commentsProps = { id: string; author: string; content: string; }

interface ModalProps extends StandardComponentProps {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  updateCard: any;
  username: string;
  updateBoard: any;

}

function ModalCard({
  username,
  modalShow,
  updateCard,
  updateBoard,
  setModalShow,
  card,
  board,
}: ModalProps) {
  const [isShowButtons, setShowButtons] = useState(false);
  const [isShowButton, setShowButton] = useState(false);
  const [cardDescription, setCardDescription] = useState<string>("");
  const [isChanging, setChanging] = useState<{ [key: string]: boolean }>(
    {} as { [key: number]: boolean }
  );
  const [comment, setComment] = useState<
    { id: string; author: string; content: string } | undefined
  >({} as { id: string; author: string; content: string } | undefined);
  const [newComment, setNewComment] = useState<
    { id: string; author: string; content: string } | undefined
  >({} as { id: string; author: string; content: string } | undefined);

  const refDescription = useRef<HTMLDivElement>(null);
  const refComment = useRef<HTMLDivElement>(null);

  const addComment = (
    comments: commentsProps[] | undefined,
    comment: commentsProps | undefined
  ) => {
    if (!comment) {
      return;
    }

    const data = comments ? [...comments, comment] : [comment];

    updateCard(board, card, "comments", data);
    setShowButton(false);
    setComment(undefined);
  };

  const changeComment = (
    comments: commentsProps[] | undefined,
    newComment: commentsProps | undefined
  ) => {
    if (!comments || !newComment) {
      return;
    }

    const data = comments.map((c) => {
      if (c.id === newComment.id) {
        return { ...newComment };
      } else {
        return { ...c };
      }
    });

    updateCard(board, card, "comments", data);
    setChanging({ [newComment.id]: false });
  };

  const deleteComment = (
    comments: commentsProps[] | undefined,
    id: string
  ) => {
    const data = comments ? comments.filter((c) => c.id !== id) : undefined;
    updateCard(board, card, "comments", data);
  };

  const deleteCard = () => {
    const cards = board.cards.filter((c) => c.id !== card.id);
    updateBoard(board, "cards", cards);
    setModalShow(false);
  }

  const handleClickOutside = (event: { target: any }) => {
    if (
      refDescription.current &&
      !refDescription.current.contains(event.target as Node)
    ) {
      setShowButtons(false);
    }
    if (
      refComment.current &&
      !refComment.current.contains(event.target as Node)
    ) {
      setComment(undefined);
      setShowButton(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDescription, refComment]);

  // ---

  return (
    <Modal
      onHide={() => setModalShow(false)}
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="window">
        <Modal.Header closeButton>
          <div className="card-title">
            <div className="title">
              <i className="ri-bank-card-line" style={{ fontSize: "26px" }}></i>
              <Form.Control
                as="textarea"
                rows={1}
                defaultValue={card.title}
                onChange={(e) =>
                  updateCard(board, card, "title", e.target.value)
                }
              />
            </div>
            <div className="buttons">
              <Button variant="outline-secondary" onClick={deleteCard}>
                Удалить карточку
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="card-about">
            в колонке <span className="important-text">{board.title}</span>{" "}
            <br />
            автор карточки <span className="important-text">{card.author}</span>
          </div>
          <div className="card-actions" onFocus={() => setShowButtons(true)}>
            <div className="subtitle">
              <i className="ri-file-text-line"></i>
              Описание
            </div>
            <div ref={refDescription}>
              <Form.Control
                as="textarea"
                rows={4}
                defaultValue={card.description}
                placeholder="Добавить более подробное описание..."
                onChange={(e) => setCardDescription(e.target.value)}
              />
              {isShowButtons && (
                <div className="buttons">
                  <Button
                    onClick={() => {
                      updateCard(board, card, "description", cardDescription);
                      setShowButtons(false);
                    }}
                  >
                    Сохранить
                  </Button>
                  <div
                    className="close-new-card"
                    onClick={() => setShowButtons(false)}
                  >
                    <i className="ri-close-line" style={{ fontSize: '30px' }}></i>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-actions" onFocus={() => setShowButton(true)}>
            <div className="subtitle">
              <i className="ri-file-list-line" ></i>
              Действия
            </div>
            <div ref={refComment}>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Напишите комментарий"
                value={comment?.content || ""}
                onChange={(e) =>
                  setComment({
                    id: uuid(),
                    author: username,
                    content: e.target.value,
                  })
                }
              />
              {isShowButton && (
                <div className="buttons">
                  <Button onClick={() => addComment(card.comments, comment)}>
                    Сохранить
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="card-actions">
            {card.comments && card.comments?.length > 0 && (
              <div className="subtitle">Комментарии</div>
            )}
            {card.comments &&
              card.comments.map((comment) => (
                <div key={comment.id} className="card-comment" >
                  <i className="ri-user-fill" style={{padding: "0 5px"}}></i>
                  <div className="comment-container">
                    <span className="important-text">{comment.author}</span>
                    <div className="comment-content">
                      {isChanging[comment.id] ? (
                        <div>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            defaultValue={comment.content}
                            onChange={(e) =>
                              setNewComment({
                                id: comment.id,
                                author: comment.author,
                                content: e.target.value,
                              })
                            }
                          />
                          <div className="buttons">
                            <Button
                              onClick={() =>
                                changeComment(card.comments, newComment)
                              }
                            >
                              Сохранить
                            </Button>
                            <div
                              className="close-new-card"
                              onClick={() =>
                                setChanging({ [comment.id]: false })
                              }
                            >
                              <i className="ri-close-line" style={{ fontSize: '26px'}}></i>
                            </div>
                          </div>
                        </div>
                      ) : (
                        comment.content
                      )}
                    </div>
                    <div className="comment-reaction">
                      <span
                        className="link"
                        onClick={() => setChanging({ [comment.id]: true })}
                      >
                        Изменить
                      </span>
                      <span> - </span>
                      <span
                        className="link"
                        onClick={() => deleteComment(card.comments, comment.id)}
                      >
                        Удалить
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ModalCard;
