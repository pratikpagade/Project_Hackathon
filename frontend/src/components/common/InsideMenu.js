import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import Spinner from "../common/Spinner";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
//import AssignmentList from '../pages/home';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {cyan500} from 'material-ui/styles/colors';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    color: "#008ee2"
  },
  hide: {
    display: "none"
  },
  drawer: {
    //   marginTop: '50px',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    //   my changes start
    marginTop: "64px",
    //   my changes end
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  margin_set_open: {
    marginLeft: 84
  },
  margin_set_close: {
    marginLeft: 54
  },
  padding_set_open: {
    paddingLeft: 84
  },
  padding_set_close: {
    paddingLeft: 54
  },
  left_set_open: {
    left: 84
  },
  left_set_close: {
    left: 54
  },
  drawerPaperOpen: {
    marginTop: "64px",
    marginLeft: "84px",
    width: drawerWidth
  },
  drawerPaperClose: {
    marginTop: "64px",
    marginLeft: "54px",
    width: drawerWidth
  },
  textColor1: {
    color: "#008ee2"
  }
});
// const muiTheme = getMuiTheme({
//     palette: {
//       textColor:  cyan500,
//     },
//     appBar: {
//       height: 50,
//     },
//   });

class InsideMenu extends React.Component {
  state = {
    open: true,
    parentDrawer: true,
    courseDetailsinfo: {}
  };

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      // open: props.parentData.open,
      parentDrawer: props.parentData,
      courseDetailsinfo: props.courseDetailsinfo
    });
    console.log(props.courseDetailsinfo);
    // console.log(this.state.parentDrawer)
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleDrawerToggleMenu = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
    //   console.log(this.state.open)
  };
  render() {
    const { classes, theme } = this.props;
    const { courseDetailsinfo } = this.state;
    const { open } = this.state;
    let { parentDrawer } = this.state;
    let courseOuter = null;
    let course = null;
    let courseId = null;
    let sidebarCode;
    let courseHeader;

    if (courseDetailsinfo === null || courseDetailsinfo === undefined) {
      sidebarCode = <Spinner />;
    } else {
      courseOuter = courseDetailsinfo.course;
      if (courseOuter) {
        // courseId = courseOuter.courseId;
        courseHeader = (
          <Link to={`/course/${courseOuter.courseId}`}>
            <ListItemText>
              {courseOuter.courseTerm} - {courseOuter.courseId} :{" "}
              {courseOuter.courseName}
            </ListItemText>
          </Link>
        );

        sidebarCode = (
          <div>
            <List>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}`}>
                  <ListItemText>Home</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/Assignments`}>
                  <ListItemText>Assignments</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/Announcements`}>
                  <ListItemText>Announcements</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/Grades`}>
                  <ListItemText>Grades</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/People`}>
                  <ListItemText>People</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/Files`}>
                  <ListItemText>Files</ListItemText>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={`/course/${courseOuter.courseId}/Quizzes`}>
                  <ListItemText>Quizzes</ListItemText>
                </Link>
              </ListItem>
            </List>
          </div>
        );
      }
    }
    const mainCode = <div />;
    if (parentDrawer) {
      return (
        <div className={classNames(classes.root)}>
          <CssBaseline />
          <AppBar
            position='fixed'
            className={classNames(classes.appBar, classes.padding_set_open, {
              // [classes.appBarShift]: open,
            })}
          >
            {/* <Toolbar disableGutters={!open}> */}
            <Toolbar disableGutters={false}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerToggleMenu}
                className={classNames(classes.menuButton)}
                //   className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                className={classNames(classes.textColor1)}
                noWrap
                style={{ color: "#008ee2" }}
              >
                {courseHeader}
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classNames(classes.drawer)}
            //   className={classes.drawer}
            variant='persistent'
            anchor='left'
            //   open={parentDrawer}
            open={open}
            classes={{
              paper: classes.drawerPaperOpen
            }}
          >
            {sidebarCode}
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            {mainCode}
          </main>
        </div>
      );
    } else {
      return (
        <div className={classNames(classes.root)}>
          <CssBaseline />
          <AppBar
            position='fixed'
            className={classNames(classes.appBar, classes.padding_set_open, {
              // [classes.appBarShift]: open,
            })}
          >
            {/* <Toolbar disableGutters={!open}> */}
            <Toolbar disableGutters={false}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerToggleMenu}
                className={classNames(classes.menuButton)}
                //   className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                className={classNames(classes.textColor1)}
                noWrap
              >
                {courseHeader}
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classNames(classes.drawer, classes.left_set_open)}
            //   className={classes.drawer}
            variant='persistent'
            anchor='left'
            //   open={parentDrawer}
            open={open}
            classes={{
              paper: classes.drawerPaperClose
            }}
          >
            {sidebarCode}
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            {mainCode}
          </main>
        </div>
      );
    }
  }
}

InsideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  courseDetailsInfo: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(InsideMenu));
