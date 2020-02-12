import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { getDashboardDetails } from "../../actions/dashboardActions";
import {
  getHackathons,
  startHackathon,
  endHackathon,
  getJudges,
  getHackers,
  updateEndDate
} from "../../actions/hackathonActions";
import { getOrganization } from "../../actions/organizationActions";
import "./Dashboard.css";
import Profile from "./Profile";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      isEnterEndDat: false,
      events: [
        {
          name: "HACK 2015",
          description:
            "It is all about 2015 where angular has become famous and should work on MEAN stack. Great way to start your coding through through this hack where judges would be the GURUS of MEAN stack",
          hDate: "02/15/2015"
        },
        {
          name: "HACK 2016",
          description:
            "2016 has come with great opportunities in KAFKA and best of messaging queues for distributed systems",
          hDate: "03/12/2016"
        },
        {
          name: "HACK 2017",
          description:
            "Lets turn on into MERN stack this year with React being the heart of the application",
          hDate: "05/11/2017"
        }
      ],
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
    console.log("Component in ", this.props.auth.user.screenName);
    this.props.getHackathons();
    this.props.getHackers();

    //console.log("Component hackathons ", this.props);
    //this.props.getJudges();
    //this.props.getOrganization();
  }

  onStartDateClick = (data, endDate) => {
    var ts = new Date();

    if (endDate < ts.toISOString()) {
      this.props.updateEndDate(data);
    }
    this.props.startHackathon(data);
  };

  onendDateClick = data => {
    this.props.endHackathon(data);
  };

  checkStartHackathon = (id, is_graded, startDate, endDate) => {
    var ts = new Date();

    if (
      (is_graded == false && endDate < ts.toISOString()) ||
      startDate > ts.toISOString()
    ) {
      return true;
    } else if (is_graded == true) return false;
    else if (endDate > ts.toISOString() && startDate < ts.toISOString())
      return false;
  };

  render() {
    console.log("checking the store", this.props.auth);
    console.log("hackathons found ", this.props);
    const userType = localStorage.getItem("userType");
    const { hackathons } = this.props;
    console.log(hackathons);
    if (this.props.hackathon != undefined) {
      console.log("not underinred");
    }
    let details;
    if (userType == "USER") {
      details = hackathons.map((data, key) => {
        if (
          data.finalize !== true &&
          data.graded !== true &&
          data.endDate > this.state.currentDate.toISOString()
        ) {
          var dStartDate = data.startDate;
          dStartDate = dStartDate.substring(0, 10);

          var dStartTime = data.startDate;
          dStartTime = dStartTime.substring(11, 16);

          var dEndDate = data.endDate;
          dEndDate = dEndDate.substring(0, 10);

          var dEndTime = data.endDate;
          dEndTime = dEndTime.substring(11, 16);

          var currentDate = new Date();
          currentDate = currentDate.toISOString();
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
                    START DATE: {dStartDate} at {dStartTime}
                  </h5>

                  <h5 class="card-text" style={{ paddingTop: "20px" }}>
                    END DATE: {dEndDate} at {dEndTime}
                  </h5>
                  <p align="right">
                    <Link to={"/join-hackathon/" + data.id}>
                      <input
                        className="submitButton"
                        type="submit"
                        value="JOIN"
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
      details = hackathons.map((data, key) => {
        if (
          data.finalize !== true &&
          data.user.uuid == this.props.auth.user.uuid
        ) {
          var dStartDate = data.startDate;
          dStartDate = dStartDate.substring(0, 10);

          var dStartTime = data.startDate;
          dStartTime = dStartTime.substring(11, 16);

          var dEndDate = data.endDate;
          dEndDate = dEndDate.substring(0, 10);

          var dEndTime = data.endDate;
          dEndTime = dEndTime.substring(11, 16);

          var currentDate = new Date();
          currentDate = currentDate.toISOString();
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
                    START DATE: {dStartDate} at {dStartTime}
                  </h5>

                  <h5 class="card-text" style={{ paddingTop: "20px" }}>
                    END DATE: {dEndDate} at {dEndTime}
                  </h5>
                  <p align="right">
                    <div>
                      <input
                        className="submitButton"
                        type="submit"
                        onClick={() =>
                          this.onStartDateClick(data.id, data.endDate)
                        }
                        value="Start Hackathon"
                        disbale={() =>
                          this.checkStartHackathon(
                            data.id,
                            data.is_graded,
                            data.startDate,
                            data.endDate
                          )
                        }
                      />
                      <input
                        className="submitButton"
                        type="submit"
                        onClick={() => this.onendDateClick(data.id)}
                        value={
                          dEndDate < currentDate
                            ? "HACKATHON ENDED"
                            : "End your hackathon"
                        }
                        disabled={dEndDate < currentDate ? true : false}
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          );
        }
      });
    }
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col">
            <Profile />
          </div>

          <div className="col-6 pt-5 pl-0">{details}</div>

          <div className="col" />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
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
  {
    getDashboardDetails,
    getHackathons,
    startHackathon,
    endHackathon,
    getJudges,
    getOrganization,
    getHackers,
    updateEndDate
  }
)(withRouter(Dashboard));
