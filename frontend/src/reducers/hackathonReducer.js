import isEmpty from "../validation/is-empty";

import {
  GET_HACKATHON,
  GET_HACKATHONS,
  GET_JUDGES,
  GET_GRADE_HACKATHONS,
  GET_HACKERS,
  JOIN_HACKATHON
} from "../actions/types";

const initialState = {
  hackathon: {},
  hackathons: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HACKATHON:
      return {
        ...state,
        hackathon: action.payload
      };
    case GET_HACKATHONS:
      //console.log(action.payload);
      return {
        ...state,
        hackathons: action.payload
      };
    case GET_JUDGES:
      return {
        ...state,
        judges: action.payload
      };
    case JOIN_HACKATHON:
      return {
        ...state,
        submithackathons: action.payload
      };

    case GET_GRADE_HACKATHONS:
      //console.log(action.payload);
      return {
        ...state,
        grade_hackathons: action.payload
      };
    case GET_HACKERS:
      return {
        ...state,
        hackers: action.payload
      };
    default:
      return state;
  }
}
