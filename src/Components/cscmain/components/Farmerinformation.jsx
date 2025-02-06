import React, { useState } from "react";
import Cardcontainer from "../partials/Cardcontainer";
import Inputfield from "../partials/Inputfield";
import Toggleswitch from "../partials/Toggleswitch";
import { Tab, Tabs } from "react-bootstrap";
import Informationcard from "../partials/Informationcard";

const Farmerinformation = () => {
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
      <div className="information-card">
        <div className="row">
          <div className="col-md-12">
            <p className="information-title">FARMER INFORMATION</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Informationcard name={"Insurance Company"} value={"Future General India Insurance Co. Ltd."} />
          </div>
          <div className="col-md-4">
            <Informationcard name={"Application No."} value={"040120240052855359701"} />
          </div>
          <div className="col-md-4">
            <Informationcard name={"Farmer Premium"} value={"1.00"} />
          </div>
          <div className="col-md-4">
            <Informationcard name={"Village"} value={"Baratar"} />
          </div>
          <div className="col-md-4">
            <Informationcard name={"Area In Hactare"} value={"0.001"} />
          </div>
          <div className="col-md-4">
            <Informationcard name={"Crop Name  "} value={"Maize (Makka)"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Farmerinformation;
