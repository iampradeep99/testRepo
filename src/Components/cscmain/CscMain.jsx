import React, { useEffect, useState } from "react";
import "./cssmain.css";
import Formsteps from "./partials/Formsteps";
import Cardcontainer from "./partials/Cardcontainer";
import CallerInformation from "./components/CallerInformation";
import FarmerAuthentication from "./components/FarmerAuthentication";
import Farmerinformation from "./components/Farmerinformation";
import FarmetticketSummary from "./components/FarmetticketSummary";
import Ticketcreation from "./components/Ticketcreation";
import Successfull from "./components/Successfull";

const CscMain = () => {
  const [currentcomponent, setCurrentcomponent] = useState(1);
  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
    };
  }, []);
  return (
    <div className="csc_main py-3">
      <Formsteps currentcomponent={currentcomponent} setCurrentcomponent={setCurrentcomponent} />
      <CallerInformation />
      <Cardcontainer>
        <FarmerAuthentication />
        <Farmerinformation />
        <FarmetticketSummary />
      </Cardcontainer>
      <Ticketcreation />
      <Successfull />
    </div>
  );
};

export default CscMain;
