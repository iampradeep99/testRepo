import Inputfield from "Components/cscmain/partials/Inputfield";
import React from "react";

const Farmermobilenumber = () => {
  return (
    <>
      <div className="mobile-number-validation-container">
        <Inputfield type={"text"} lable={"Farmer Mobile Number *"} placeholder={"977654323"} disabled={false} />
        <button className="submit-btn">Validate</button>
      </div>
    </>
  );
};

export default Farmermobilenumber;
