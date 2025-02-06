import React from "react";
import { toast, ToastContainer } from "react-toastify";
import CallerInfo from "./CallerInfo";
import { Box, Typography } from "@mui/material";
import InsuranceCalculatorForm from "./InsuranceCalculatorForm";

const Calc = (onClick) => {
  const handleCalculate = () => {
   
  };

  const handleReset = () => {
    
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          background: "linear-gradient(to bottom, #21862d, #c3eb68)",
          minHeight: "fit-content",
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            position: "absolute",
            // Atop: "20px",
            right: "20px",
            zIndex: 2,
            padding: " 20px 100px 0 0",
          }}
        >
          <button
            onClick={onClick}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "white",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ fontSize: "20px", lineHeight: 1 }}>&#x276E;</span>
            Back
          </button>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "75px 0 75px 0",
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              margin: "0px",
              padding: "30px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              backgroundColor: "#fff",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <CallerInfo />
            <div className="content-row">
              <InsuranceCalculatorForm onCalculate={handleCalculate} onReset={handleReset} />
            </div>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: "#075307",
            color: "#fff",
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            Copyright © For Department of Agriculture and Farmers Welfare, Ministry of Agriculture and Farmers Welfare, Government of India. All Rights
            Reserved.
          </Typography>
        </Box>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Calc;
