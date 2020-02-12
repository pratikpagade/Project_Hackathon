import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Table from "react-bootstrap/Table";

//import { TextField } from "material-ui";
//import { get_possible_judges } from "../../../action/getPossibleJudges";
import Select from "react-select";
import "./GradeHackathon.css";
import { getHackathon } from "../../actions/hackathonActions";
import { gradeTeam } from "../../actions/gradeTeamActions";
import Navbar from "../Navbar/Navbar";
class GradeHackathon extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      hackathon: "",
      EventName: "",
      grades: []
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }

    if (this.props.match.params.id) {
      this.props.getHackathon(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ hackathon: nextProps.hackathon });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (id, grade) => {
    const data = {
      teamId: id,
      grades: parseFloat(grade)
    };
    this.props.gradeTeam(data);
  };

  handleChange(i, e) {
    this.setState({
      grades: { ...this.state.grades, [i]: e.target.value }
    });
  }

  render() {
    let data = "";
    if (this.state.hackathon.teams != undefined) {
      data = this.state.hackathon.teams.map((team, i) => {
        if (team.submitionUrl !== null) {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{team.name}</td>
              <td>{team.submitionUrl}</td>
              <td>{team.grades}</td>
              <td>
                <input
                  type="number"
                  value={this.state.grades[i]}
                  name={this.state.grades[i]}
                  onChange={this.handleChange.bind(this, i)}
                  step="0.1"
                />
              </td>
              <td>
                <input
                  type="submit"
                  className="form-submit-grade"
                  onClick={() => this.onSubmit(team.id, this.state.grades[i])}
                />
              </td>
            </tr>
          );
        }
      });
    }
    return (
      <div>
        <Navbar />
        <div className="col-md-3" />

        <div className="col-md-6">
          <br />
          <br />
          <br />
          <div className="row ">
            <h1 className="hackathon-header">Grade Hackathon</h1>
          </div>
          <div className="row ">
            <p className="header">
              Visit submission URL for further details about hackathon
              submission.
              <br />
              Consider past grade before re-grading.
            </p>
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Event Name</label>
            </span>
            <span className="inputspan">
              <label className="form-label">
                {this.state.hackathon.eventName}
              </label>
            </span>
            <br />
            <br />
            <br />
            <br />
          </div>
          <div className="row ">
            <Table
              bordered
              responsive="sm"
              responsive="md"
              responsive="lg"
              responsive="xl"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Submission URL</th>
                  <th>Current Grade</th>
                  <th>New Grade</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
          </div>
        </div>

        <div className="col-md-3" />
      </div>
    );
  }
}

// CreateHackathon.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  hackathon: state.hackathon.hackathon
});

export default connect(
  mapStateToProps,
  { getHackathon, gradeTeam }
)(withRouter(GradeHackathon));
