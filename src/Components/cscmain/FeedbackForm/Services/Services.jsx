import axios from "axios";
import { ENDPOINTS } from "./Endpoints.jsx";
import pako from "pako";

export const fetchFeedbackQuestions = async () => {
  try {
    const response = await axios.get(ENDPOINTS.GET_FEEDBACK_QUESTIONS);
    if (response.data && response.data.responseDynamic) {
      const compressedData = response.data.responseDynamic;

      // Decode base64 to binary string
      const decodedData = atob(compressedData);

      // Convert binary string to a Uint8Array
      const byteArray = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        byteArray[i] = decodedData.charCodeAt(i);
      }

      // Decompress the byteArray using pako
      const decompressedData = pako.inflate(byteArray, { to: "string" });

      // Update the response with the decompressed data
      response.data.responseDynamic = JSON.parse(decompressedData);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback questions:", error);
    throw error;
  }
};
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(ENDPOINTS.SUBMIT_FEEDBACK, feedbackData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Assuming API returns the result of submission
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
