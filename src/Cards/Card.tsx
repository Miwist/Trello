import React from "react";
import {StandardComponentProps} from "../StandardProps/StandardProps"


 interface CardProps extends StandardComponentProps {

  updateBoard: any;
}


const Card = ({ board, card, updateBoard }: CardProps) => {

  const openCard = ({ board, card }:StandardComponentProps) => {
    updateBoard(card, board);
  }

  return (
    <div className="card" onClick={() => openCard({ board, card })}>
      <div className="card-title">{card.title}</div>
      {card.comments && card.comments.length > 0 && (
        <div className="card-comments">
          <i className="ri-chat-2-line"></i>
          {card.comments.length}
        </div>
      )}
    </div>
  );
};

export default Card;