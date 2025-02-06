import React from "react";
import Cardcontainer from "../partials/Cardcontainer";
import Inputfield from "../partials/Inputfield";
import Toggleswitch from "../partials/Toggleswitch";

const CallerInformation = () => {
  const handleSubmit = () => {};
  return (
    <Cardcontainer>
      <div className="title-container">
        <h3>Caller Information</h3>
      </div>
      <form className="csc-form-container mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <Inputfield type={"text"} lable={"Caller ID *"} placeholder={"DI34567890"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"Caller Mobile Number *"} placeholder={"9711215678"} disabled={true} />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Call Status *</label>
              <select name="" id="" className="form-select">
                <option value="Connected">Connected</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>State *</label>
              <select name="" id="" className="form-select" disabled>
                <option value="Orisha">Orisha</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>District *</label>
              <select name="" id="" className="form-select" disabled>
                <option value="Anugul">Anugul</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <Inputfield type={"text"} lable={"Farmer Name *"} placeholder={"Rohit Kumar"} disabled={true} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <button className="premium-button">
                  <span className="icon">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/calculator.png" alt="Calculator Icon" />
                  </span>
                  Premium Calculator
                </button>
              </div>
              <div>
                <div className="btn-container">
                  <button className="submit-btn">Submit</button>
                  <button className="reset-btn">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Cardcontainer>
  );
};

export default CallerInformation;
