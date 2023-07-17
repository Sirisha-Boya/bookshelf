import userReducer from "./UserReducer";
import bookReducer from "./BookReducer";
import { combineReducers } from "redux";

var RootReducer = combineReducers({
  users: userReducer,
  books: bookReducer,
});

export default RootReducer;
