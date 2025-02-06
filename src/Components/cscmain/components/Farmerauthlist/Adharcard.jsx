import Inputfield from "Components/cscmain/partials/Inputfield";
import React from "react";

const Adharcard = () => {
  return (
    <>
      <div className="mobile-number-validation-container">
        <Inputfield type={"number"} lable={"Aadhar Number*"} placeholder={"Aadhar Number"} disabled={false} />
        <button className="submit-btn">Validate</button>
      </div>
    </>
  );
};

export default Adharcard;
