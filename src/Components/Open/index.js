import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";
import ModalForm from "../Modal";
import { AddOpenTask, ReanameOpenTask, RemoveOpenTask } from '../Store/Tasks';


const OpenComponents = ({ open, AddOpenTask, ReanameOpenTask, RemoveOpenTask }) => {
  const [task, setTask] = useState('');
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState('');

  const toggle = () => setModal(!modal);

  const setReducerData = (e) => {
    e.preventDefault();

    if (task) {
      if (edit) {
        ReanameOpenTask({ editID, task })
        setEdit(false);
        setEditID('');
      } else {
        AddOpenTask(task);
      }
    }
  };

  const deleteItem = id => RemoveOpenTask(id);

  const editFunc = id => {
    setEditID(id);
    setModal(true);
    setEdit(true);
  }

  return (
    <>
      <div className="mt-3">
        <div style={{ position: 'relative' }} className="card mb-3 p-3">
          <h3 className="text-center">
            Open
          </h3>
          {open.length ? <span style={{ background: 'crimson', position: 'absolute', right: '15px' }} className="badge badge-danger">{open.length}</span> : <></>}
        </div>
        <div className="card-body px-0">
          <ul style={{ listStyleType: 'none', padding: "0px", width: '100%' }}>
            {open.map((item, i) => (
              <li key={item.id} className="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
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

      {/* ======= Modal ======= */}
      <ModalForm toggle={toggle} modal={modal} setModal={setModal} setTask={setTask} setReducerData={setReducerData} />
      {/* ======= Modal ======= */}
    </>
  )
}

export default connect((state) => ({ open: state.open }), ({ AddOpenTask, ReanameOpenTask, RemoveOpenTask }))(OpenComponents);