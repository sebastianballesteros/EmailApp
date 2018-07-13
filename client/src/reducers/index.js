import { combineReducers } from "redux";
//name from library, can't change it
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
  //auth piece of state is managed by the authReducer
  //ex. state.auth etc.
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
