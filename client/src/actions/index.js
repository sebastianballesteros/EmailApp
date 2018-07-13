//to make AJAX requests
import axios from "axios";

export const fetchUser = () => {
  //whenever the action creator is called
  //it will return a function
  //reduxThunk will call it with the dispatch and then we make the request
  //once we have it then we dispatch it
  return async function(dispatch) {
    const res = await axios.get("/api/current_user");
    dispatch({
        type: "fetch_user",
        payload: res.data
      });
  };
};

//same as before but refactorized with JSX6
export const handleToken = (token) => async dispatch => {
  //post request to a backend server with the token received from transaction
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: "fetch_user",
    payload: res.data
  });
};

export const submitSurvey = (values, history) => async dispatch =>  {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  //everything went ok
  dispatch({
    type: "fetch_user",
    payload: res.data
  });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("api/surveys");
  dispatch({
    type: "fetch_surveys",
    payload:res.data
  });
};
