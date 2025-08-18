import React from "react";
import { Button, Modal } from "react-bootstrap";
import BtnLoader from "../loaders/BtnLoader"
const ConfirmationModal = ({ show, hide, success, modalHeading, loading }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalHeading} </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to {modalHeading} ?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hide}>
          No
        </Button>
        <Button variant="primary" onClick={success}>
          {loading ? <BtnLoader /> : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
