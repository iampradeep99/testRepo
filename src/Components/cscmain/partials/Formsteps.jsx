import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
import callinfo from "./../../../assets/img/call-info.png";
import usercheck from "../../../assets/img/user-check.png";
import farmerinfo from "../../../assets/img/farmer-info.png";
import farmericon from "../../../assets/img/farmer-icon.png";
import ticketicon from "../../../assets/img/ticket-info.png";

const steps = ["Caller Information", "Farmer Authentication", "Insurance Details", "Farmer Ticket Summary", "Ticket Creation"];

// Custom StepConnector with dynamic styling
const CustomStepConnector = styled(StepConnector)(({ theme, activeStep }) => ({
  "& .MuiStepConnector-line": {
    borderColor: "#ffffff !important", // Default connector color
    borderTopWidth: 2,
    transition: "border-color 0.3s ease-in-out",
  },
  "&.Mui-active .MuiStepConnector-line": {
    borderColor: "#fff403 !important",
  },
  "&.Mui-completed .MuiStepConnector-line": {
    borderColor: "#fff403 !important",
  },
}));

function Formsteps({ setCurrentcomponent }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index) => {
    debugger;
    setActiveStep(index);
    setCurrentcomponent(index);
  };

  const icons = [
    <img src={callinfo} alt="Caller Info" className="step-icon" />,
    <img src={usercheck} alt="User Check" className="step-icon" />,
    <img src={farmerinfo} alt="Farmer Info" className="step-icon" />,
    <img src={farmericon} alt="Farmer Icon" className="step-icon" />,
    <img src={ticketicon} alt="Ticket Icon" className="step-icon" />,
  ];

  return (
    <Box className="container" sx={{ width: "100%", textAlign: "center" }}>
      <Stepper activeStep={activeStep} alternativeLabel connector={<CustomStepConnector activeStep={activeStep} />}>
        {steps.map((label, index) => (
          <Step
            key={label}
            className={index < activeStep ? "completed-step" : index == activeStep ? "active-step" : index == activeStep + 1 ? "upcoming-step" : ""}
            completed={index < activeStep}
            onClick={() => handleStepClick(index)}
          >
            <StepLabel
              icon={icons[index]}
              sx={{
                color: activeStep === index ? "primary.main" : "gray",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Formsteps;
