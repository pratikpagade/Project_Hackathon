import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import fire from "../../config/firebaseConfig";
import SimpleReactValidator from "simple-react-validator";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      errors: {},
      token: ""
    };
    this.validator = new SimpleReactValidator({
      validators: {
        email: {
          message: "Email should not be empty",
          rule: (val, params, validator) => {
            return val !== "";
          }
        },
        password: {
          message: "Password should not be empty",
          rule: (val, params, validator) => {
            return val !== "";
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          console.log(u);
          const userData = {
            email: this.state.email,
            password: this.state.password,
            uuid: u.user.uid
          };

          this.setState({ token: u.user.ra });
          console.log("Token:" + this.state.token);
          this.props.loginUser(userData, this.state.token);
        })
        .catch(error => {
          console.log(error);
          window.alert(error.message);
        });
    } else {
      this.setState({
        errors: {}
      });
      this.validator.showMessages();
      this.forceUpdate();
    }

    // const userData = {
    //   userName: this.state.userName,
    //   password: this.state.password
    // };

    // this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
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
            <h1 className="hackathon-header">Open Hackathon SignIn</h1>
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
              <label className="form-label">Email</label>
            </span>
            <input
              className="form-input"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="User name"
              onChange={this.onChange}
              error={errors.email}
            />
            {this.validator.message("email", this.state.email, "email")}
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
              "password"
            )}
            <br />
            <br />
          </div>
          <div className="row">
            <Link to="/signup" className="form-link">
              Create an account?
            </Link>
          </div>
          <br />
          <br />

          <div className="row">
            <input
              className="form-submit"
              type="submit"
              name="signin_submit"
              value="Sign In"
              onClick={this.onSubmit}
            />
          </div>
        </div>

        <div className="col-md-2" />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
