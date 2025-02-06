import React from "react";
import { Link } from "react-router-dom";
import whitebgimage from "../../../assets/img/background-white-image.png";

const Contentcardcenter = ({ name, value, icon, color, show }) => {
  return (
    <div
      className="card card-custom"
      style={{
        backgroundImage: `url(${whitebgimage})`,
        backgroundPosition: "center center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "repeat",
        minWidth: "180px",
      }}
    >
      <div className="content d-flex align-ite  ms-center justify-content-between">
        <div>
          <p className="card-name">{name}</p>
          <p className="card-value">{value}</p>
        </div>
        {show && (
          <div className="icon" style={{ background: color }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contentcardcenter;
