import { combineReducers } from "redux";
import notesReducer from "./notesReducer";

const rootReducer = combineReducers({
  notesData: notesReducer,
});

export default rootReducer;
