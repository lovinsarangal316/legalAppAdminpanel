import React from 'react'
import { Button, Modal } from "react-bootstrap";
import Loader from '../loaders/Loader';
import { IoMdDownload } from 'react-icons/io';
import { baseUrlForImage, handleImageDownload } from '../../helper';

const DocumentPopup = ({ show, hide, document }) => {
  const imageUrl = document
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Attachment </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          document ? <div className='position-relative'>
            <button className="btn btn-dark" style={{ position: "absolute", right: "0" }} onClick={() => handleImageDownload(imageUrl, document)}>
              <IoMdDownload size={20} />
            </button>
            <img src={imageUrl} alt="attachmentPic" style={{ width: "100%", height: "250px" }} />
          </div> : <Loader />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DocumentPopup