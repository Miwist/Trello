

export interface BoardComponentProps {
    board: {
      id: string;
      title: string;
      cards: {
        id: string;
        title: string;
        description?: string;
        comments?: { id: string; author: string; content: string }[];
      }[];
    };
  
  }
  
  export interface CardComponentProps {
    card: {
        id: string;
        author: string;
        title: string;
        description?: string;
        comments?: { id: string; author: string; content: string }[];
      };
  }

  export interface StandardComponentProps extends CardComponentProps, BoardComponentProps {}