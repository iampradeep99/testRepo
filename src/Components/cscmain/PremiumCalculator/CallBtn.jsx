import React from "react";

const CallBtn = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #34C759",
        borderRadius: "20px",
        padding: "10px 20px",
        color: "#34C759",
        fontSize: "16px",
        width: "fit-content",
        // AmarginTop:"20px"
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#34C759",
          marginRight: "10px",
          display: "inline-block",
        }}
      ></span>
      Call Connected
    </div>
  );
};

export default CallBtn;
