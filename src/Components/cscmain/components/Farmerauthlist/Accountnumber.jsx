import Inputfield from "Components/cscmain/partials/Inputfield";
import React from "react";

const Accountnumber = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label>State *</label>
            <select name="" id="" className="form-select">
              <option value="2024">Select</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>District *</label>
            <select name="" id="" className="form-select">
              <option value="2024">Select</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Bank Name *</label>
            <select name="" id="" className="form-select">
              <option value="2024">Select</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Bank Branch *</label>
            <select name="" id="" className="form-select">
              <option value="2024">Select</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <Inputfield type={"number"} lable={"Account Number *"} placeholder={"Account Number"} disabled={false} />
        </div>
      </div>
      <button className="submit-btn">Validate</button>
    </>
  );
};

export default Accountnumber;
