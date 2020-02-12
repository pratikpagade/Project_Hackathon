import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "./authActions";

import { UPDATE_PROFILE, GET_ERRORS } from "./types";

export const updateProfile = (data, history) => dispatch => {
  console.log("Inside update profile request");
  console.log(data);
  axios
    .put("/user", data)
    .then(res1 => {
      console.log("User update response ", res1);
      alert("Profile updated");
      axios.get("/user").then(res => {
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
      });
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

export const getProfile = () => dispatch => {
  axios
    .get("/user")
    .then(res => {
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

    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
