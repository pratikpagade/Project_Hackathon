import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import hackathonReducer from "./hackathonReducer"
import organization from "./organizationReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  hackathon: hackathonReducer,
  organization:organization
});
