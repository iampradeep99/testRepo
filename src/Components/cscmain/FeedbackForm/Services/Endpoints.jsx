import config from "../Services/config.json"; // Assuming the config is correctly linked

export const ENDPOINTS = {
  GET_FEEDBACK_QUESTIONS: `${config.BaseUrl}/FGMS/farmer-feedback/questions`,
  SUBMIT_FEEDBACK: `${config.BaseUrl}/FGMS/farmer-feedback`,
};

export default ENDPOINTS;
