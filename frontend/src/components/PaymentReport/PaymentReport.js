import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import Navbar from "../Navbar/Navbar";
import Table from "react-bootstrap/Table";
import axios from "axios";

class PaymentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount = e => {
    console.log("Hackathon report details from backend");
    axios.get("/hackathon/paymentresult").then(response => {
      console.log(response.data);
      this.setState({
        data: response.data
      });
    });
  };

  render() {
    const details =
      this.state.data !== undefined
        ? this.state.data.map((hResults, i) => {
            if (hResults.uuid == this.props.auth.user.uuid) {
              return (
                <div>
                  <Accordion allowZeroExpanded>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          {hResults.eventName}
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          <Table
                            bordered
                            responsive="sm"
                            responsive="md"
                            responsive="lg"
                            responsive="xl"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Team Name</th>
                                <th>Team Members</th>
                              </tr>
                            </thead>
                            <tbody>
                              {hResults.teams !== undefined
                                ? hResults.teams.map((team, key) => {
                                    return (
                                      <tr>
                                        <td>{key + 1}</td>
                                        <td>{team.name}</td>
                                        <td>
                                          <tr>
                                            <th>Participant number</th>
                                            <th>Screen Name</th>
                                            <th>Role</th>
                                            <th>Payment Status</th>
                                            <th>Amount</th>
                                            <th>Payment time</th>
                                          </tr>
                                          {team.members !== undefined
                                            ? team.members.map(
                                                (member, memberKey) => {
                                                  return (
                                                    <tr>
                                                      <td> {memberKey + 1}</td>
                                                      <td>
                                                        {
                                                          member.member
                                                            .screenName
                                                        }
                                                      </td>
                                                      <td> {member.role}</td>
                                                      <td>
                                                        {" "}
                                                        {member.paid
                                                          ? "PAID"
                                                          : "UNPAID"}
                                                      </td>
                                                      <td>
                                                        {member.paidAmount ==
                                                        null
                                                          ? "Something"
                                                          : member.paidAmount}
                                                      </td>
                                                      <td>
                                                        {member.paidTime == null
                                                          ? "Something"
                                                          : member.paidTime}
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )
                                            : null}
                                        </td>
                                        {/* <td>{team.paid?"PAID":"UNPAID"}</td> */}
                                      </tr>
                                    );
                                  })
                                : null}
                            </tbody>
                          </Table>
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
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

          <div className="col-6 pt-5 pl-0">
            <div className="row">
              <h1 className="hackathon-header">
                Registeration Fee Payment Report
              </h1>

              <p className="header">
                <br />
                Check all the hackathon payment status See what is the status of
                the payments of user ....
                <br />
                Get started by clicking on one of the hackathons
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
)(withRouter(PaymentReport));
