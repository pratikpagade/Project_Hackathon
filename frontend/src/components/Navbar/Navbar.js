import React, { Component } from "react";
import "./Navbar.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      userType: "admin"
    };

    this.changeSearch = this.changeSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  changeSearch = e => {
    this.setState({
      search: e.target.value
    });
  };

  submitSearch = e => {
    e.preventDefault();
    console.log("Button clcicked");
  };

  submitLogout = e => {
    console.log("Logout");
    this.props.logoutUser(this.props.history);
  };
  render() {
    console.log("checking the store of nacbar", this.props.auth);
    const userType = localStorage.getItem("userType");

    if (userType == "ADMIN") {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" href="#">
              <img src="./logo.png" width="30" height="30" alt="Openhack alt" />
              </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarNavAltMarkup"
              style={{ paddingLeft: "20%", fontSize: "14px" }}
            >
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/">
                  Home<span class="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="/create-hackathon">
                  Create-Hackathon
                </a>
                <a className="nav-item nav-link" href="/finalize-hackathon">
                  Finalize-Hackathon
                </a>
                <a
                  className="nav-item nav-link"
                  href="/all-finalized-hackathon"
                >
                  Add-Expenses
                </a>
                <a className="nav-item nav-link" href="/profile">
                  Edit-Profile
                </a>
                <a className="nav-item nav-link" href="/results">
                  Results
                </a>
                <a className="nav-item nav-link" href="/payment-report">
                  Payment Report
                </a>
                <a className="nav-item nav-link" href="/earning-report">
                  Earning Report
                </a>
              </div>
            </div>
            <form className="form-inline">
              <input
                onClick={this.submitLogout}
                className="btn btn-outline-success my-2 my-sm-4"
                type="submit"
                placeholder="LogOut"
                style={{ height: "25px", marginLeft: "200px" }}
                value="Logout"
              />
            </form>
          </nav>
        </div>
      );
    } else if (userType == "USER") {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" href="#">
              <img src="./logo.png" width="30" height="30" alt="Openhack alt" />
              </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarNavAltMarkup"
              style={{ paddingLeft: "20%", fontSize: "14px" }}
            >
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/">
                  Home<span class="sr-only">(current)</span>
                </a>
                {/* <a className="nav-item nav-link" href="/join-hackathon">Join-Hackathon</a> */}
                <a className="nav-item nav-link" href="/organization">
                  Create-Organization
                </a>
                <a className="nav-item nav-link" href="/all-grade-hackathons">
                  Grade-Hackathon
                </a>
                <a className="nav-item nav-link" href="/profile">
                  Edit-Profile
                </a>
                <a className="nav-item nav-link" href="/submissions">
                  Submit-Hackathon
                </a>
                <a className="nav-item nav-link" href="/results">
                  Results
                </a>
              </div>
            </div>
            <form className="form-inline">
              <input
                onClick={this.submitLogout}
                className="btn btn-outline-success my-2 my-sm-4"
                type="submit"
                placeholder="LogOut"
                style={{ height: "25px", marginLeft: "200px" }}
                value="Logout"
              />
            </form>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" href="#">
              <img src="./logo.png" width="30" height="30" alt="Openhack alt" />
              </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarNavAltMarkup"
              style={{ paddingLeft: "20%", fontSize: "14px" }}
            >
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/">
                  Home<span class="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="/join-hackathon">
                  Join-Hackathon
                </a>
                <a className="nav-item nav-link" href="/organization">
                  Create-Organization
                </a>
                <a className="nav-item nav-link" href="/profile">
                  Edit-Profile
                </a>
                <a className="nav-item nav-link" href="/results">
                  Results
                </a>
                <a className="nav-item nav-link" href="/payment-report">
                  Payment Report
                </a>
              </div>
            </div>
            <form className="form-inline">
              <input
                onClick={this.submitLogout}
                className="btn btn-outline-success my-2 my-sm-4"
                type="submit"
                placeholder="LogOut"
                style={{ height: "25px", marginLeft: "200px" }}
                value="Logout"
              />
            </form>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
