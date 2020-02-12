import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { getHackathons, joinHackathon } from "../../actions/hackathonActions";
import { submitCode } from "../../actions/gradeTeamActions";
import "./Submissions.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

class Submissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      errors: {},
      submitionUrl: []
    };
  }

  componentWillMount() {
    this.props.joinHackathon();
  }
  componentDidMount() {
    this.props.joinHackathon();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (id, submitionUrl) => {
    const data = {
      teamId: id,
      submitionUrl: submitionUrl
    };

    console.log("clicked and put the value", id);
    console.log("clicked and put the value", submitionUrl);

    this.props.submitCode(data);
  };

  handleChange(i, e) {
    this.setState({
      submitionUrl: { ...this.state.submitionUrl, [i]: e.target.value }
    });
  }

  render() {
    const { hackathons } = this.props;
    let details;
    if (this.props.submithackathons !== undefined) {
      details = this.props.submithackathons.map((data, i) => {
        var ts = new Date();
        if (
          data.teams[0].members.length >= data.minTeamSize &&
          data.endDate > ts.toISOString() &&
          data.startDate < ts.toISOString
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
                    Team Name: {data.teams[0].name}
                  </h5>
                  <p align="right">
                    <input
                      type="text"
                      value={this.state.submitionUrl[i]}
                      name={this.state.submitionUrl[i]}
                      onChange={this.handleChange.bind(this, i)}
                    />
                    <input
                      type="submit"
                      className="form-submit-grade"
                      onClick={() =>
                        this.onSubmit(
                          data.teams[0].id,
                          this.state.submitionUrl[i]
                        )
                      }
                    />
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
          <div className="col" />

          <div className="col-6 pt-5 pl-0">{details}</div>

          <div className="col" />
        </div>
      </div>
    );
  }
}

Submissions.propTypes = {
  errors: PropTypes.object,
  submithackathons: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  submithackathons: state.hackathon.submithackathons
});

export default connect(
  mapStateToProps,
  { joinHackathon, submitCode }
)(withRouter(Submissions));
