import React from "react";

const Inputfield = ({ lable, onchage, placeholder, type, disabled }) => {
  return (
    <div className="form-group">
      <label>{lable}</label>
      <input type={type} className="form-control" placeholder={placeholder} onchage={onchage} disabled={disabled ? true : false} />
    </div>
  );
};

export default Inputfield;
