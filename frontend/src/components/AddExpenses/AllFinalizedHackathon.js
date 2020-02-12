import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
//import TextFieldGroup from "../common/TextFieldGroup";

import { getHackathons } from "../../actions/hackathonActions";

import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./AllFinalizedHackathon.css";

class AllFinalizedHackathon extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getHackathons();
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }

  render() {
    let details = "";
    const { hackathons } = this.props;
    if (hackathons != undefined) {
      details = hackathons.map((data, key) => {
        var ts = new Date();

        if (
          data.finalize !== true &&
          data.user.uuid == this.props.auth.user.uuid
        ) {
          return (
            <div>
              <div class="card mb-3" width="250">
                <div class="card-body">
                  <h5 class="card-title">
                    <h2>{data.eventName}</h2>
                  </h5>
                </div>

                <div class="card-body">
                  <h5 class="card-title">{data.description}</h5>
                  <h5 class="card-text" style={{ paddingTop: "20px" }}>
                    START DATE: {data.startDate}
                  </h5>
                  <p align="right">
                    <Link to={"/add-expense/" + data.id}>
                      <input
                        className="submitButton"
                        type="submit"
                        value="Add Expense"
                      />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          );
        }
      });
    } else {
    }
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col" />

          <div className="col-6 pt-5 pl-0">{details}</div>

          <div className="col" />
        </div>
      </div>
    );
  }
}

AllFinalizedHackathon.propTypes = {
  //auth:PropTypes.object.isRequired,
  errors: PropTypes.object,
  hackathons: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  hackathons: state.hackathon.hackathons
});

export default connect(
  mapStateToProps,
  { getHackathons }
)(withRouter(AllFinalizedHackathon));
