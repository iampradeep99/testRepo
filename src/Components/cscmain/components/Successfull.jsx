import React from "react";
import successtick from "./../../../assets/img/success-tick.png";
import Cardcontainer from "../partials/Cardcontainer";

const Successfull = () => {
  return (
    <Cardcontainer>
      <div className="p-4 success-card">
        <div className="icon">
          <img src={successtick} className="success-tick w-100" />
        </div>
        <div className="ticket-number-container">
          <p className="ticket_number">0987654376543234</p>
          <p className="ticket_message">Ticket Created Successfully</p>
        </div>
        <div className="content-area">
          <p>
            Congratulations! A ticket with a reference number above has been generated. Click the "create more" button if you wish to create more tickets, or
            else you can ask for the farmer’s feedback.
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="green-button mx-2">Create More</button>
          <button className="submit-btn">Farmer Feedback</button>
        </div>
      </div>
    </Cardcontainer>
  );
};

export default Successfull;
