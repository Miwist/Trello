import React, { useCallback, useState } from "react";
import ModalCard from "../Modals/ModalCard";
import Card from "../Cards/Card";
import AddingCard from "../Cards/AddingCard";

interface StandardComponentProps {
  board: {
    id: string;
    title: string;
    cards: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }[];

  };
  username: string;
  updateBoard: any;
}

const Board = ({ username, board, updateBoard }: StandardComponentProps) => {
  const [isNewCard, setNewCard] = useState<{ [key: string]: boolean }>();
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [card, setCard] = React.useState(
    {} as {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }
  );

  const toggleNewCard = (id: string, state: boolean) => {
    setNewCard((isNewCard) => ({
      ...isNewCard,
      [id]: state,
    }));
  }

  const addCard = (
    board: StandardComponentProps, cardTitle: string, id: string,
  ) => {
    updateBoard(board, "add card", cardTitle);
    toggleNewCard(id, false);
  }

  const updateCard = useCallback(
    (board: any, card: any, key: any, value:any) => {
      setCard((c) => ({
        ...c,
        [key]: value,
      }));

      const cards = board.cards.map(
        (c: {
          id: string;
          author: string;
          title: string;
          description?: string;
          comments?: { id: string; author: string; content: string }[];
        }) => {
          if (c.id !== card.id) {
            return { ...c };
          }
          return {
            ...card,
            [key]: value,
          };
        }
      );

      updateBoard(board, "cards", cards);
    },
    [updateBoard]
  );

  const update = (card: {
    id: string;
    author: string;
    title: string;
    description?: string;
    comments?: { id: string; author: string; content: string }[];
  }, board: StandardComponentProps) => {
    setCard(card);
    updateBoard(board);
    setModalShow(true);
  }

  // --

  return (
    <>
      <ModalCard
        username={username}
        card={card}
        board={board}
        updateCard={updateCard}
        updateBoard={updateBoard}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
      <div className="board">
        <div className="board-title">
          <input
            key={board.id}
            type="text"
            name="board-title"
            defaultValue={board.title}
            onChange={(e) => updateBoard(board, "title", e.target.value)}
          />
        </div>
        {board.cards.length > 0 &&
          board.cards.map((card) => <Card board={board} card={card} updateBoard={update} />)}
        {!isNewCard?.[board.id] && (
          <div
            className="add-card"
            onClick={() => toggleNewCard(board.id, true)}
          >
            <i className="ri-add-box-line" style={{ padding: "5px" }}></i>
            Добавить карточку
          </div>
        )}
        {isNewCard?.[board.id] && <AddingCard board={board} addCard={addCard} toggleNewCard={toggleNewCard} />}
      </div>
    </>
  );
};

export default Board;
