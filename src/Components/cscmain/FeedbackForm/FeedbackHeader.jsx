import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import ToggleLang from "./Togglelang";
import Feedback from "../FeedbackForm/img/Feedback.png";

const FeedbackHeader = () => {
  return (
    <Box textAlign="center" mb={2}>
      {/* <ToggleLang /> */}

      <img  className="fdk-img"src={Feedback} alt="Feedback Icon" width="100" />
      <Typography className="heading" variant="h4"  mt={2}>
        Farmer Feedback Form
      </Typography>
      <Typography className="heading-desc" mt={1}>
        Thank you for taking time to provide feedback. We appreciate
        hearing from you and will review your comments carefully.
      </Typography>
      <Divider sx={{ my: 3 }} />

      
    </Box>
  );
};

export default FeedbackHeader;