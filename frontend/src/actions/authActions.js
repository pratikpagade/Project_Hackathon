import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { persistor } from "../store";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  localStorage.setItem("username", userData.screenName);

  // Set token to Auth header
  // Decode token to get user data

  // Set current user

  axios
    .post("/user", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      window.alert("Email or Screen Name already exists");
      dispatch({
        type: GET_ERRORS,
        payload: { msg: "Email or Screen Name already exists" }
      });
    });
};

// Login - Get User Token
export const loginUser = (userData, token) => dispatch => {
  setAuthToken(token);
  axios
    .get("/user", userData)
    .then(res => {
      // Save to localStorage
      console.log(res);

      // Set token to ls
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", res.data.screenName);
      localStorage.setItem("uuid", userData.uuid);
      localStorage.setItem("userType", res.data.authorities[0].authority);

      console.log(token);
      // Set token to Auth header
      //setAuthToken(token);

      // Decode token to get user data

      // Set current user
      const user = {
        uuid: res.data.uuid,
        screenName: res.data.screenName,
        name: res.data.name,
        email: res.data.email,
        bussinessTitle: res.data.bussinessTitle,
        organization: res.data.organization,
        photoUrl: res.data.photoUrl,
        aboutMe: res.data.aboutMe,
        address: res.data.address,
        judging: res.data.judging,
        teams: res.data.teams,
        username: res.data.username
        //userType:res.data.authorities[0].authority
      };
      //console.log(user);
      dispatch(setCurrentUser(user));
    })
    .catch(
      err => console.log(err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userType");
  localStorage.removeItem("username");
  localStorage.removeItem("uuid");
  localStorage.removeItem("persist:root");
  // Remove auth header for future requests
  setAuthToken(false);
  persistor.purge();
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearErrors());
  if (history !== undefined) {
    history.push("/login");
  }
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
