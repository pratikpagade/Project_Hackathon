import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GRADE_TEAM, GET_ERRORS } from "./types";

export const gradeTeam = data => dispatch => {
  console.log("Inside grade team request");
  console.log(data);
  console.log(typeof data.grades);
  axios
    .put("/team/grade", data)
    .then(res => {
      console.log("Team update response ", res);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const submitCode = data => dispatch => {
  console.log("Inside submit code");
  console.log(data);
  axios
    .put("/team/submit", data)
    .then(res => {
      console.log("Code update response ", res);
      window.alert("URL submitted!");
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
