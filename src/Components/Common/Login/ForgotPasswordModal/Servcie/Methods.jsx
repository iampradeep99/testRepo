import axios from "axios";
import { Buffer } from "buffer";
import Config from "Configration/Config.json";
import APIEndpoints from "./EndPoints";

const pako = require("pako");

export const forgetData = async (requestData) => {
  try {
    const response = await axios.post(Config.BaseUrl + APIEndpoints.ForgotPassword.Forget, requestData);
    let result = {};
    if (response.status === 200) {
      result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(result.responseDynamic ? result.responseDynamic : "", "base64");
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return { responseCode: 1, responseData: Data, responseMessage: result.responseMessage };
        }
        return { responseCode: 1, responseData: [], responseMessage: result.responseMessage };
      }
      return { responseCode: 0, responseData: result, responseMessage: result.responseMessage };
    }
    return { responseCode: 0, responseData: null, responseMessage: result.responseMessage };
  } catch (error) {
    console.log(error);
    return { responseCode: 0, responseData: null, responseMessage: error.response.data.responseMessage };
  }
};

export const otpValidateData = async (requestData) => {
  try {
    const response = await axios.post(Config.BaseUrl + APIEndpoints.ForgotPassword.OtpValidate, requestData);
    let result = {};
    if (response.status === 200) {
      result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(result.responseDynamic ? result.responseDynamic : "", "base64");
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return { responseCode: 1, responseData: Data, responseMessage: result.responseMessage };
        }
        return { responseCode: 1, responseData: [], responseMessage: result.responseMessage };
      }
      return { responseCode: 0, responseData: result, responseMessage: result.responseMessage };
    }
    return { responseCode: 0, responseData: null, responseMessage: result.responseMessage };
  } catch (error) {
    console.log(error);
    return { responseCode: 0, responseData: null, responseMessage: error.response.data.responseMessage };
  }
};

export const resetForgetPasswordData = async (requestData) => {
  try {
    const response = await axios.post(Config.BaseUrl + APIEndpoints.ForgotPassword.ResetForgetPassword, requestData);
    let result = {};
    if (response.status === 200) {
      result = await response.data;
      if (result.responseCode.toString() === "1") {
        const buff = Buffer.from(result.responseDynamic ? result.responseDynamic : "", "base64");
        if (buff.length !== 0) {
          const Data = JSON.parse(pako.inflate(buff, { to: "string" }));
          return { responseCode: 1, responseData: Data, responseMessage: result.responseMessage };
        }
        return { responseCode: 1, responseData: [], responseMessage: result.responseMessage };
      }
      return { responseCode: 0, responseData: result, responseMessage: result.responseMessage };
    }
    return { responseCode: 0, responseData: null, responseMessage: result.responseMessage };
  } catch (error) {
    console.log(error);
    return { responseCode: 0, responseData: null, responseMessage: error.response.data.responseMessage };
  }
};

export const smsotpsend = async (mobile) => {
  try {
    const response = await axios.get(
      `https://bulksmsapi.vispl.in/?username=cscetrnapi3&password=csce_123&messageType=text&mobile=${mobile}&senderId=CSCSPV&ContentID=1707170748006783465&EntityID=1301157363501533886&message=%272024%20is%20your%20OTP%20for%20reset%20the%20password%20of%20KRPH%20portal.%20Please%20keep%20it%20safe%20for%20next%2010%20minutes.%20Team-CSCSPV%27`,
    );

    // Return the complete response directly
    return response;
  } catch (error) {
    console.error(error);

    // Handle cases where error.response or error.response.data might be undefined
    return error.response ? error.response : { status: 500, message: "An unexpected error occurred." };
  }
};
