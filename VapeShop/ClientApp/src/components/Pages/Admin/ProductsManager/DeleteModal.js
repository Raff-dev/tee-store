import React from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'

export const DeleteModal = ({ modalState, handleClose, handleDelete }) => {
    const { show, name, object, id } = modalState;

    return (
        <Modal show={show == 'Delete'} animation={false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete action</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are about to delete {name}</Modal.Body>
            <Modal.Footer>
                <Button color="primary" onClick={handleClose}>
                    Close
                </Button>
                <Button color="secondary" onClick={() => handleDelete(object, id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
