import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  //auth piece of state is managed by the authReducer
  auth: authReducer
});
