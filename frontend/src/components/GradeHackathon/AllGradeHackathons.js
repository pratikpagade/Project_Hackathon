import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import TextFieldGroup from "../common/TextFieldGroup";
import { getDashboardDetails } from "../../actions/dashboardActions";
import {
  getHackathons,
  getGradeHackathons
} from "../../actions/hackathonActions";
import "./AllGradeHackathons.css";

import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

class AllGradeHackathons extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getGradeHackathons();
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }
  render() {
    let details = "";
    const { grade_hackathons } = this.props;
    if (grade_hackathons != undefined) {
      details = grade_hackathons.map((data, key) => {
        var ts = new Date();

        if (data.endDate < ts.toISOString()) {
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
                    <Link to={"/grade-hackathon/" + data.id}>
                      <input
                        className="submitButton"
                        type="submit"
                        value="GRADE"
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

AllGradeHackathons.propTypes = {
  //auth:PropTypes.object.isRequired,
  errors: PropTypes.object,
  grade_hackathons: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  grade_hackathons: state.hackathon.grade_hackathons
});

export default connect(
  mapStateToProps,
  { getGradeHackathons }
)(withRouter(AllGradeHackathons));
