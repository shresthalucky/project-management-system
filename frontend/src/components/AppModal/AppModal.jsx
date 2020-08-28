import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AppModal({ show, hideHandler, title, submitHandler, children }) {

  return (
    <Modal
      show={show}
      onHide={hideHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideHandler}>Cancel</Button>
        <Button variant="primary" onClick={submitHandler}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AppModal;
