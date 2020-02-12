import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import "./SignUp.css";
import setAuthToken from "../../utils/setAuthToken";
import SimpleReactValidator from "simple-react-validator";
import classnames from "classnames";

import { auth } from "firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      token: ""
    };
    this.validator = new SimpleReactValidator({
      validators: {
        password2: {
          message: "Passwords do not match",
          rule: (val, params, validator) => {
            return this.state.password === this.state.password2;
          }
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const newUser = {
        screenName: this.state.screenName,
        email: this.state.email,
        password: this.state.password
      };
      this.props.registerUser(newUser, this.props.history);
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { errors } = this.state;

    if (
      errors !== null &&
      errors !== undefined &&
      errors.msg !== undefined &&
      errors !== {}
    ) {
      // window.alert(errors.msg);
      // window.location.reload();
    }

    return (
      <div>
        <div className="col-md-4" />
        <div className="col-md-6">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row ">
            <h1 className="hackathon-header">Open Hackathon</h1>
            <br />
            <br />
            <br />
          </div>

          <div className="row ">
            <p className="header">
              Welcome to the most competetive platform online.
              <br />
              Get started by signing up.
            </p>
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Screen Name</label>
            </span>
            <input
              className="form-input"
              name="screenName"
              type="text"
              value={this.state.screenName}
              onChange={this.onChange}
              error={errors.screenName}
            />

            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Email</label>
            </span>
            <input
              className="form-input"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Password</label>
            </span>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            {this.validator.message(
              "password",
              this.state.password,
              "required|min:6"
            )}
            <br />
            <br />
          </div>
          <div className="row ">
            <span className="inputspan">
              <label className="form-label">Confirm Password</label>
            </span>
            <input
              className="form-input"
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />{" "}
            {this.validator.message(
              "password2",
              this.state.password,
              "password2"
            )}
            <br />
            <br />
          </div>
          <div className="row">
            <Link to="/login" className="form-link">
              Click to login?
            </Link>
          </div>

          <div className="row">
            <input
              className="form-submit"
              type="submit"
              onClick={this.onSubmit}
            />
          </div>
        </div>

        <div className="col-md-2" />
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
