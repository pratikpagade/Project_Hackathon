import React, { Component } from "react";
//import { Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import { Provider } from "react-redux";
import { store } from "../store";

import PrivateRoute from "./common/PrivateRoute";

import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Dashboard from "./DashBoard/Dashboard.js";

import CreateHackathon from "./CreateHackathon/CreateHackathon";
import JoinHackathon from "./JoinHackathon/JoinHackathon";
import GradeHackathon from "./GradeHackathon/GradeHackathon";
import Organization from "./Organization/Organization";
import AllGradeHackathons from "./GradeHackathon/AllGradeHackathons";
import Checkout from "./Checkout/Checkout";
import Profile from "./Profile/Profile";
import Submissions from "./Submissions/Submissions";
import Results from "./Results/Results";
import PaymentReport from "./PaymentReport/PaymentReport";
import EarningReport from "./EarningReport/EarningReport";
import FinalizeHackathon from "./FinalizeHackathon/FinalizeHackathon";
import AllFinalizedHackathon from "./AddExpenses/AllFinalizedHackathon";
import AddExpenses from "./AddExpenses/AddExpenses";

//Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/create-hackathon" exact component={CreateHackathon} />
          <Route path="/join-hackathon/:id" exact component={JoinHackathon} />
          <Route path="/grade-hackathon/:id" exact component={GradeHackathon} />
          <Route path="/add-expense/:id" exact component={AddExpenses} />
          <Route path="/organization" exact component={Organization} />
          <Route path="/profile" exact component={Profile} />
          <Route
            path="/finalize-hackathon"
            exact
            component={FinalizeHackathon}
          />

          <Route
            path="/all-grade-hackathons"
            exact
            component={AllGradeHackathons}
          />
          <Route
            path="/all-finalized-hackathon"
            exact
            component={AllFinalizedHackathon}
          />
          <Route path="/submissions" exact component={Submissions} />
          <Route path="/team/payment" exact component={Checkout} />
          <Route path="/results" exact component={Results} />
          <Route path="/payment-report" exact component={PaymentReport} />
          <Route path="/earning-report" exact component={EarningReport} />
        </Switch>
      </div>
    );
  }
}
//Export The Main Componentnp
export default Main;
