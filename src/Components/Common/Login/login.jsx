import { React, useEffect, useState } from "react";
import { Loader } from "Framework/Components/Widgets";
import { RiLock2Fill, RiUser3Fill } from "react-icons/ri";
import { AiTwotoneLock } from "react-icons/ai";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import classNames from "classnames";
import { MdOutlineRefresh } from "react-icons/md";
import BizClass from "./login.module.scss";
import AddLoginLogics from "./Logic/Logic";
import ForgotPasswordModal from "./ForgotPasswordModal/ForgotPassword";
import BeforeLoginHeader from "./Header/BeforeLoginHeader";
import BeforeLoginFooter from "./Footer/beforeLoginFooter";
import { FaMobileAlt, FaUserAlt } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import { GlobalToggleSwitch } from "../globalToggleSwitch";
import MobileInputComponent from "Components/Newhome/MobileNumberInput/MobileInputComponent";

function Login() {
  const {
    formValues,
    updateState,
    handleLogin,
    SearchByHandleKeyDown,
    formValuesNcip,
    updateStateNcip,
    handleLoginNcip,
    SearchByHandleKeyDownNclip,
    captchaCode,
    createCaptcha,
    captchaCodeNcip,
    createCaptchaNcip,
    activeTab,
    handleTabClick,
    handleTabClickfarmer,
    btnLoaderActive,
    btnLoaderActiveNcip,
    handleTabFarmerClick,
    formValuesfarmer,
    updateStatefarmer,
    handleLoginfarmer,
    captchaCodefarmer,
    createCaptchafarmer,
    activeTabfarmer,
    btnLoaderActivefarmer,
    showHideLogin,
    isLoadingPage,
    farmertab,
    setFarmertab,
    toggleChange,
    setToggleChange,
  } = AddLoginLogics();
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealPasswordNclip, setRevealPasswordNclip] = useState(false);

  const [farmtoggleChange, setFarmtoggleChange] = useState(false);

  const togglePassword = () => {
    setRevealPassword(!revealPassword);
  };
  const togglePasswordNclip = () => {
    setRevealPasswordNclip(!revealPasswordNclip);
  };

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const toggleForgotPasswordModal = () => {
    setForgotPasswordModal(!forgotPasswordModal);
    setSelectedUserData();
  };
  const onToggleChange = () => {
    setToggleChange(!toggleChange);
    if (!toggleChange) handleTabClick(1);
    else handleTabClick(0);
  };
  const onFarmtoggleChange = () => {
    setFarmtoggleChange(!farmtoggleChange);
  };

  useEffect(() => {
    if (activeTabfarmer == 1) {
      if (farmertab == 1) {
        createCaptchafarmer();
      }
    }

    let maincaptcha = document.getElementById("captcha");
    if (maincaptcha) {
      setTimeout(() => {
        createCaptcha();
      });
    }
    let captchaNcip = document.getElementById("captchaNcip");
    if (captchaNcip) {
      setTimeout(() => {
        createCaptchaNcip();
      });
    }
  }, [farmertab, farmtoggleChange, activeTabfarmer]);
  useEffect(() => {
    if (!farmtoggleChange) {
      handleTabClickfarmer(0);
    } else {
      handleTabClickfarmer(1);
    }
  }, [farmtoggleChange]);
  return showHideLogin === true ? (
    <>
      <div className={BizClass.Wrapper}>
        <BeforeLoginHeader />
        {forgotPasswordModal ? <ForgotPasswordModal showfunc={toggleForgotPasswordModal} selectedUserData={selectedUserData} /> : null}
        <Container>
          <div className={BizClass.Box}>
            <div className={BizClass.CenterBox}>
              <Row>
                <Col lg={6} className="pe-lg-1">
                  <div className="h-100">
                    <img src="https://pmfby.amnex.co.in/krph/public/img/leftBannerImg.svg" alt="Banner" className="img-fluid w-100 h-100" />
                  </div>
                </Col>
                <Col lg={6} className="ps-lg-1">
                  <div className={BizClass.MainBox + " " + "h-100"}>
                    <div className={BizClass.ContentBox}>
                      <form className={BizClass.SubBox}>
                        <div className="d-flex justify-content-between align-items-center">
                          <h3>Sign In</h3>
                          {activeTabfarmer === 1 && (
                            <div className={BizClass.farmerswitch}>
                              <GlobalToggleSwitch
                                leftText={"Complaint Status"}
                                rightText={"Claim Intimation"}
                                callback={onFarmtoggleChange}
                                checked={farmtoggleChange}
                              />
                            </div>
                          )}
                          {activeTabfarmer === 0 ? (
                            <button
                              type="button"
                              className={activeTabfarmer === 0 ? BizClass.ActivefarmerLoginButton : BizClass.farmerLoginButton}
                              onClick={() => {
                                handleTabFarmerClick(1);
                              }}
                            >
                              Farmer Corner
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={activeTabfarmer === 1 ? BizClass.ActivefarmerLoginButton : BizClass.farmerLoginButton}
                              onClick={() => {
                                handleTabFarmerClick(0);
                              }}
                            >
                              KRPH
                            </button>
                          )}
                          {activeTabfarmer === 0 ? (
                            <GlobalToggleSwitch leftText={"KRPH"} rightText={"NCIP"} callback={onToggleChange} checked={toggleChange} />
                          ) : null}
                        </div>
                        <>
                          {activeTab === 0 && (
                            <div className={BizClass.InputBox}>
                              <div className={BizClass.InputGroup}>
                                <label>User Name</label>
                                <FaUserAlt className={BizClass.BoxIcon} />
                                <input
                                  type="text"
                                  name="txtLoginId"
                                  maxLength="10"
                                  value={formValues.txtLoginId}
                                  onChange={(e) => updateState(e.target.name, e.target.value)}
                                  placeholder="Enter your User Name"
                                  autoComplete="off"
                                />
                              </div>
                              <div className={BizClass.InputGroup}>
                                <label>Password</label>
                                <RiLock2Fill className={BizClass.BoxIcon} />
                                <input
                                  type={revealPassword ? "text" : "password"}
                                  name="txtPassword"
                                  value={formValues.txtPassword}
                                  onKeyDown={(e) => SearchByHandleKeyDown(e)}
                                  onChange={(e) => updateState(e.target.name, e.target.value)}
                                  placeholder="Enter Password"
                                  autoComplete="off"
                                />
                                {revealPassword ? (
                                  <VscEyeClosed className={BizClass.PassBoxIconClosed} onClick={() => togglePassword()} />
                                ) : (
                                  <VscEye className={BizClass.PassBoxIcon} onClick={() => togglePassword()} />
                                )}
                              </div>
                              <div className={BizClass.container}>
                                <div className={BizClass.halfCaptcha}>
                                  <div className={BizClass.captchaCss}>
                                    <div id="captcha" className={BizClass.captchaCode} />
                                    <label />
                                    <MdOutlineRefresh className={BizClass.RefreshCaptchaBoxIcon} onClick={() => createCaptcha()} />
                                  </div>
                                </div>
                                <div className={BizClass.halfInput}>
                                  <div className={BizClass.captchaInput}>
                                    <input
                                      type="text"
                                      name="txtCaptchaVal"
                                      maxLength="10"
                                      value={formValues.txtCaptchaVal}
                                      onChange={(e) => updateState(e.target.name, e.target.value)}
                                      placeholder="Enter Captcha Code"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                className={classNames(BizClass.ButtonWithLoader, btnLoaderActive ? BizClass.loading : null)}
                                onClick={() => handleLogin(captchaCode)}
                              >
                                Login
                                <span className={BizClass.ButtonLoader} />
                              </button>
                              <span aria-hidden="true" className={BizClass.forgotpassCss} onClick={() => toggleForgotPasswordModal()}>
                                {" "}
                                Forgot Your Password ?
                              </span>
                            </div>
                          )}
                          {activeTab === 1 && (
                            <div className={BizClass.InputBox}>
                              <div className={BizClass.InputGroup}>
                                <label>Mobile Number</label>
                                <FaMobileAlt className={BizClass.BoxIcon} />
                                <input
                                  type="text"
                                  name="txtmobileno"
                                  maxLength="10"
                                  value={formValuesNcip.txtmobileno}
                                  onChange={(e) => updateStateNcip(e.target.name, e.target.value.replace(/\D/g, ""))}
                                  placeholder="Mobile Number"
                                  autoComplete="off"
                                />
                              </div>
                              <div className={BizClass.InputGroup}>
                                <label>Password</label>
                                <RiLock2Fill className={BizClass.BoxIcon} />
                                <input
                                  type={revealPasswordNclip ? "text" : "password"}
                                  name="txtPasswordNcip"
                                  value={formValuesNcip.txtPasswordNcip}
                                  onKeyDown={(e) => SearchByHandleKeyDownNclip(e)}
                                  onChange={(e) => updateStateNcip(e.target.name, e.target.value)}
                                  placeholder="Enter Password"
                                  autoComplete="off"
                                />
                                {revealPasswordNclip ? (
                                  <VscEyeClosed className={BizClass.PassBoxIconClosed} onClick={() => togglePasswordNclip()} />
                                ) : (
                                  <VscEye className={BizClass.PassBoxIcon} onClick={() => togglePasswordNclip()} />
                                )}
                              </div>
                              <div className={BizClass.container}>
                                <div className={BizClass.halfCaptcha}>
                                  <div className={BizClass.captchaCss}>
                                    <div id="captchaNcip" className={BizClass.captchaCode} />
                                    <label />
                                    <MdOutlineRefresh className={BizClass.RefreshCaptchaBoxIcon} onClick={() => createCaptchaNcip()} />
                                  </div>
                                </div>
                                <div className={BizClass.halfInput}>
                                  <div className={BizClass.captchaInput}>
                                    <input
                                      type="text"
                                      name="txtCaptchaValNcip"
                                      maxLength="10"
                                      value={formValuesNcip.txtCaptchaValNcip}
                                      onChange={(e) => updateStateNcip(e.target.name, e.target.value)}
                                      placeholder="Enter The Captcha"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                className={classNames(BizClass.ButtonWithLoader, btnLoaderActiveNcip ? BizClass.loading : null)}
                                onClick={() => handleLoginNcip(captchaCodeNcip)}
                              >
                                Login
                                <span className={BizClass.ButtonLoader} />
                              </button>
                              <div className={BizClass.divHeight} />
                            </div>
                          )}
                          {activeTabfarmer === 1 && (
                            <div className={BizClass.InputBox}>
                              {farmertab == 0 ? (
                                <>
                                  <MobileInputComponent />
                                </>
                              ) : (
                                <>
                                  <div className={BizClass.InputGroup}>
                                    <label>Mobile Number</label>
                                    <FaMobileAlt className={BizClass.BoxIcon} />
                                    <input
                                      type="text"
                                      name="txtmobilenofarmer"
                                      maxLength="10"
                                      value={formValuesfarmer.txtmobilenofarmer}
                                      onChange={(e) => updateStatefarmer(e.target.name, e.target.value.replace(/\D/g, ""))}
                                      placeholder="Mobile Number"
                                      autoComplete="off"
                                    />
                                  </div>
                                  <div className={BizClass.container}>
                                    <div className={BizClass.halfCaptcha}>
                                      <div className={BizClass.captchaCss}>
                                        <div id="captchafarmer" className={BizClass.captchaCode} />
                                        <label />
                                        <MdOutlineRefresh className={BizClass.RefreshCaptchaBoxIcon} onClick={() => createCaptchafarmer()} />
                                      </div>
                                    </div>
                                    <div className={BizClass.halfInput}>
                                      <div className={BizClass.captchaInput}>
                                        <input
                                          type="text"
                                          name="txtCaptchaValfarmer"
                                          maxLength="10"
                                          value={formValuesfarmer.txtCaptchaValfarmer}
                                          onChange={(e) => updateStatefarmer(e.target.name, e.target.value)}
                                          placeholder="Enter The Captcha"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <button
                                      type="button"
                                      className={classNames(BizClass.ButtonWithLoader, btnLoaderActivefarmer ? BizClass.loading : null)}
                                      onClick={() => handleLoginfarmer(captchaCodefarmer)}
                                    >
                                      Login
                                      <span className={BizClass.ButtonLoader} />
                                    </button>
                                    <button className={BizClass.ButtonFarmerblankCancel} />
                                    <button type="button" className={BizClass.ButtonFarmerCancel} onClick={() => handleTabFarmerClick(0)}>
                                      Cancel
                                    </button>
                                  </div>
                                  <div className={BizClass.divHeight} />
                                </>
                              )}
                            </div>
                          )}
                        </>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <BeforeLoginFooter />
      </div>
    </>
  ) : isLoadingPage ? (
    <Loader />
  ) : null;
}

export default Login;
