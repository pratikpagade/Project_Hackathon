import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getCurrentProfile } from "../../actions/profileActions";

import Drawer from "@material-ui/core/Drawer";
import isEmpty from "../../validation/is-empty";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { logoutUser } from "../../actions/authActions";

const styles = theme => ({
  list: {
    width: 400
  },
  fullList: {
    width: "auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  avatar: {
    margin: 30
  },
  //   My styles
  lettersAvtar: {
    padding: 30,
    marginTop: 30,
    color: "#0055a2",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "2px",
    fontSize: "27px",
    fontWeight: "bold"
  },
  setMarginClose: {
    marginLeft: 54
  },
  setMarginOpen: {
    marginLeft: 84
  },
  logout_button: {
    marginBottom: 30
  }
});

class ChildSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      child2: false,
      avatar: "",
      ResultObj: {}
      // marginLeft:84,
    };
    // console.log(this.state)
    // console.log("abc")
    // console.log(props.foo.child1_open)
    // this.toggleDrawer( Boolean(props.foo.child1_open))
  }

  componentDidMount() {
    //set the with credentials to true
    this.props.getCurrentProfile();
    axios.defaults.withCredentials = true;

    //make a post request with the user data
    axios.get("/api/users/getcourses").then(response => {
      console.log("Status Code : ", response.status);
      console.log(response.request.response);
      if (response.status === 200) {
        this.setState({
          ResultObj: response.data
        });
        console.log(this.state.ResultObj);
        console.log("Success");
      } else {
        console.log("Failure");
      }
    });
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      left: props.foo.child1_open,
      child2: props.foo.child2_open
    });
    // console.log(props.foo.child1_open)
    // console.log(this.state.left)
    // console.log(props.foo.child2_open)
    // console.log(this.state.child2)
  }
  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
    console.log("called");
  };
  toggleDrawer2 = open => () => {
    this.setState({
      child2: open
    });
    console.log("called");
  };

  render() {
    const { classes } = this.props;
    const { profile } = this.props;
    if (profile.profile != null || profile.profile != undefined) {
      this.state.avatar = profile.profile.avatar;
    }

    const { ResultObj } = this.state;
    var username;
    console.log(ResultObj);
    if (localStorage.userName) {
      username = localStorage.userName;
    }
    /*
    if (isEmpty(ResultObj))
      var courseListCustom = ResultObj.map(course => (
        <ListItem button key={course._id}>
          <ListItemText primary={course.courseId} />
        </ListItem>
      ));*/
    const sideList = (
      <div
        className={classNames(
          classes.list,
          this.props.foo.open ? classes.setMarginOpen : classes.setMarginClose
        )}
      >
        <Grid container justify='center' direction='column' alignItems='center'>
          <Avatar
            alt='Remy Sharp'
            src={this.state.avatar}
            className={classes.profileImg}
          />

          <Typography variant='h5' gutterBottom>
            {username}
          </Typography>
          <Button
            variant='outlined'
            className={classNames(classes.button, classes.logout_button)}
            onClick={() => this.props.logoutUser()}
          >
            Log Out
          </Button>
        </Grid>

        <span className='_1dssogd _3TWcsSE _3MIBviy' data-uid='CloseButton'>
          <button
            type='button'
            tabIndex='0'
            className='_3H7s5be _1uixGS7 ufc-YeQ _1w-NoZD _18N7QPD _2C24JRe wDo8zr-'
            data-uid='Button'
            style={{ margin: "0px", cursor: "pointer" }}
          >
            <span className='_5x4ssEO'>
              <span className='_3LkvllI'>
                <svg
                  name='IconX'
                  viewBox='0 0 1920 1920'
                  rotate='0'
                  width='1em'
                  height='1em'
                  aria-hidden='true'
                  role='presentation'
                  focusable='false'
                  className='_3Ny7iUg NDnL-SS _3m0_yEn'
                  data-uid='InlineSVG SVGIcon'
                >
                  <g role='presentation'>
                    <path
                      d='M771.548 960.11L319 1412.658l188.562 188.562 452.548-452.548 452.548 452.548 188.562-188.562-452.548-452.548 452.548-452.548L1412.658 319 960.11 771.548 507.562 319 319 507.562z'
                      fillRule='nonzero'
                      stroke='none'
                      strokeWidth='1'
                    />
                  </g>
                </svg>
              </span>
              <span className='_3NFTR8i'>Close</span>
            </span>
          </button>
        </span>

        <Divider />
        <List>
          {[
            ["Profile", "profile"],
            ["Settings", "settings"],
            ["Notifications", "notification"],
            ["Files", "files"],
            ["ePortfolios", "eportfolio"]
          ].map((text, index) => (
            <Link
              key={`${text[1]}`}
              style={{ textDecoration: "none" }}
              to={"/" + text[1]}
            >
              <ListItem button key={text[1]}>
                <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );

    const courseList = (
      <div
        className={classNames(
          classes.list,
          this.props.foo.open ? classes.setMarginOpen : classes.setMarginClose
        )}
      >
        <Grid container justify='center' direction='column' alignItems='center'>
          <Typography variant='h5' gutterBottom />
        </Grid>

        <Divider />
        <List>
          {Object.keys(this.state.ResultObj).map((key, index) => (
            <Link to={`/course/${this.state.ResultObj[key].courseId}`}>
              <Button key={index} style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemText
                    primary={
                      this.state.ResultObj[key].courseTerm +
                      " " +
                      this.state.ResultObj[key].courseId +
                      " : " +
                      this.state.ResultObj[key].courseName
                    }
                  />
                  {/* <Button onClick={this.selectCourse(text[1])}> Select</Button> */}
                </ListItem>
              </Button>
              <Divider />
            </Link>
          ))}
          }
          <ListItem>
            <Link to={"/allcourses"}>All courses</Link>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
    if (this.state.left) {
      return (
        <div>
          {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
          {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
          {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}> */}
          <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role='button'
              // onClick={this.toggleDrawer('left', false)}
              // onKeyDown={this.toggleDrawer('left', false)}
              onClick={this.toggleDrawer(false)}
              //onKeyDown={this.toggleDrawer(false)}
            >
              {/* if({this.state.left}){
                        {sideList}
                    }else if({this.state.child2}){
          
                    } */}
              {sideList}
            </div>
          </Drawer>
        </div>
      );
    } else if (this.state.child2) {
      return (
        <div>
          {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
          {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
          {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}> */}
          <Drawer open={this.state.child2} onClose={this.toggleDrawer2(false)}>
            <div
              tabIndex={0}
              role='button'
              // onClick={this.toggleDrawer2('left', false)}
              // onKeyDown={this.toggleDrawer2('left', false)}
              onClick={this.toggleDrawer2(false)}
              //onKeyDown={this.toggleDrawer2(false)}
            >
              {/* if({this.state.left}){
                        {sideList}
                    }else if({this.state.child2}){
          
                    } */}
              {courseList}
            </div>
          </Drawer>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ChildSidebar.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentProfile }
)(withStyles(styles)(withRouter(ChildSidebar)));
