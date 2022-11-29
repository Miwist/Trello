import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {BoardComponentProps} from "../StandardProps/StandardProps"


interface AddingProps extends BoardComponentProps {
    addCard: any,
    toggleNewCard: any,
   
}

const AddingCard = ({board, addCard, toggleNewCard}: AddingProps) => {
  const [cardTitle, setCardTitle] = useState("");


    return (
        <div className="new-card">
        <Form.Control
          as="textarea"
          rows={2}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <div className="buttons">
          <Button onClick={() => addCard(board, cardTitle)}>
            Добавить карточку
          </Button>
          <div
            className="close-new-card"
            onClick={() => toggleNewCard(board.id, false)}
          >
            <i className="ri-close-line" style={{fontSize: '26px', padding: '5px'}}></i>
          </div>
        </div>
      </div>
    )
}

export default AddingCard;