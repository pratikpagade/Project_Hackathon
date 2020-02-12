import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import{GET_DASHBOARD_DETAILS} from "./types";

export const getDashboardDetails=()=>dispatch=>{
    axios
        .get("/api/dashboard")
        .then(res=>
            dispatch({
                type:GET_DASHBOARD_DETAILS,
                payload:res.data
            })
        )
        .catch(err=>
            dispatch({
                type:GET_DASHBOARD_DETAILS,
                payload:{}
            })
        );
};