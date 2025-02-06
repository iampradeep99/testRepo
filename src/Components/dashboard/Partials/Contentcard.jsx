import React from "react";
import { Link } from "react-router-dom";
import whitebgimage from "../../../assets/img/background-white-image.png";

const Contentcard = ({ name, value, icon, color, currentmenu, keyvalue, handlechange }) => {
  return (
    <div
      className={`card card-custom ${currentmenu === keyvalue ? "active" : ""}`}
      style={
        currentmenu !== keyvalue
          ? {
              backgroundImage: `url(${whitebgimage})`,
              backgroundPosition: "center center",
              backgroundSize: "100% 100%",
              backgroundRepeat: "repeat",
            }
          : {}
      }
      onClick={() => {
        handlechange(keyvalue);
      }}
    >
      <div className="content">
        <div>
          <p className="card-name">{name}</p>
          <p className="card-value">Rs. {value}</p>
          {/* <Link className="card-link">More...</Link> */}
        </div>
        <div className="icon" style={{ background: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Contentcard;
