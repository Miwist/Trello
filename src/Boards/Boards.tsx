import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWelcome from '../Modals/ModalWelcome';
import Board from './Board';
import { v4 as uuid } from 'uuid';

const Boards = () => {
  const [username, setUsername] = useState<string>(
    (localStorage.getItem('username') as string) || ''
  );
  const [boards, setBoards] = useState<
    {
      id: string;
      title: string;
      cards: {
        id: string;
        title: string;
        author: string;
        description?: string;
        comments?: { id: string; author: string; content: string }[];
      }[];
    }[]
  >(
    JSON.parse(localStorage.getItem('boards') as string) || [
      { id: uuid(), title: 'TODO', cards: [] },
      { id: uuid(), title: 'In Progress', cards: [] },
      { id: uuid(), title: 'Testing', cards: [] },
      { id: uuid(), title: 'Done', cards: [] },
    ]
  );

  const updateBoard = useCallback(
    (board:any, key: string, value: string) => {
      setBoards((boards) => {
        let data;

        if (key === 'add card') {
          data = boards.map((b) =>
            b.id === board.id
              ? {
                  ...b,
                  cards: [
                    ...b.cards,
                    { id: uuid(), title: value, author: username },
                  ],
                }
              : { ...b }
          );
        } else {
          data = boards.map((b) =>
            b.id === board.id
              ? {
                  ...board,
                  [key]: value,
                }
              : { ...b }
          );
        }

        localStorage.setItem('boards', JSON.stringify(data));
        return data;
      });
    },
    [username]
  );

  const updateUsername = useCallback((value:string) => {
    setUsername(value);
  }, []);

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  // ---

  return (
    <>
      <ModalWelcome username={username} updateUsername={updateUsername} />
      <div className='boards'>
        {boards.map((board) => (
          <Board username={username} board={board} updateBoard={updateBoard} />
        ))}
      </div>
    </>
  );
};

export default Boards;
