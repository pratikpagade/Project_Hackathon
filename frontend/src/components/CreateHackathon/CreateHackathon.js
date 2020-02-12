import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import SimpleReactValidator from "simple-react-validator";

import "./CreateHackathon.css";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import { createHackathon } from "../../actions/hackathonActions";
import { getJudges } from "../../actions/hackathonActions";
import { getOrganization } from "../../actions/organizationActions";

import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import Moment from "react-moment";

class CreateHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      eventName: "",
      startDate: Date,
      endDate: Date,
      currentDate: new Date().toISOString(),
      description: "",
      fees: 0,
      judges: [],
      minTeamSize: 1,
      maxTeamSize: 1,
      sponsors: [],
      discount: 0,
      user: "",
      judge_select: [],
      sponsor_select: [],
      errors: {}
    };

    this.validator = new SimpleReactValidator({
      validators: {
        eventName: {
          message: "Event name is required",
          rule: (val, params, validator) => {
            return val !== "";
          }
        },
        startDate: {
          message: "Start date should be more/less than current/end date",
          rule: (val, params, validator) => {
            return (
              this.state.startDate > this.state.currentDate &&
              this.state.startDate < this.state.endDate
            );
          }
        },
        endDate: {
          message: "End date should be more than the current/start date",
          rule: (val, params, validator) => {
            return (
              this.state.endDate > this.state.currentDate &&
              this.state.startDate < this.state.endDate
            );
          }
        },
        judge_select: {
          message: "Atleast select one judge",
          rule: (val, params, validator) => {
            return val.length !== 0;
          }
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.auth.user !== undefined) {
      this.setState({ user: this.props.auth.user });
      console.log("user redeifned ..............");
    }

    this.props.getJudges().then(() => {
      const newArray = [];
      if (this.props.judges !== [] && this.props.judges !== undefined) {
        this.setState({ judges: [...newArray] });
        this.setState(
          { judges: [...this.state.judges, ...this.props.judges] },
          function() {
            const judges = this.state.judges;
            let i = 1;
            judges.map(judge => {
              const newjudge = { ...judge, label: judge.screenName, value: i };
              i = i + 1;

              newArray.push(newjudge);
            });
            this.setState({ judges: newArray });
          }
        );
      }
    });

    this.props.getOrganization().then(() => {
      const newArray1 = [];

      if (this.props.sponsors !== [] && this.props.sponsors !== undefined) {
        this.setState(
          { sponsors: [...this.state.sponsors, ...this.props.sponsors] },
          function() {
            const sponsors = this.state.sponsors;

            let i = 1;
            sponsors.map(sponsor => {
              const newsponsor = {
                ...sponsor,
                label: sponsor.orgName,
                value: i
              };
              i = i + 1;

              newArray1.push(newsponsor);
            });
            this.setState({ sponsors: newArray1 });
          }
        );
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
    this.validator.purgeFields();
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const new_judge = [];
      this.state.judge_select.map(judge => {
        const newjudge = {
          uuid: judge.uuid,
          screenName: judge.screenName,
          name: judge.name,
          email: judge.email,
          bussinessTitle: judge.bussinessTitle,
          organization: judge.organization,
          photoUrl: judge.photoUrl,
          aboutMe: judge.aboutMe,
          address: judge.address,
          judging: judge.judging,
          teams: judge.teams,
          username: judge.username
        };
        new_judge.push(newjudge);
      });

      const newHachathon = {
        eventName: this.state.eventName,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        description: this.state.description,
        fees: this.state.fees,
        minTeamSize: this.state.minTeamSize,
        maxTeamSize: this.state.maxTeamSize,
        sponsors: this.state.sponsor_select,
        discount: this.state.discount,
        user: this.state.user,
        judges: new_judge
      };
      console.log(newHachathon);

      this.props.createHackathon(newHachathon, this.props.history);
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      //this.forceUpdate();
    }
  };

  addjudge = e => {
    this.setState({ judge_select: [...e] });
    this.validator.purgeFields();
  };

  addsponsor = e => {
    this.setState({ sponsor_select: [...e] });
  };

  render() {
    this.validator.purgeFields();
    if (this.props.auth.isAuthenticated == false) this.props.history.push("/");
    const { errors } = this.state;
    if (errors !== undefined && errors.msg !== undefined && errors !== {}) {
      // console.log(errors);
      // window.alert(errors.msg);
      //window.location.reload();
    }
    return (
      <div>
        <Navbar />
        <div className="col-md-3" />
        <div className="col-md-6">
          <br />
          <br />
          <div className="row ">
            <h1 className="hackathon-header">Create Hackathon</h1>
            <p className="header">
              Host your own coding contest on OpenHack. You can practice and
              compete with friends. Select from our library of over 1,500 coding
              challenges or create your own.
              <br />
              Get started by providing the initial details for your contest.
            </p>
          </div>
          <form>
            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Event Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="eventName"
                value={this.state.eventName}
                onChange={this.onChange}
                required
              />
              {this.validator.message(
                "eventName",
                this.state.eventName,
                "required|eventName"
              )}
              <br />
              <br />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Start Date</label>
              </span>
              <input
                className="form-input"
                type="datetime-local"
                name="startDate"
                value={this.state.startDate}
                onChange={this.onChange}
                required
              />
              {this.validator.message(
                "startDate",
                this.state.startDate,
                "required|startDate"
              )}
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">End Date</label>
              </span>
              <input
                className="form-input"
                type="datetime-local"
                name="endDate"
                value={this.state.endDate}
                onChange={this.onChange}
                required
              />
              {this.validator.message(
                "endDate",
                this.state.endDate,
                "required|endDate"
              )}
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Description</label>
              </span>
              <textarea
                className="form-input"
                rows="5"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Registration Fees</label>
              </span>
              <input
                className="form-input"
                type="number"
                name="fees"
                min="1"
                value={this.state.fees}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Judges</label>
              </span>
              <Select
                className="form-input"
                options={this.state.judges}
                isMulti
                name="judge_select"
                value={this.state.judge_select}
                onChange={this.addjudge}
                required
              />
              {this.validator.message(
                "judge_select",
                this.state.judge_select,
                "required|judge_select"
              )}
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Minimum Team Size</label>
              </span>
              <input
                className="form-input"
                type="number"
                min="1"
                max="100"
                name="minTeamSize"
                value={this.state.minTeamSize}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Maximum Team Size</label>
              </span>
              <input
                className="form-input"
                type="number"
                min="1"
                max="100"
                name="maxTeamSize"
                value={this.state.maxTeamSize}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Sponsors</label>
              </span>
              <Select
                className="form-input"
                options={this.state.sponsors}
                isMulti
                name="sponsors"
                value={this.state.sponsor_select}
                onChange={this.addsponsor}
              />
            </div>
            <div className="row">
              <span className="inputspan">
                <label className="form-label">Sponsor Discount</label>
              </span>
              <input
                className="form-input"
                type="number"
                name="discount"
                min="1"
                max="100"
                value={this.state.discount}
                onChange={this.onChange}
              />
            </div>
            <div className="row">
              <input
                className="form-submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
              />
            </div>
          </form>
        </div>

        <div className="col-md-3" />
        <div className="row" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  judges: state.hackathon.judges,
  sponsors: state.organization.all_organization
});

export default connect(
  mapStateToProps,
  { getJudges, createHackathon, getOrganization }
)(CreateHackathon);
