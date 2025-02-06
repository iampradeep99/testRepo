import React, { useState } from "react";
import Cardcontainer from "../partials/Cardcontainer";
import Ticketcard from "../partials/Ticketcard";
import ticketdata from "../../../assets/img/totaltickets.png";
import openticket from "./../../../assets/img/openticket.png";
import resolvedticket from "../../../assets/img/resolvedtickets.png";

const FarmetticketSummary = () => {
  return (
    <>
      <div className="title-container">
        <h3>FARMER TICKET SUMMARY</h3>
      </div>
      <div className="farmer-ticket-summary">
        <div className="row  my-4">
          <div className="col-md-4">
            <Ticketcard bgclass={"bluebggr"} name={"Total Tickets"} value={"15"} img={ticketdata} />
          </div>
          <div className="col-md-4">
            <Ticketcard bgclass={"pnkbg"} name={"Open Tickets"} value={"05"} img={openticket} />
          </div>
          <div className="col-md-4">
            <Ticketcard bgclass={"orangebg"} name={"Resolved Tickets"} value={"10"} img={resolvedticket} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center ">
          <div>
            <div className="btn-container">
              <button className="orange-button">Tickets against application</button>
              <button className="submit-btn mx-3">Total ticket of farmer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmetticketSummary;
