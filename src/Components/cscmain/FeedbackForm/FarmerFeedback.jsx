import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackQuestions from "./FeedbackQues";
import FarmerInformation from "./FarmerInfo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const FarmerFeedback = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [feedbackResponses, setFeedbackResponses] = useState({});
  const [farmerDetails, setFarmerDetails] = useState({
    name: "",
    mobile: "",
    suggestion: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFeedbackChange = (questionId, value) => {
    setFeedbackResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleFarmerInfoChange = (field, value) => {
    setFarmerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(to bottom, #21862d, #c3eb68)",
        minHeight: "fit-content",
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            maxWidth: "1100px",
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
          <FeedbackHeader />
          <FeedbackQuestions feedbackResponses={feedbackResponses} onFeedbackChange={handleFeedbackChange} />

         
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#075307",
          color: "#fff",
          padding: "10px 20px",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          Copyright @ For Department of Agriculture and Farmers Welfare, Ministry of Agriculture and Farmers Welfare, Government of India. All Rights Reserved.
        </Typography>
      </Box>

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
  );
};

export default FarmerFeedback;
