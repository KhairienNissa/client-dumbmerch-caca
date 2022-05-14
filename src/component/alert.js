import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';



 function AlertDelete({ show, handleClose, setConfirmDelete }) {

  const handleDelete = () => {
      setConfirmDelete(true)
  }
 
    return (
<>


        <Modal variant="dark" size='md' aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure Want To Delete This Data?</Modal.Body>
        <Modal.Footer>
          <Button className="buttonEdit" onClick={handleDelete}>
            Yes
          </Button>
          <Button className="buttonDelete" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
 </>  
    )
}
export default AlertDelete;