import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class EarningReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = e => {
    console.log("Hackathon report details from backend");
    axios.get("/hackathon/earning").then(response => {
      console.log(response.data);
      this.setState({
        data: response.data
      });
    });
  };

  render() {
    let details =
      this.state.data !== undefined
        ? this.state.data.map((data, key) => {
            if (data.uuid == this.props.auth.user.uuid) {
              return (
                <div style={{ marginBottom: "30px" }}>
                  <div class="card mb-3 text-center" width="250">
                    <div class="card-body">
                      <h5 class="card-title">
                        <h2>{data.name}</h2>
                      </h5>
                    </div>

                    <div class="card-body" />
                    <div className="card-deck" style={{ padding: "20px" }}>
                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">Teams Participated</div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">{data.totalTeamCount}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>

                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">
                          Total Amount that Teams paid{" "}
                        </div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">${data.paidAmount}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>
                    </div>

                    <div className="card-deck" style={{ padding: "20px" }}>
                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">
                          Total Amount that teams have not paid
                        </div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">${data.unpaidAmount}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>

                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">
                          Sponsorship for {data.name}
                        </div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">${data.revenueAmount}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>

                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">Expense for {data.name}</div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">${data.expense}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>

                      <div
                        class="card border-primary mb-3"
                        style={{ "max-width": "40rem" }}
                      >
                        <div class="card-header">Profit for {data.name}</div>
                        <div class="card-body text-primary">
                          <h5 class="card-title">${data.profit}</h5>
                          {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        : null;

    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col" />

          <div className="col-7 pt-5 pl-0">
            <br />
            <div className="row">
              <h1 className="hackathon-header">Earning Reports</h1>
            </div>
            <div className="row">
              <p className="header">
                Get all you earnings according to certain hackathons...
                <br />
              </p>
            </div>
            <br />
            {details}
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

export default connect(
  mapStateToProps,
  {}
)(withRouter(EarningReport));
