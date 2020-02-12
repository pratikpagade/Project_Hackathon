import React, { Component } from "react";
import "./Profile.css";

import { connect } from "react-redux";
class Profile extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount(){

    console.log("Component in profile",this.props.auth.user.screenName);
  }

  
  render() {
    console.log("checking the store of profile",this.props);
    return (
      <div class="Profile nopadding">
        <div id="" class="ml-5 mt-5">
          <div id="DIV_2" class="border">
            <div id="DIV_333" clas="border" />{" "}
            {/* <a href="" id="A_4">
              <img src={localStorage.getItem("profile_url") || ""} id="IMG_5" />
            </a>*/}{" "} 
            <a href="" id="A_6">
              {" "}
              <span id="SPAN_7">
                {/* {localStorage.getItem("first_name") +
                  " " +
                  localStorage.getItem("last_name")} */}
                  <i>WELCOME</i>
                  <br />
                 {this.props.auth.user.screenName}
              </span>
            </a>
            
          </div>
          <div id="DIV_9" class="border ">
            <div id="DIV_10">
              <p class>User Type: {localStorage.getItem("userType")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    
    auth:state.auth,
    errors:state.errors
  };
};

export default connect(mapStateToProps)(Profile);
