import reducers from "../Store/Tasks";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: reducers,
});