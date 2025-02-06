import classNames from "classnames";
import Header from "Components/Newhome/Layout/Header";
import { Form } from "Framework/Components/Layout";
import { AlertMessage, Button } from "Framework/Components/Widgets";
import { useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BizClass from "./MobileNumberInput.module.scss";
import Footer from "../Layout/Footer";
import { smsotpsend } from "Components/Common/Login/ForgotPasswordModal/Servcie/Methods";

function MobileInputComponent() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const setAlertMessage = AlertMessage();

  const [mobileNum, setMobileNum] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.fontWeight = "bold";
    }

    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const handleMobileInputSubmissionn = async (e) => {
    e.preventDefault();

    if (mobileNum === "") {
      setAlertMessage({
        type: "error",
        message: "Please enter mobile number",
      });
    } else if (mobileNum.length !== 10) {
      setAlertMessage({
        type: "error",
        message: "Please enter 10 digit mobile number",
      });
    } else {
      // Pass the mobile number to the next page
      const result = await smsotpsend(mobileNum);
      if (result) {
        navigate("/otp-input", {
          state: { mobileNum },
        });
      }
    }
  };

  const handleSendingOtp = async () => {
    setIsLoading(true);
    navigate("/otp-input", {
      state: { mobileNum },
    });
    const response = await sendOtpMessage(mobileNum);

    if (response.responseCode === 1) {
      setAlertMessage({
        type: "success",
        message: "OTP sent successfully",
      });
      navigate("/otp-input", {
        state: { mobileNum },
      });
    } else {
      setAlertMessage({
        type: "error",
        message: response.responseMessage,
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div
        className={BizClass.Box}
        style={{
          margin: "0px",
          padding: "0px",
        }}
      >
        <div className={BizClass.FormHeading}>
          <h4>Enter Farmer Registered Mobile Number</h4>
        </div>

        <Form.InputGroup label="Mobile No" column={1}>
          <div
            className={BizClass.Row}
            style={{
              alignItems: "center",
            }}
          >
            <Form.InputControl
              ref={inputRef}
              control="input"
              placeholder="98XXXXXXX"
              name="txtMobileNumber"
              autoComplete="off"
              value={mobileNum}
              minLength={10}
              maxLength={10}
              onChange={(e) => setMobileNum(e.target.value.replace(/\D/g, ""))}
              style={{
                height: "44px",
              }}
            />
            <Button varient="green" trigger={isLoading} disabled={isLoading} className={classNames(BizClass.Button)} onClick={handleMobileInputSubmissionn}>
              Continue
              <FiChevronRight size={20} />
            </Button>
          </div>
        </Form.InputGroup>
        <p className={BizClass.Info}>A 4 Digit OTP Will Be Sent Via SMS To Verify Your Phone Number</p>
      </div>
    </div>
  );
}

export default MobileInputComponent;
