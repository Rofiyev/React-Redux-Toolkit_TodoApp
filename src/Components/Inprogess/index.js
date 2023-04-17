import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";
import ModalForm from "../Modal";
import { AddTaskInprogress, RemoveTaskInprogress, RenameTaskInporgress } from '../Store/Tasks';

const InprogressComponent = ({ inprogress, AddTaskInprogress, RemoveTaskInprogress, RenameTaskInporgress }) => {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState('');
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState('');

  const toggle = () => setModal(!modal);

  const setReducerData = (e) => {
    e.preventDefault();

    if (task) {
      if (edit) {
        RenameTaskInporgress({ editID, task });
        setEditID('');
        setEdit(false);
      } else {
        AddTaskInprogress(task)
      }
    }
  }

  const deleteItem = id => RemoveTaskInprogress(id);

  const editFunc = id => {
    setEdit(true);
    setModal(true);
    setEditID(id);
  }

  return (
    <>
      <div className="mt-3">
        <div style={{ position: 'relative' }} className="card mb-3 p-3">
          <h3 className="text-center">Inprogress</h3>
          {inprogress.length ? <span style={{ background: 'crimson', position: 'absolute', right: '15px' }} className="badge badge-danger">{inprogress.length}</span> : <></>}
        </div>
        <div className="card-body px-0">
          <ul style={{ listStyleType: 'none', padding: "0px", width: '100%' }}>
            {inprogress.map((item, i) => (
              <li key={item.id} className="d-flex align-items-center justify-content-between border p-3 rounded mb-2">
                <h5>{item.title}</h5>
                <div className="btns d-flex flex-column gap-4">
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => editFunc(i)} icon={faEdit} />
                  <FontAwesomeIcon style={{ cursor: 'pointer', transform: 'scale(1.2)' }} onClick={() => deleteItem(item.id)} icon={faXmark} />
                </div>
              </li>
            ))}
          </ul>
          <div className="btns">
            <button className="btn btn-dark" onClick={toggle}>Add Task</button>
          </div>
        </div>
      </div>

      {/* =========== Modal ========= */}
      <ModalForm modal={modal} setModal={setModal} toggle={toggle} setTask={setTask} setReducerData={setReducerData} />
      {/* =========== Modal ========= */}
    </>
  )
}

export default connect((state) => ({ inprogress: state.inprogress }), ({ AddTaskInprogress, RemoveTaskInprogress, RenameTaskInporgress }))(InprogressComponent)