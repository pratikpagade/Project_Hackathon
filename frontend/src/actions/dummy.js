import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

axios.defaults.withCredentials = true;
export function dummy() {
  return dispatch => {
    console.log("Action started on dummy request");
  };
}
