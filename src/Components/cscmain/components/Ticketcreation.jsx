import React, { useState } from "react";
import Cardcontainer from "../partials/Cardcontainer";
import Toggleswitch from "../partials/Toggleswitch";
import Inputfield from "../partials/Inputfield";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const Ticketcreation = () => {
  const handleSubmit = () => {};

  return (
    <Cardcontainer>
      <div className="title-container">
        <h3>TICKET CREATION</h3>
      </div>
      <form className="csc-form-container ticket-creation mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Ticket Type</label>
              <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel value="Grievance" control={<Radio />} label="Grievance" />
                <FormControlLabel value="Information" control={<Radio />} label="Information" />
                <FormControlLabel value="Crop Loss Intimation" control={<Radio />} label="Crop Loss Intimation" />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-democation-ready">
              <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                <FormControlLabel value="Standing Crop Stage" control={<Radio />} label="Standing Crop Stage" />
                <FormControlLabel value="Harvested Stage" control={<Radio />} label="Harvested Stage" />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Loss at *</label>
              <select name="" id="" className="form-select">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Category *</label>
              <select name="" id="" className="form-select">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Sub Category *</label>
              <select name="" id="" className="form-select">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Crop State *</label>
              <select name="" id="" className="form-select">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <Inputfield type={"date"} lable={"Crop State *"} placeholder={""} disabled={false} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"date"} lable={"Crop State *"} placeholder={""} disabled={false} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"text"} lable={""} placeholder={"On-time"} disabled={false} />
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Crop Name *</label>
              <select name="" id="" className="form-select">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Description *</label>
              <textarea name="" className="form-control" id="" rows={4}>
                Enter your mesage
              </textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="btn-container">
                  <button className="green-button">Submit</button>
                </div>
              </div>
              <div>
                <div className="btn-container">
                  <button className="submit-btn">Farmer Feedback</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Cardcontainer>
  );
};

export default Ticketcreation;
