import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_ORGANIZATION, SET_ORGANIZATION, GET_ERRORS } from "./types";

export const createOrganization = (data, history) => dispatch => {
  axios
    .post("/organization", data)
    .then(res => {
      console.log("Organization response ", res);
      dispatch({
        type: SET_ORGANIZATION,
        payload: res.data
      });
      alert("Organization created");
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      window.alert(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: { msg: "Organization name already exists!" }
      });
    });
};

export const getOrganization = () => dispatch => {
  console.log("get organization action");
  return axios
    .get("/organization/all")
    .then(res => {
      dispatch({
        type: GET_ORGANIZATION,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const addOrganization = (data, history) => dispatch => {
  console.log("Add organization");
  axios
    .post("/organization/join/request", data)
    .then(res => {
      console.log("Organization response ", res);
      window.alert("Request sent to add Organization");
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const leaveOrganization = () => dispatch => {
  console.log("Add organization");
  axios
    .put("/user/leaveorganization")
    .then(res => {
      console.log("Organization response ", res);
      window.alert("Left Organization");
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
