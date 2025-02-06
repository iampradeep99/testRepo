import Inputfield from "Components/cscmain/partials/Inputfield";
import React from "react";

const Policynumber = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <Inputfield type={"text"} lable={"Policy Number *"} placeholder={"Policy Number"} disabled={false} />
        </div>
        <div className="col-md-4">
          <Inputfield type={"text"} lable={"Sceme*"} placeholder={"Sceme"} disabled={true} />
        </div>
        <div className="col-md-4">
          <Inputfield type={"text"} lable={"Season *"} placeholder={"Season"} disabled={true} />
        </div>
        <div className="col-md-4">
          <Inputfield type={"text"} lable={"State & Year *"} placeholder={"Season"} disabled={true} />
        </div>
      </div>
      <button className="submit-btn">Validate</button>
    </>
  );
};

export default Policynumber;
