import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Navbar from "../Navbar/Navbar";

import SimpleReactValidator from "simple-react-validator";

import "./JoinHackathon.css";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";
import Spinner from "../common/Spinner";
import {
  getHackathon,
  getJudges,
  getHackers,
  createTeam
} from "../../actions/hackathonActions";

class JoinHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      teamName: "",
      TeamMembers: [{ name: "", role: "" }],
      judges: [],
      hackers_select: [],
      hackers: [],
      minTeamSize: 1,
      maxTeamSize: 1,
      currentCounter: 1,
      error: {},
      loaded: 0,
      teamId: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.validator = new SimpleReactValidator({
      validators: {
        teamName: {
          message: "Team name should not be empty",
          rule: (val, params, validator) => {
            console.log(validator);
            return this.state.teamName !== "";
          }
        }
      }
    });
  }
  handleMemberChange = (e, index) => {
    console.log(e);

    let TeamMembers = [...this.state.TeamMembers];
    TeamMembers[e.target.dataset.id][
      e.target.className
    ] = e.target.value.toUpperCase();
    this.setState({ TeamMembers }, () => console.log(this.state.TeamMembers));
  };

  addTeamMembers = e => {
    this.setState(prevState => ({
      TeamMembers: [...prevState.TeamMembers, { name: "", role: "" }],
      currentCounter: prevState.currentCounter + 1
    }));
  };

  componentWillMount() {
    console.log("Inside Component Will Mount");

    if (this.props.match.params.id) {
      this.props.getHackathon(this.props.match.params.id);
    }

    if (this.props.hackathon != undefined) {
      if (this.props.hackathon.hackathon != {}) {
        this.setState({
          minTeamSize: this.props.hackathon.hackathon.minTeamSize,
          maxTeamSize: this.props.hackathon.hackathon.maxTeamSize
        });
      }
    }

    let hackers;
    console.log("Inside Component Will Mount");

    if (this.props.match.params.id) {
      this.props.getHackathon(this.props.match.params.id);
    }

    //const newArray = [];
    this.props.getHackers().then(() => {
      if (
        this.props.hackathon.hackers != [] &&
        this.props.hackathon != undefined
      ) {
        console.log(this.props);
        this.setState({ hackers: this.props.hackathon.hackers, loaded: 1 });
      }

      if (this.props.hackathon != undefined) {
        if (this.props.hackathon.hackathon != {}) {
          this.setState({
            minTeamSize: this.props.hackathon.hackathon.minTeamSize,
            maxTeamSize: this.props.hackathon.hackathon.maxTeamSize
          });
        }
      }

      const newArray = [];
      if (
        this.props.hackathon.hackers !== [] &&
        this.props.hackathon.hackers !== undefined
      ) {
        if (this.props.hackathon.hackathon.judges !== undefined) {
          hackers = this.props.hackers.filter(
            val => {
              var index = this.props.hackathon.hackathon.judges.map(item => {
                if (item.screenName == val.screenName) {
                  return false;
                } else {
                  return true;
                }
              });
              if (index[0] === false) {
                return false;
              } else {
                return true;
              }
            },
            function() {
              this.setState({ hackers: [...this.state.hackers, ...hackers] });
            }
          );

          let i = 1;
          hackers.map(hacker => {
            const newHacker = { ...hacker, label: hacker.screenName, value: i };
            i = i + 1;

            newArray.push(newHacker);
          });
          this.setState({ hackers: newArray });
        }
      }
    });
  }

  componentDidMount() {
    console.log("Did mount");
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
    if (nextProps.hackathon != undefined) {
      if (nextProps.hackathon.hackathon != {}) {
        this.setState({
          minTeamSize: nextProps.hackathon.hackathon.minTeamSize,
          maxTeamSize: nextProps.hackathon.hackathon.maxTeamSize
        });
      }
      var teamName = "";

      if (
        nextProps.hackathon.hackathon.teams !== [] &&
        this.props.auth.user !== undefined &&
        this.props.auth !== undefined &&
        this.props.auth.user.uuid !== null &&
        nextProps.hackathon
      ) {
        nextProps.hackathon.hackathon.teams.map((team, key) => {
          if (team.uuid == this.props.auth.user.uuid) {
            this.setState({
              teamName: team.name,
              teamId: team.id
            });
          }
        });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addMember = e => {
    this.setState({ member1: [e] });
  };

  addRole = e => {
    this.setState({ role1: [e] });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state.TeamMembers);

      const userData = {
        hackathonId: Number(this.props.match.params.id),
        teamName: this.state.teamName,
        TeamMembers: this.state.TeamMembers,
        teamId: this.state.teamId
      };
      console.log(userData);
      this.props.createTeam(userData, this.props.history);
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      //this.forceUpdate();
    }
  };

  handleMemberChange = (e, index) => {
    console.log(e);
    this.state.TeamMembers[index].name = e.uuid;
    this.setState({ TeamMembers: [...this.state.TeamMembers] });
    console.log(this.state.TeamMembers);
  };

  handleRoleChange = (e, index) => {
    console.log(e);
    this.state.TeamMembers[index].role = e.value;
    this.setState({ TeamMembers: [...this.state.TeamMembers] });
    console.log(this.state.TeamMembers);
  };

  render() {
    if (this.state.loaded == 0) return <div />;
    let { TeamMembers } = this.state;
    console.log(this.props);
    console.log(this.state);
    const { errors } = this.state;
    if (errors !== undefined && errors.msg !== undefined && errors !== {}) {
      // console.log(errors);
      // window.alert(errors.msg);
      // window.location.reload();
    }
    var options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Product Manager", value: "Product Manager" },
      { label: "Engineer", value: "Engineer" },
      { label: "Full Stack", value: "Full Stack" },
      { label: "Designer", value: "Designer" },
      { label: "Other", value: "Other" }
    ];

    const teamMembersList =
      this.state.maxTeamSize > 1
        ? TeamMembers.map((val, idx) => {
            console.log(options);
            let memberId = `member-${idx}`,
              roleId = `role-${idx}`;
            return (
              <div key={idx} className="row">
                <label
                  htmlFor={memberId}
                  className="form-label"
                >{`Member #${idx + 1}`}</label>
                <br />

                <Select
                  type="text"
                  name={memberId}
                  options={this.state.hackers}
                  data-id={idx}
                  id={memberId}
                  onChange={e => this.handleMemberChange(e, idx)}
                  value={
                    this.state.hackers !== undefined
                      ? this.state.hackers.screenName
                      : ""
                  }
                  className="member-input"
                />
                {console.log(this.state.TeamMembers)}
                <label htmlFor={roleId} className="form-label">
                  Role
                </label>
                <Select
                  name={roleId}
                  data-id={idx}
                  id={roleId}
                  options={options}
                  value={memberId[idx].role}
                  onChange={e => this.handleRoleChange(e, idx)}
                  className="member-input"
                />
              </div>
            );
          })
        : null;

    const addMemberButton =
      this.state.currentCounter >= 1 &&
      this.state.currentCounter < this.state.maxTeamSize - 1 ? (
        <div className="row">
          <input
            className="form-submit"
            type="submit"
            value="Add team member"
            onClick={this.addTeamMembers}
            style={{ marginLeft: "300px" }}
          />
        </div>
      ) : null;

    if (this.props.hackathon.hackers === undefined) {
      return <Spinner />;
    } else {
      return (
        <div>
          <Navbar />
          <div className="col-md-2" />
          <div className="col-md-8">
            <br />
            <br />
            <br />
            <div className="row">
              <h1 className="hackathon-header">Join Hackathon</h1>
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="row">
              <p className="header">
                Register for the Hackathon. Enter team details.
                <br />
              </p>
            </div>

            <div className="row ">
              <span className="inputspan">
                <label className="form-label">Team Name</label>
              </span>
              <input
                className="form-input"
                type="text"
                name="teamName"
                value={this.state.teamName}
                onChange={this.onChange}
                required
              />
              {this.validator.message(
                "teamName",
                this.state.teamName,
                "required|teamName"
              )}
            </div>
            <br />
            <br />

            <br />
            <br />
            {teamMembersList}
            {addMemberButton}
            <br />

            <div className="row">
              <input
                className="form-submit"
                type="submit"
                value="Submit"
                onClick={this.onSubmit}
                style={{ marginLeft: "300px" }}
              />
            </div>
          </div>

          <div className="col-md-2" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  hackathon: state.hackathon,
  hackers: state.hackathon.hackers
});

export default connect(
  mapStateToProps,
  { JoinHackathon, getHackathon, getHackers, createTeam }
)(withRouter(JoinHackathon));
