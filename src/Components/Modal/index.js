import React, { useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalForm = ({ modal, setModal, toggle, setTask, setReducerData }) => {
  const ref = useRef(null);

  const getValue = () => {
    setModal(false);
    const task = ref.current.title.value;
    setTask(task);
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        <form id='form' onSubmit={setReducerData} ref={ref}>
          <input type="text" name='title' className="form-control" placeholder="Task title" />
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={toggle}>
          Close
        </button>
        <button type='submit' form='form' className="btn btn-primary" onClick={getValue}>
          Save
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalForm;