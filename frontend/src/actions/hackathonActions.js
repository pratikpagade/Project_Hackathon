import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_HACKATHON,
  GET_HACKATHONS,
  GET_ERRORS,
  GET_JUDGES,
  GET_GRADE_HACKATHONS,
  GET_HACKERS,
  JOIN_HACKATHON
} from "./types";

export const createHackathon = (data, history) => dispatch => {
  axios
    .post("/hackathon", data)
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon created");
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      window.alert("Hackathon event name already exists!");
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: { msg: "Hackathon event name already exists!" }
      });
    });
};

export const getJudges = () => dispatch => {
  console.log("get judges action");
  return axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_JUDGES,
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

export const getHackers = () => dispatch => {
  console.log("get hackers action");
  return axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_HACKERS,
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

export const getHackathons = () => dispatch => {
  console.log("here");
  axios
    .get("/hackathon/all")
    .then(res => {
      console.log(res);

      dispatch({
        type: GET_HACKATHONS,
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

export const getHackathon = id => dispatch => {
  console.log("here");
  axios
    .get(`/hackathon/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
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

export const getSponsors = () => dispatch => {
  console.log("get sponsor action");
  axios
    .get("/user/hackers")
    .then(res => {
      dispatch({
        type: GET_JUDGES,
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

export const getGradeHackathons = () => dispatch => {
  console.log("get Hcakathons to be graded action");
  axios.get("/hackathon/judging").then(res => {
    console.log("INside get grade hackathon");
    console.log(res);

    dispatch({
      type: GET_GRADE_HACKATHONS,
      payload: res.data
    });
  });
};

export const startHackathon = id => dispatch => {
  console.log("here");

  axios
    .put(`/hackathon/start/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon started");
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

export const joinHackathon = () => dispatch => {
  console.log("here");

  axios
    .get("/hackathon")
    .then(res => {
      console.log("response");
      console.log(res);
      dispatch({
        type: JOIN_HACKATHON,
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

// set profile name
export const createTeam = (data, history) => dispatch => {
  //const id= ${id}
  const teamId = data.teamId;
  const registerData = {
    hackathonId: data.hackathonId,
    teamName: data.teamName
  };
  const TeamMembers = data.TeamMembers;
  if (data.teamId == "") {
    axios
      .post(`/hackathon/register`, registerData)
      .then(res => {
        console.log(res.data);
        // var inviteData1 = {};
        if (TeamMembers[0].name !== "") {
          TeamMembers.map(item => {
            var inviteData1 = {
              teamId: Number(res.data.id),
              uuid: item.name,
              role: item.role
            };
            axios
              .post("/team/invite", inviteData1)
              .then(res1 => {
                console.log(res1);
                dispatch({
                  type: GET_ERRORS,
                  payload: {}
                });
                history.push("/dashboard");
              })
              .catch(err =>
                dispatch({
                  type: GET_ERRORS,
                  payload: {
                    msg: "User has already registered for this hackathon"
                  }
                })
              );
          });
        } else {
          history.push("/dashboard");
        }
        // console.log(inviteData);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: { msg: "User has already registered for this hackathon" }
        })
      );
  } else {
    if (TeamMembers[0].name !== "") {
      TeamMembers.map(item => {
        var inviteData1 = {
          teamId: teamId,
          uuid: item.name,
          role: item.role
        };
        axios
          .post("/team/invite", inviteData1)
          .then(res1 => {
            console.log(res1);
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
              payload: {}
            });
          });
      });
    } else {
      history.push("/dashboard");
    }
  }
};

export const endHackathon = id => dispatch => {
  console.log("here");

  axios
    .put(`/hackathon/end/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon has ended");
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

export const updateEndDate = id => dispatch => {
  axios
    .put(`/hackathon/startend/${id}`)
    .then(res => {
      //console.log(res);
      dispatch({
        type: GET_HACKATHON,
        payload: res.data
      });
      alert("Hackathon end date set to 7 days from now");
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
