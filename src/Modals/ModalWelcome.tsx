import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface StandardComponentProps {
  username: string;
  updateUsername: any;
}

const ModalWelcome = ({ username, updateUsername }: StandardComponentProps) => {
  const [modalShow, setModalShow] = React.useState(true);
  const [nameError, setNameError] = useState('');

  const saveUsername = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();

    if (validate()) {
      localStorage.setItem('username', username);
      setModalShow(false);
    }
  };

  const validate = () => {
    let isValid = true;

    if (!username) {
      isValid = false;
      setNameError('Пожалуйста, введите ваше имя.');
    }

    return isValid;
  };

  //--

  return (
    <Modal
      show={modalShow}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          <i className="ri-trello-line" style={{ fontSize: " 20px",padding: '5px'}}></i>
          Добро пожаловать в Trello
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId='floatingInput'
          label='Ваше имя'
          className='mb-3'>
          <Form.Control
            className='form-control'
            required
            type='text'
            name='name'
            defaultValue={username}
            onChange={(e: any) =>
              updateUsername(
                e.target.value.match('^[a-zA-Zа-яА-Я ]*$') !== null
                  ? e.target.value
                  : ''
              )
            }
          />
          <div className='text-danger'>{nameError}</div>
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' onClick={saveUsername}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWelcome;
