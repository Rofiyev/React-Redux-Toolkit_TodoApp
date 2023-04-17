import { createAction } from "@reduxjs/toolkit";
import { randomID } from "create-random-id";

// Random ID
const length = 18;
const type = "letter" || ["letter", "number", "symbol"];


// Action
export const AddOpenTask = createAction('ADD_TASK_OPEN');
export const RemoveOpenTask = createAction('REMOVE_TASK_OPEN');
export const ReanameOpenTask = createAction('RENAME_TASK_OPEN');

export const AddTaskInprogress = createAction('ADD_TASK_INPROGRESS');
export const RemoveTaskInprogress = createAction('REMOVE_TASK_INPROGRESS');;
export const RenameTaskInporgress = createAction('RENAME_TASK_INPROGRESS')

export const AddTasksCompleted = createAction('ADD_TASK_COMPLETED');
export const RemoveTaskCompeted = createAction('REMOVE_TASK_COMPLETED');
export const RenameTaskCompleted = createAction('RENAME_TASK_COMPLETED');


// Initial State
const initialState = {
  open: [
    { id: randomID(length, type), title: 'Task 1' },
    { id: randomID(length, type), title: 'Task 2' },
    { id: randomID(length, type), title: 'Task 3' },
  ],
  inprogress: [
    { id: randomID(length, type), title: 'Task 1' },
    { id: randomID(length, type), title: 'Task 2' },
  ],
  completed: [
    { id: randomID(length, type), title: 'Task 1' },
    { id: randomID(length, type), title: 'Task 2' },
  ],
  posts: []
};

// Reducers
export default function reducers(state = initialState, action) {
  let data;
  switch (action.type) {

    case AddOpenTask.type:
      data = { ...state };
      return { ...state, open: [...data.open, { id: data.open.length + 1, title: action.payload }] };

    case RemoveOpenTask.type:
      return { ...state, open: [...state.open.filter(data => data.id !== action.payload)] };

    case ReanameOpenTask.type:
      return { ...state, open: state.open.map((data, i) => i === action.payload.editID ? ({ id: randomID(length, type), title: action.payload.task }) : data) };

    case AddTaskInprogress.type:
      data = { ...state };
      return { ...state, inprogress: [...data.inprogress, { id: data.inprogress.length + 1, title: action.payload }] };

    case RemoveTaskInprogress.type:
      return { ...state, inprogress: [...state.inprogress.filter(data => data.id !== action.payload)] };

    case RenameTaskInporgress.type:
      return { ...state, inprogress: state.inprogress.map((data, i) => i === action.payload.editID ? ({ id: randomID(length, type), title: action.payload.task }) : data) };

    case AddTasksCompleted.type:
      data = { ...state };
      return { ...state, completed: [...data.completed, { id: data.completed.length + 1, title: action.payload }] };

    case RemoveTaskCompeted.type:
      return { ...state, completed: [...state.completed.filter(data => data.id !== action.payload)] };

    case RenameTaskCompleted.type:
      return { ...state, completed: state.completed.map((data, i) => i === action.payload.editID ? ({ id: randomID(length, type), title: action.payload.task }) : data) };

    case 'GET_TODOS':
      data = { ...state };
      const newPosts = [...data.posts, ...action.payload];
      return { ...state, posts: newPosts }

    default:
      return state;
  }
}