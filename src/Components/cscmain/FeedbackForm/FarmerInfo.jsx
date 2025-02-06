import React from "react";
import Bg_Logo from "../FeedbackForm/img/Bg_Logo.png";
const FarmerInfo = ({ farmerData, onFarmerInfoChange, validationErrors }) => {
  const handleChange = (field, value) => {
    onFarmerInfoChange(field, value);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(238, 50, 3, 0.1)",
          fontSize: "5rem",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <img className="fdk-img" src={Bg_Logo} alt="" width="100%" />
      </div>
      <div
        style={{
          borderRadius: "18px",
          padding: "20px",
          marginBottom: "30px",
          backgroundColor: "#FFFFFF",
          margin: "auto",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Farmer Information
        </h3>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Farmer Name *
            </label>
            <input
              type="text"
              required
              value={farmerData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                borderColor: validationErrors.farmerName ? "red" : "#ccc", // Show red border if error exists
              }}
            />
            {validationErrors.farmerName && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {validationErrors.farmerName}
              </span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Mobile Number *
            </label>
            <input
              type="text"
              required
              value={farmerData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                borderColor: validationErrors.farmerMobileNumber ? "red" : "#ccc", // Show red border if error exists
              }}
            />
            {validationErrors.farmerMobileNumber && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {validationErrors.farmerMobileNumber}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Any suggestion *
          </label>
          <textarea
            required
            value={farmerData.suggestion}
            onChange={(e) => handleChange("suggestion", e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "none",
              borderColor: validationErrors.farmerSuggestion ? "red" : "#ccc", // Show red border if error exists
            }}
            rows="4"
          ></textarea>
          {validationErrors.farmerSuggestion && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {validationErrors.farmerSuggestion}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
export default FarmerInfo;