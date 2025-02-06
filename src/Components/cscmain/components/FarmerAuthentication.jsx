import React, { useState } from "react";

import Inputfield from "../partials/Inputfield";
import Toggleswitch from "../partials/Toggleswitch";
import { Tab, Tabs } from "react-bootstrap";
import Farmermobilenumber from "./Farmerauthlist/Farmermobilenumber";
import Accountnumber from "./Farmerauthlist/Accountnumber";
import Policynumber from "./Farmerauthlist/Policynumber";
import Locations from "./Farmerauthlist/Locations";
import Adharcard from "./Farmerauthlist/Adharcard";

const FarmerAuthentication = () => {
  const [currentMenu, setCurrentmenu] = useState("farmermobilenumber");
  const tabs = [
    {
      name: "Farmer Mobile Number",
      key: "farmermobilenumber",
    },
    {
      name: "Aadhar Number",
      key: "adharnumber",
    },
    {
      name: "Bank A/c Number",
      key: "bankaccountnumber",
    },
    {
      name: "Policy Number",
      key: "policynumber",
    },
    {
      name: "Location",
      key: "location",
    },
    {
      name: "Non-Registered Farmer",
      key: "nonregisternuber",
    },
    {
      name: "Offline",
      key: "offline",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="title-container">
        <h3>Farmer Authentication</h3>
      </div>
      <div className="farmer-authentication-tab-container">
        {tabs.map((item, index) => {
          return (
            <div
              key={index}
              className={`item ${item?.key == currentMenu ? "active" : ""}`}
              onClick={() => {
                setCurrentmenu(item.key);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <form className="csc-form-container mt-3" onSubmit={handleSubmit}>
        {currentMenu == "farmermobilenumber" && <Farmermobilenumber />}
        {currentMenu == "bankaccountnumber" && <Accountnumber />}
        {currentMenu == "policynumber" && <Policynumber />}
        {currentMenu == "adharnumber" && <Adharcard />}
        {currentMenu == "location" && <Locations />}
        <div className="row my-3">
          <div className="col-md-12">
            <p className="information-title">FARMER INFORMATION</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Inputfield type={"text"} lable={"Farmer Name *"} placeholder={"Siddhartha Sankar Samal"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"Mobile No *"} placeholder={"9899499022"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"State *"} placeholder={"Odisha"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"District *"} placeholder={"Anugul"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"Taluka *"} placeholder={"Anugul"} disabled={true} />
          </div>
          <div className="col-md-4">
            <Inputfield type={"number"} lable={"Village *"} placeholder={"Amantapur"} disabled={true} />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Select Year *</label>
              <select name="" id="" className="form-select">
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Select Season *</label>
              <select name="" id="" className="form-select">
                <option value="Anugul">Choose scheme</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Select Scheme *</label>
              <select name="" id="" className="form-select" disabled>
                <option value="Anugul">Choose scheme</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="btn-container">
                  <button className="submit-btn">Fetch Details</button>
                  <button className="green-button">Claim Status</button>
                </div>
              </div>
              <div>
                <div className="btn-container">
                  <button className="reset-btn">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FarmerAuthentication;
