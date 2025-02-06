import React, { useState, useEffect } from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Divider, Button, TextField } from "@mui/material";
import { fetchFeedbackQuestions, submitFeedback } from "./Services/Services"; // Import from services
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //
import FarmerInfo from "./FarmerInfo";
import { useNavigate } from "react-router-dom";

import { getfeedbackformquestionsAPI } from "Components/Common/BillingDashboard/Services/Services";
const FeedbackQuestions = ({ feedbackResponses, onFeedbackChange }) => {
  const [questionsByTag, setQuestionsByTag] = useState({});
  const [hoveredBox, setHoveredBox] = useState(null);
  const [farmerData, setFarmerData] = useState({
    name: "",
    mobile: "",
    suggestion: "",
  });
  const handleFarmerInfoChange = (field, value) => {
    setFarmerData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const [validationErrors, setValidationErrors] = useState({});

  const questionBoxStyle = (id) => ({
    border: hoveredBox === id ? "2px solid green" : "2px solid #D9D9D2",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "50px",
    backgroundColor: hoveredBox === id ? "#F9FAFB" : "#FFFFFF",
    position: "relative",
    transition: "box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
  });

  const handleMouseEnter = (id) => {
    setHoveredBox(id);
  };

  const handleMouseLeave = () => {
    setHoveredBox(null);
  };
  const navigate = useNavigate();  

  const handleSubmit = async () => {
    const errors = {};

    // Destructure the farmerData from state
    const { name, mobile, suggestion } = farmerData;

    // Validate text fields
    if (!name.trim()) errors.farmerName = "Farmer Name is required";
    if (!mobile.trim()) errors.farmerMobileNumber = "Farmer Mobile Number is required";
    if (!suggestion.trim()) errors.farmerSuggestion = "Farmer Suggestion is required";

    // Validate radio group selections
    Object.entries(questionsByTag).forEach(([tag, questions]) => {
      questions.forEach((q) => {
        if (!feedbackResponses[q.id]) {
          errors[q.id] = "This question must be answered";
        }
      });
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("All fields are required to submit"); // Error toast
      return;
    }

    const questionIds = Object.keys(feedbackResponses);
    const answers = Object.values(feedbackResponses);

    const feedbackData = {
      question_ids: questionIds,
      answers: answers,
      farmer_name: name, // Use name from farmerData
      farmer_mobile_number: mobile, // Use mobile from farmerData
      farmer_suggestion: suggestion, // Use suggestion from farmerData
      agent_id: "12345",
    };

    try {
      const response = await submitFeedback(feedbackData); // Submitting feedback via service
      console.log("Feedback submitted successfully:", response);
      toast.success("Form submitted successfully!"); // Success toast

      // Navigate to the Successful component
      navigate("/successfull"); // Adjust path as needed
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback. Please try again."); // Error toast
    }
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchFeedbackQuestions(); // Fetch the data using the service
        if (response && response.responseCode === 1) {
          const questions = response.responseDynamic;

          // Group questions by `tag`
          const groupedByTag = questions.reduce((acc, question) => {
            if (!acc[question.tag]) acc[question.tag] = [];
            acc[question.tag].push(question);
            return acc;
          }, {});
          setQuestionsByTag(groupedByTag);
        }
      } catch (error) {
        console.error("Error fetching or processing feedback questions:", error);
      }
    };

    loadQuestions();
  }, []); // Empty dependency array means it runs once on component mount

  const initialRender = async () => {
    const result = await getfeedbackformquestionsAPI();
    console.log("Result", result);
  };
  useEffect(() => {
    initialRender();
  }, []);
  return (
    <>
      {Object.entries(questionsByTag).map(([tag, questions], tagIndex) => (
        <Box key={tag} id={tag} onMouseEnter={() => handleMouseEnter(tag)} onMouseLeave={handleMouseLeave} sx={questionBoxStyle(tag)}>
          <Typography
            sx={{
              color: "#6B7280",
              position: "absolute",
              top: "-12px",
              left: "20px",
              background: "#FFFFFF",
              padding: "0 8px",
              fontSize: "14px",
              lineHeight: "20px",
              textAlign: "left",
            }}
          >
            {tag}
          </Typography>
          <Divider sx={{ marginBottom: "16px", visibility: "hidden" }} />
          {questions.map((q, questionIndex) => (
            <div
              key={q.id}
              style={{
                marginBottom: questionIndex === questions.length - 1 ? "1px" : "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  marginBottom: "8px",
                  lineHeight: "20px",
                  textAlign: "left",
                }}
              >
                {`Q${tagIndex + 1}.${questionIndex + 1} ${q.question}`}
              </Typography>
              <RadioGroup
                row
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "8px 10px",
                  color: "#6B7280",
                }}
                value={feedbackResponses[q.id] || ""}
                onChange={(e) => onFeedbackChange(q.id, e.target.value)}
              >
                {["poor", "good", "Very good"].map((rating) => {
                  const colors = {
                    poor: "#FF3B30",
                    good: "#9CCD2F",
                    veryGood: "#16A34A",
                  };
                  const hoverColors = {
                    poor: "#D32F2F",
                    good: "#388E3C",
                    veryGood: "#1B5E20",
                  };
                  return (
                    <FormControlLabel
                      key={rating}
                      value={rating}
                      control={
                        <Radio
                          sx={{
                            color: feedbackResponses[q.id] === rating ? colors[rating] : "#6B7280",
                            "&.Mui-checked": {
                              color: hoverColors[rating],
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          style={{
                            color: feedbackResponses[q.id] === rating ? colors[rating] : "#6B7280",
                          }}
                        >
                          {rating.charAt(0).toUpperCase() + rating.slice(1)}
                        </Typography>
                      }
                      sx={{ marginRight: "40px" }}
                    />
                  );
                })}
              </RadioGroup>
              {validationErrors[q.id] && (
                <Typography color="error" sx={{ fontSize: "12px" }}>
                  {validationErrors[q.id]}
                </Typography>
              )}
            </div>
          ))}
        </Box>
      ))}

      <FarmerInfo farmerData={farmerData} onFarmerInfoChange={handleFarmerInfoChange} validationErrors={validationErrors} />
      {/* 
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: "20px" }}>
        Submit Feedback
      </Button> */}
      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            backgroundColor: "#075307",
            borderRadius: "15px",
          }}
          onClick={handleSubmit}
        >
          Submit Feedback
        </Button>
      </Box>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default FeedbackQuestions;
