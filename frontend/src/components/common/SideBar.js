import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import SJSUlogo from "./utils/img/sjsu-logo-gold.png";
import Profile from "./utils/img/profile.png";

import ChildSidebar from "./ChildSidebar";
import InsideMenu from "./InsideMenu";

const drawerWidth = 84;
const drawerWidth1 = 54;

const styles = theme => ({
  root: {
    display: "flex",
    height: "40px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth1,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    background: "#0055a2",
    "background-color": "#0055a2",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    width: drawerWidth1,
    background: "#0055a2",
    "background-color": "#0055a2",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 7 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: 'flex-end',
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  img_rotate: {
    transform: "rotate3d(0, 1, 0, -180deg)",
    margin: "auto",
    "transition-property": "all",
    "transition-duration": "0.4s",
    "transition-timing-function": "ease",
    "transition-delay": "0s"
  },
  manu_icon_svg: {
    width: "26px",
    height: "26px"
  },
  manu_icon_svg_open: {
    width: "36px",
    height: "36px"
  },
  manu_item_name: {
    fontSize: "0.85em",
    color: "#ffffff !important"
  },
  flex_clm: {
    display: "flex",
    "flex-direction": "column",
    paddingTop: "7px",
    paddingBottom: "7px"
  },
  icon_set1: {
    marginRight: "0px"
  },
  tray1: {
    display: "block",
    position: "relative",
    zIndex: "auto",
    width: "448px",
    backgroundColor: "#f00",
    height: "100%"
  },
  my_z_index: {
    zIndex: 1400
  },
  my_content_left_margin: {
    marginLeft: 1,
    left: 1
  }
});

class SideBar extends React.Component {
  state = {
    open: false,
    child1_open: false,
    child2_open: false,
    rootDrawerWidth: 84
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerToggle = () => {
    if (this.state.open) {
      this.setState({ open: false, rootDrawerWidth: 54 });
    } else if (!this.state.open) {
      this.setState({ open: true, rootDrawerWidth: 84 });
    }
  };
  handleChild1DrawerToggle = () => {
    // console.log("Hello")
    if (this.state.child1_open) {
      this.setState({ child1_open: false, child2_open: false });
    } else {
      this.setState({ child1_open: true, child2_open: false });
    }
    //   console.log(this.state.child1_open)
  };
  handleChild2DrawerToggle = () => {
    // console.log("Hello")
    if (this.state.child2_open) {
      this.setState({ child2_open: false, child1_open: false });
    } else {
      this.setState({ child2_open: true, child1_open: false });
    }
    //   console.log(this.state.child1_open)
  };

  handleChild2DrawerToggle = () => {
    // console.log("Hello")
    if (this.state.child2_open) {
      this.setState({ child2_open: false, child1_open: false });
    } else {
      this.setState({ child2_open: true, child1_open: false });
    }
    //   console.log(this.state.child1_open)
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          style={{ height: "100vh", display: "flex" }}
          variant='permanent'
          className={classNames(classes.drawer, classes.my_z_index, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div />
            <List style={{ textAlign: "center" }}>
              <ListItem className={classes.flex_clm} button>
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='sjsu'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={SJSUlogo}
                  />
                </ListItemIcon>
              </ListItem>

              <ListItem
                className={classes.flex_clm}
                onClick={this.handleChild1DrawerToggle}
                button
              >
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='sjsu'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={Profile}
                  />
                </ListItemIcon>
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Account
                </span>
              </ListItem>
              <Link to='/dashboard'>
                <ListItem className={classes.flex_clm} button>
                  <ListItemIcon className={classes.icon_set1}>
                    <img
                      alt='dashboard'
                      className={
                        this.state.open
                          ? classes.manu_icon_svg_open
                          : classes.manu_icon_svg
                      }
                      src={require("../common/utils/dashboard.svg")}
                    />
                  </ListItemIcon>
                  {/* <ListItemText primary="Book" /> */}
                  <span
                    className={classNames(classes.manu_item_name, {
                      [classes.hide]: !this.state.open
                    })}
                  >
                    {" "}
                    Dashboard
                  </span>
                </ListItem>
              </Link>
              <ListItem
                className={classes.flex_clm}
                onClick={this.handleChild2DrawerToggle}
                button
              >
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='courses'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={require("../common/utils/course.svg")}
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Book" /> */}
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Courses
                </span>
              </ListItem>
              <ListItem className={classes.flex_clm} button>
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='calender'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={require("../common/utils/calender.svg")}
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Book" /> */}
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Calender
                </span>
              </ListItem>
              <ListItem className={classes.flex_clm} button>
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='inbox'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={require("../common/utils/inbox.svg")}
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Book" /> */}
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Inbox
                </span>
              </ListItem>
              <ListItem className={classes.flex_clm} button>
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='help'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={require("../common/utils/help.svg")}
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Book" /> */}
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Help
                </span>
              </ListItem>
              <ListItem className={classes.flex_clm} button>
                <ListItemIcon className={classes.icon_set1}>
                  <img
                    alt='library'
                    className={
                      this.state.open
                        ? classes.manu_icon_svg_open
                        : classes.manu_icon_svg
                    }
                    src={require("../common/utils/book.svg")}
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Book" /> */}
                <span
                  className={classNames(classes.manu_item_name, {
                    [classes.hide]: !this.state.open
                  })}
                >
                  {" "}
                  Library
                </span>
              </ListItem>

              <div
                className={classes.toolbar}
                style={{ alignItems: "flex-end" }}
              >
                <IconButton onClick={this.handleDrawerToggle}>
                  {this.state.open ? (
                    <img
                      className={classNames(
                        classes.img_rotate,
                        classes.manu_icon_svg
                      )}
                      alt='nav arrow'
                      src={require("../common/utils/arrow.svg")}
                    />
                  ) : (
                    <img
                      className={classes.manu_icon_svg}
                      alt='nav arrow'
                      src={require("../common/utils/arrow.svg")}
                    />
                  )}
                </IconButton>
              </div>
            </List>
          </div>
        </Drawer>
        <main>
          <ChildSidebar foo={this.state} />
        </main>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(SideBar));
