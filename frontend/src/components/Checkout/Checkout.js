import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paid: ""
    };
  }

  componentWillMount() {
    console.log("Inside Component did Mount");
    // if (this.props.auth.user !== undefined) {
    //   this.setState({ user: this.props.auth.user });
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.match.params.token);
    axios.get(`/team/invite/accept` + window.location.search).then(res => {
      console.log(res);
      window.alert(
        "Thanks for paying.You will receive payment confirmation mail"
      );
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col" />

          <div className="col-6 pt-5 pl-0">
            <div class="card mb-3" width="250">
              <div class="card-body">
                <h5 class="card-title">
                  <h2>Payment for your Hackathon Joining</h2>
                </h5>
              </div>

              <div class="card-body">
                <h5 class="card-title">Payment Options</h5>
                <h5 class="card-text" style={{ paddingTop: "20px" }}>
                  <div className="row ">
                    <span className="inputspan">
                      <label className="form-label">Card Number</label>
                    </span>
                    <input
                      className="form-input"
                      type="text"
                      name="cardNumber"
                      value={this.state.cardNumber}
                      onChange={this.onChange}
                      required
                    />
                    <br />
                    <br />
                  </div>

                  <div className="row ">
                    <span className="inputspan">
                      <label className="form-label">Expiry Date</label>
                    </span>
                    <input
                      className="form-input"
                      type="text"
                      name="expireDate"
                      value={this.state.expire}
                      onChange={this.onChange}
                      required
                      style={{ width: "50px" }}
                    />
                    <br />
                    <br />
                  </div>

                  <div className="row ">
                    <span className="inputspan">
                      <label className="form-label">Name on the card</label>
                    </span>
                    <input
                      className="form-input"
                      type="text"
                      name="cardName"
                      value={this.state.cardName}
                      onChange={this.onChange}
                      required
                    />
                    <br />
                    <br />
                  </div>

                  <div className="row ">
                    <span className="inputspan">
                      <label className="form-label">CVC Number</label>
                    </span>
                    <input
                      className="form-input"
                      type="text"
                      name="cvcNumber"
                      value={this.state.cvcNumber}
                      onChange={this.onChange}
                      required
                      style={{ width: "50px" }}
                    />
                    <br />
                    <br />
                  </div>

                  <input
                    className="submitButton"
                    type="submit"
                    value="Make Payment"
                    onClick={this.onSubmit}
                  />
                </h5>
              </div>
            </div>
          </div>

          <div className="col" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  hackathons: state.hackathon.hackathons
});

export default withRouter(Checkout);
