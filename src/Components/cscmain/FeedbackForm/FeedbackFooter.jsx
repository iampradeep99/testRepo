import React from "react";
import { Box, Typography } from "@mui/material";

const FeedbackFooter = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        borderTop: "1px solid #ddd",
        fontSize: "140px",
        color: "red",
        backgroundColor: "red", // Gradient background
      }}
    >
      <Typography variant="body2">
        Copyright © For Department of Agriculture and Farmers Welfare,
        Ministry of Agriculture and Farmers Welfare, Government of India. All
        Rights Reserved.
      </Typography>
    </Box>
  );
};

export default FeedbackFooter;
