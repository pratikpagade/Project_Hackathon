import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function SimpleExpansionPanel(props) {
  const { classes, assignment } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Link
            to={`/course/${assignment.courseId}/assignmentId/${
              assignment.assignmentId
            }`}
          >
            <Typography className={classes.heading}>
              <b>ID</b>: {assignment.assignmentId} {" - "}
              <b>Title</b> {assignment.assignmentName}
            </Typography>
          </Link>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {" "}
            <b>Marks</b>:{assignment.totalMarks}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography>
            <b>Description</b>: {assignment.description}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  assignment: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
