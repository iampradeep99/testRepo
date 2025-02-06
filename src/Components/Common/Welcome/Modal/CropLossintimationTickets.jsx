import { React, useState, useEffect, useRef } from "react";
import { AlertMessage } from "Framework/Components/Widgets/Notification/NotificationProvider";
import { getSessionStorage } from "Components/Common/Login/Auth/auth";
import classNames from "classnames";
import { DataGrid, Form, Modal, PageBar } from "Framework/Components/Layout";
import { Loader, Button } from "Framework/Components/Widgets";
import moment from "moment";
import { dateToSpecificFormat, daysdifference, dateToCompanyFormat } from "Configration/Utilities/dateformat";
import { getFarmerPolicyDetail, farmergenerateSupportTicket } from "../Service/Methods";
import { maskMobileNumber } from "Configration/Utilities/utils";
import BizClass from "./CropLossintimationTickets.module.scss";
import PropTypes from "prop-types";
function CropLossintimationTickets() {
  const setAlertMessage = AlertMessage();
  const userData = getSessionStorage("user");
  const ticketBindingData = getSessionStorage("ticketDataBindingSsnStrg");
  const [formValidationFarmersInfoError, setFormValidationFarmersInfoError] = useState({});
  const [formValuesForFarmerInfo, setFormValuesForFarmerInfo] = useState({
    txtSeasonForFarmerInfo: null,
    txtYearForFarmerInfo: null,
    txtSchemeForFarmerInfo: null,
  });
  const [selectedFarmer] = useState(userData ? userData.data.data.result : "");
  const [formValidationSupportTicketError, setFormValidationSupportTicketError] = useState({});
  const [formValidationCounter, setFormValidationCounter] = useState({});
  const [formValuesTicketCreation, setFormValuesTicketCreation] = useState({
    // A txtDocumentUpload: "",
    txtTicketCategory: null,
    txtTicketCategoryType: null,
    txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    txtCropLossIntimation: "On-time",
    txtCropLossTime: "",
    txtTicketDescription: "",
    txtLossAt: null,
    txtOtherSubCategory: "",
    txtCropStage: null,
    txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    txtCropName: "",
  });
  const [formValuesCallerInformation, setFormValuesCallerInformation] = useState({
    txtCallerMobileNumber: userData ? userData.data.data.result.mobile : "",
  });
  const [yearList, setYearList] = useState([]);
  // A const [schemeList, setSchemeList] = useState([]);
  const [schemeList] = useState([
    { SchemeID: 2, SchemeName: "Weather Based Crop Insurance Scheme(WBCIS)" },
    { SchemeID: 4, SchemeName: "Pradhan Mantri Fasal Bima Yojna(PMFBY)" },
  ]);
  // A const [seasonForPolicyNumberDropdownDataList, setSeasonForPolicyNumberDropdownDataList] = useState([]);
  const [seasonForPolicyNumberDropdownDataList] = useState([
    { CropSeasonID: 1, CropSeasonName: "Kharif" },
    { CropSeasonID: 2, CropSeasonName: "Rabi" },
  ]);
  const [selectedInsuranceDetails, setSelectedInsuranceDetails] = useState([]);
  const [selectedClaimOrGrievence, setSelectedClaimOrGrievence] = useState("");

  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedOptionCropStage, setSelectedOptionCropStage] = useState("1");
  const [selectedValidateOption, setSelectedValidateOption] = useState("1");
  const fileRef = useRef(null);

  const [isBtndisabled, setisBtndisabled] = useState(0);
  const [btnLoaderSupportTicketActive, setBtnLoaderSupportTicketActive] = useState(false);
  const [stateCropLossIntimation, setStateCropLossIntimation] = useState("NA");
  function dynamicSort(properties) {
    return function (a, b) {
      for (let i = 0; i < properties.length; i++) {
        let prop = properties[i];
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
      }
      return 0;
    };
  }

  const [ticketCategoryList, setTicketCategoryList] = useState([]);
  const [isLoadingTicketCategoryList, setIsTicketCategoryList] = useState(false);
  const getTicketCategoryListData = async (supportTicketTypeID, data) => {
    console.log(data);
    try {
      if (ticketBindingData) {
        setTicketCategoryList([]);
        setIsTicketCategoryList(true);
        const filterticketBindingData = ticketBindingData.TCKCGZ.filter((data) => {
          return data.SupportTicketTypeID === Number(supportTicketTypeID);
        });
        const sortticketBindingData = filterticketBindingData.sort(dynamicSort(["preference", "TicketCategoryName"]));
        setTicketCategoryList(sortticketBindingData);
        setIsTicketCategoryList(false);
      } else {
        setTicketCategoryList([]);
      }
      // A setTicketCategoryList([]);
      // A setIsTicketCategoryList(true);
      // A const formdata = {
      // A   filterID: supportTicketTypeID,
      // A  filterID1: 0,
      // A  masterName: "TCKCGZ",
      // A  searchText: "#ALL",
      // A  searchCriteria: "AW",
      // A };
      // A const result = await getMasterDataBindingDataList(formdata);
      // A console.log(result, "ticketCategory");
      // A setIsTicketCategoryList(false);
      // A if (result.response.responseCode === 1) {
      // A  if (result.response.responseData && result.response.responseData.masterdatabinding && result.response.responseData.masterdatabinding.length > 0) {
      // A    setTicketCategoryList(result.response.responseData.masterdatabinding);
      // A  } else {
      // A    setTicketCategoryList([]);
      // A  }
      // A } else {
      // A  setAlertMessage({
      // A    type: "error",
      // A    message: result.response.responseMessage,
      // A  });
      // A}
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };
  const [ticketCategoryTypeList, setTicketCategoryTypeList] = useState([]);
  const [isLoadingTicketCategoryTypeList, setIsTicketCategoryTypeList] = useState(false);
  const getTicketCategoryTypeListData = async (pselectedOption, pCropLossDetailID, pMasterName) => {
    debugger;
    if (ticketBindingData) {
      setIsTicketCategoryTypeList(true);
      if (pMasterName === "TCKTYP") {
        const filterticketBindingData = ticketBindingData.CRPTYP.filter((data) => {
          return data.CategoryHeadID === Number(pselectedOption);
        });
        const sortticketBindingData = filterticketBindingData.sort((a, b) => {
          if (a.SupportTicketTypeName < b.SupportTicketTypeName) return -1;
        });
        setTicketCategoryTypeList(sortticketBindingData);
      } else if (pMasterName === "CRPTYP") {
        const filterticketBindingData = ticketBindingData.CRPTYP.filter((data) => {
          return data.CategoryHeadID === Number(pselectedOption) && data.CropLossDetailID === pCropLossDetailID;
        });
        const sortticketBindingData = filterticketBindingData.sort((a, b) => {
          if (a.SupportTicketTypeName < b.SupportTicketTypeName) return -1;
        });
        setTicketCategoryTypeList(sortticketBindingData);
      }
      setIsTicketCategoryTypeList(false);
    } else {
      setTicketCategoryTypeList([]);
    }
    // A try {
    // A  setIsTicketCategoryTypeList(true);
    // A  const formdata = {
    // A    filterID: pselectedOption,
    // A    filterID1: pCropLossDetailID,
    // A    masterName: pMasterName, // A "TCKTYP",
    // A    searchText: "#ALL",
    // A    searchCriteria: "AW",
    // A  };
    // A  const result = await getMasterDataBindingDataList(formdata);
    // A  console.log(result, "ticktCategoryType");
    // A  setIsTicketCategoryTypeList(false);
    // A  if (result.response.responseCode === 1) {
    // A    if (result.response.responseData && result.response.responseData.masterdatabinding && result.response.responseData.masterdatabinding.length > 0) {
    // A      setTicketCategoryTypeList(result.response.responseData.masterdatabinding);
    // A    } else {
    // A      setTicketCategoryTypeList([]);
    // A    }
    // A  } else {
    // A    setAlertMessage({
    // A      type: "error",
    // A      message: result.response.responseMessage,
    // A    });
    // A  }
    // A} catch (error) {
    // A  console.log(error);
    // A  setAlertMessage({
    // A    type: "error",
    // A    message: error,
    // A  });
    // A}
  };

  const [lossAtList, setLossAtList] = useState([]);
  const [isLoadingLossAtList, setIsLoadingLossAtList] = useState(false);
  const getLossAtListData = async (pCropStageID) => {
    try {
      if (ticketBindingData) {
        setIsLoadingLossAtList(true);
        const filterticketBindingData = ticketBindingData.CRPDTL.filter((data) => {
          return data.CropStageID === Number(pCropStageID);
        });
        setLossAtList(filterticketBindingData);
        setIsLoadingLossAtList(false);
      } else {
        setLossAtList([]);
      }
      // A setIsLoadingLossAtList(true);
      // A const formdata = {
      // A  filterID: pCropStageID,
      // A  filterID1: 0,
      // A  masterName: "CRPDTL",
      // A  searchText: "#ALL",
      // A  searchCriteria: "AW",
      // A};
      // A const result = await getMasterDataBindingDataList(formdata);
      // A setIsLoadingLossAtList(false);
      // A setLossAtList([]);
      // A if (result.response.responseCode === 1) {
      // A if (result.response.responseData && result.response.responseData.masterdatabinding && result.response.responseData.masterdatabinding.length > 0) {
      // A    setLossAtList(result.response.responseData.masterdatabinding);
      // A  } else {
      // A    setLossAtList([]);
      // A  }
      // A} else {
      // A  setAlertMessage({
      // A    type: "error",
      // A    message: result.response.responseMessage,
      // A  });
      // }
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  const [cropStageList, setCropStageList] = useState([]);
  const [isLoadingCropStageList, setIsLoadingCropStageList] = useState(false);
  const getCropStageListData = async (pCropStageID) => {
    try {
      if (ticketBindingData) {
        setIsLoadingCropStageList(true);
        const filterticketBindingData = ticketBindingData.CRPSTG.filter((data) => {
          return data.CropStageID === Number(pCropStageID);
        });
        setCropStageList(filterticketBindingData);
        setIsLoadingCropStageList(false);
      } else {
        setCropStageList([]);
      }
      // A setIsLoadingCropStageList(true);
      // A const formdata = {
      // A  filterID: pCropStageID,
      // A  filterID1: 0,
      // A  masterName: "CRPSTG",
      // A  searchText: "#ALL",
      // A  searchCriteria: "AW",
      // A };
      // A const result = await getMasterDataBindingDataList(formdata);
      // A setIsLoadingCropStageList(false);
      // A setCropStageList([]);
      // A if (result.response.responseCode === 1) {
      // A  if (result.response.responseData && result.response.responseData.masterdatabinding && result.response.responseData.masterdatabinding.length > 0) {
      // A    setCropStageList(result.response.responseData.masterdatabinding);
      // A  } else {
      // A    setCropStageList([]);
      // A  }
      // A} else {
      // A  setAlertMessage({
      // A    type: "error",
      // A    message: result.response.responseMessage,
      //   });
      // }
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };
  const validateFieldSupportTicket = (name, value) => {
    let errorsMsg = "";
    // A if (name === "txtDocumentUpload") {
    // A  if (value && typeof value !== "undefined") {
    // A    const regex = new RegExp("^[a-zA-Z0-9_.-]*$");
    // A    if (!regex.test(value.name)) {
    // A      errorsMsg = "Attachment name is not in valid format.";
    // A    }
    // A  }
    // A }
    if (name === "txtCallerMobileNumber") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Caller Mobile Number is required!";
      } else if (value) {
        if (value.length < 10) {
          errorsMsg = "Enter Valid 10 digit Caller Mobile Number!";
        }
      }
    }
    if (name === "txtTicketCategory") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Please select Ticket Sub Category!";
      }
    }
    if (name === "txtSchemeForFarmerInfo") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Scheme is required!";
      }
    }
    if (name === "txtTicketCategoryType") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Please select Ticket Category!";
      }
    }
    if (name === "txtOtherSubCategory") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Other Sub Cat. is required!";
      }
    }
    if (name === "txtLossAt") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Loss At is required!";
      }
    }
    if (name === "txtCropStage") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Crop Stage is required!";
      }
    }
    if (name === "txtCropLossDate") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "CropLoss Date is required!";
      }
    }
    // A if (name === "txtCropLossTime") {
    // A  if (!value || typeof value === "undefined") {
    // A    errorsMsg = "Crop Loss Time is required!";
    // A  }
    // A }
    if (name === "txtCropHarvestDate") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Harvest Date is required!";
      }
    }
    if (name === "txtCropName") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Crop Name is required!";
      }
    }
    if (name === "txtTicketDescription") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Ticket Description is required!";
      } else if (value) {
        if (value.length > 500) {
          errorsMsg = "Ticket Description can not exceed more than 500 characters!";
        }
      }
    }

    return errorsMsg;
  };

  const updateStateTicketCreation = (name, value) => {
    debugger;
    setFormValuesTicketCreation({ ...formValuesTicketCreation, [name]: value });
    formValidationSupportTicketError[name] = validateFieldSupportTicket(name, value);
    if (name === "txtTicketCategoryType") {
      setFormValuesTicketCreation({
        ...formValuesTicketCreation,
        txtTicketCategoryType: value,
        txtTicketCategory: null,
      });
      setTicketCategoryList([]);
      if (value) {
        getTicketCategoryListData(value.SupportTicketTypeID, value);
      }
    }

    if (name === "txtTicketDescription") {
      formValidationCounter[name] = value ? 500 - value.length : 500;
      setFormValidationCounter({ ...formValidationCounter });
    }

    if (name === "txtLossAt") {
      setFormValuesTicketCreation({
        ...formValuesTicketCreation,
        txtLossAt: value,
        txtTicketCategoryType: null,
        txtTicketCategory: null,
      });
      setTicketCategoryTypeList([]);
      setTicketCategoryList([]);
      if (value) {
        getTicketCategoryTypeListData("4", value.CropLossDetailID, "CRPTYP");
      }
    }
    if (name === "txtCropLossDate") {
      const currentDate = new Date();
      const dateDiffrence = daysdifference(dateToSpecificFormat(currentDate, "YYYY-MM-DD"), dateToSpecificFormat(value, "YYYY-MM-DD"));
      if (dateDiffrence > 3) {
        setFormValuesTicketCreation({
          ...formValuesTicketCreation,
          txtCropLossDate: value,
          txtCropLossIntimation: "Late",
        });
        setStateCropLossIntimation("NO");
      } else {
        setFormValuesTicketCreation({
          ...formValuesTicketCreation,
          txtCropLossDate: value,
          txtCropLossIntimation: "On-time",
        });
        setStateCropLossIntimation("YES");
      }
    }
  };

  const updateStateCallerInformation = (name, value) => {
    setFormValuesCallerInformation({ ...formValuesCallerInformation, [name]: value });
    formValidationSupportTicketError[name] = validateFieldSupportTicket(name, value);
  };
  const selectedOptionOnClick = (pselectedOption) => {
    if (pselectedOption === "GR") {
      setSelectedOption("1");
      setSelectedOptionCropStage("1");
      setTicketCategoryList([]);
      getTicketCategoryTypeListData("1", 0, "TCKTYP");
    } else if (pselectedOption === "IN") {
      setSelectedOption("2");
      setSelectedOptionCropStage("1");
      setTicketCategoryList([]);
      getTicketCategoryTypeListData("2", 0, "TCKTYP");
    } else if (pselectedOption === "LO") {
      setSelectedOption("4");
      setSelectedOptionCropStage("1");
      setTicketCategoryTypeList([]);
      setTicketCategoryList([]);
      getLossAtListData(1);
      getCropStageListData(1);
    }
    setFormValuesTicketCreation({
      ...formValuesTicketCreation,
      txtTicketCategoryType: null,
      txtTicketCategory: null,
      txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropLossIntimation: "On-time",
      txtCropLossTime: "",
      txtLossAt: null,
      txtOtherSubCategory: "",
      txtCropStage: null,
      txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    });
    setStateCropLossIntimation("NA");
  };

  const selectedOptionOnClickCropStage = (pselectedOption) => {
    if (pselectedOption === "SCS") {
      setSelectedOptionCropStage("1");
      getCropStageListData(1);
      getLossAtListData(1);
    } else if (pselectedOption === "HS") {
      setSelectedOptionCropStage("2");
      getCropStageListData(2);
      getLossAtListData(2);
    }
    setTicketCategoryTypeList([]);
    setTicketCategoryList([]);
    setFormValuesTicketCreation({
      ...formValuesTicketCreation,
      txtTicketCategoryType: null,
      txtTicketCategory: null,
      txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropLossIntimation: "On-time",
      txtCropLossTime: "",
      txtLossAt: null,
      txtOtherSubCategory: "",
      txtCropStage: null,
      txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
    });
    setStateCropLossIntimation("NA");
  };
  const clearFarmerAuthenticationForm = () => {
    setFormValuesForFarmerInfo({
      ...formValuesForFarmerInfo,
      txtSeasonForFarmerInfo: null,
      txtYearForFarmerInfo: null,
      txtSchemeForFarmerInfo: null,
    });
    setFormValuesTicketCreation({
      ...formValuesTicketCreation,
      txtTicketCategory: null,
      txtTicketCategoryType: null,
      txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropLossIntimation: "On-Time",
      txtCropLossTime: "",
      txtTicketDescription: "",
      txtLossAt: null,
      txtOtherSubCategory: "",
      txtCropStage: null,
      txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropName: "",
    });
    setFormValuesCallerInformation({
      ...formValuesCallerInformation,
      txtCallerMobileNumber: "",
    });

    setFormValidationFarmersInfoError({});
    setSelectedOption("1");
    setTicketCategoryTypeList([]);
    setTicketCategoryList([]);
    getTicketCategoryTypeListData("1", 0, "TCKTYP");
    setSelectedInsuranceDetails([]);
    setSelectedClaimOrGrievence([]);
    setInsuranceCompanyDataGreivence([]);
    setLossAtList([]);
    setCropStageList([]);
    setFormValidationSupportTicketError({});
    setStateCropLossIntimation("NA");
  };
  const clearAddTicketForm = () => {
    clearFarmerAuthenticationForm();
  };

  const validateFarmersInfoField = (name, value) => {
    let errorsMsg = "";

    if (name === "txtSeasonForFarmerInfo") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Season is required!";
      }
    }

    if (name === "txtYearForFarmerInfo") {
      if (!value || typeof value === "undefined") {
        errorsMsg = "Year is required!";
      }
    }

    return errorsMsg;
  };

  const handleFarmersInfoValidation = () => {
    try {
      const errors = {};
      let formIsValid = true;
      errors["txtSeasonForFarmerInfo"] = validateFarmersInfoField("txtSeasonForFarmerInfo", formValuesForFarmerInfo.txtSeasonForFarmerInfo);
      errors["txtYearForFarmerInfo"] = validateFarmersInfoField("txtYearForFarmerInfo", formValuesForFarmerInfo.txtYearForFarmerInfo);

      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      setFormValidationFarmersInfoError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Something Went Wrong",
      });
      return false;
    }
  };

  const handleValidationSupportTicket = () => {
    try {
      const errors = {};
      let formIsValid = true;
      debugger;
      // A errors["txtDocumentUpload"] = validateFieldSupportTicket("txtDocumentUpload", formValuesTicketCreation.txtDocumentUpload);
      errors["txtCallerMobileNumber"] = validateFieldSupportTicket("txtCallerMobileNumber", formValuesCallerInformation.txtCallerMobileNumber);
      errors["txtSchemeForFarmerInfo"] = validateFieldSupportTicket("txtSchemeForFarmerInfo", formValuesForFarmerInfo.txtSchemeForFarmerInfo);
      errors["txtTicketCategoryType"] = validateFieldSupportTicket("txtTicketCategoryType", formValuesTicketCreation.txtTicketCategoryType);
      errors["txtTicketCategory"] = validateFieldSupportTicket("txtTicketCategory", formValuesTicketCreation.txtTicketCategory);

      if (selectedOption === "4") {
        errors["txtCropLossDate"] = validateFieldSupportTicket("txtCropLossDate", formValuesTicketCreation.txtCropLossDate);
        // A errors["txtCropLossTime"] = validateFieldSupportTicket("txtCropLossTime", formValuesTicketCreation.txtCropLossTime);
        errors["txtLossAt"] = validateFieldSupportTicket("txtLossAt", formValuesTicketCreation.txtLossAt);
        errors["txtCropStage"] = validateFieldSupportTicket("txtCropStage", formValuesTicketCreation.txtCropStage);
        errors["txtCropName"] = validateFieldSupportTicket("txtCropName", formValuesTicketCreation.txtCropName);
        if (selectedOptionCropStage === "2") {
          errors["txtCropHarvestDate"] = validateFieldSupportTicket("txtCropHarvestDate", formValuesTicketCreation.txtCropHarvestDate);
        }

        if (
          (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 51
            : 0) ||
          (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 52
            : 0) ||
          (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 53
            : 0) ||
          (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 58
            : 0)
        ) {
          errors["txtOtherSubCategory"] = validateFieldSupportTicket("txtOtherSubCategory", formValuesTicketCreation.txtOtherSubCategory);
        }
      }
      errors["txtTicketDescription"] = validateFieldSupportTicket("txtTicketDescription", formValuesTicketCreation.txtTicketDescription);
      if (Object.values(errors).join("").toString()) {
        formIsValid = false;
      }
      setFormValidationSupportTicketError(errors);
      return formIsValid;
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "Something Went Wrong",
      });
      return false;
    }
  };

  const [btnLoaderFarmerGreivenceInfoActive, setBtnLoaderFarmerGreivenceInfoActive] = useState(false);
  const [isLoadingApplicationNoDatGreivence, setIsLoadingApplicationNodatGreivence] = useState(false);
  const [insuranceCompanyDataGreivence, setInsuranceCompanyDataGreivence] = useState([]);
  const getPolicyOfFarmerGreivenceOnClick = async () => {
    debugger;
    if (!handleFarmersInfoValidation()) {
      return;
    }
    try {
      setBtnLoaderFarmerGreivenceInfoActive(true);
      setIsLoadingApplicationNodatGreivence(true);
      if (selectedFarmer.length === 0 && selectedFarmer.length !== undefined) {
        setAlertMessage({
          type: "error",
          message: "Farmer Authentication is required!",
        });
        setBtnLoaderFarmerGreivenceInfoActive(false);
        setIsLoadingApplicationNodatGreivence(false);
        return;
      }

      let result = "";
      let formData = "";

      formData = {
        mobilenumber: "7776543289",
        seasonID: formValuesForFarmerInfo.txtSeasonForFarmerInfo ? formValuesForFarmerInfo.txtSeasonForFarmerInfo.CropSeasonID.toString() : "",
        year: formValuesForFarmerInfo.txtYearForFarmerInfo ? formValuesForFarmerInfo.txtYearForFarmerInfo.Value.toString() : "",
        farmerID: selectedFarmer ? selectedFarmer.farmerID : "",
      };
      result = await getFarmerPolicyDetail(formData);
      console.log(result, "applicationData Greivence");
      setBtnLoaderFarmerGreivenceInfoActive(false);
      setIsLoadingApplicationNodatGreivence(false);
      setSelectedInsuranceDetails([]);
      if (result.response.responseCode === 1) {
        if (result.response.responseData) {
          if (Object.keys(result.response.responseData.data).length > 0) {
            const farmersData = Object.values(result.response.responseData.data);
            if (farmersData && farmersData.length > 0) {
              const farmerAndApplicationData = [];
              farmersData.forEach((v) => {
                v.applicationList.forEach((x) => {
                  farmerAndApplicationData.push({
                    mobile: v.mobile,
                    farmerName: v.farmerName,
                    farmerID: v.farmerID,
                    aadharNumber: v.aadharNumber,
                    accountNumber: v.accountNumber,
                    relation: v.relation,
                    relativeName: v.relativeName,
                    resDistrict: v.resDistrict,
                    resState: v.resState,
                    resVillage: v.resVillage,
                    resSubDistrict: v.resSubDistrict,
                    resDistrictID: v.resDistrictID,
                    resStateID: v.resStateID,
                    resVillageID: v.resVillageID,
                    resSubDistrictID: v.resSubDistrictID,
                    policyPremium: parseFloat(v.policyPremium).toFixed(2),
                    policyArea: v.policyArea,
                    policyType: v.policyType,
                    scheme: v.scheme,
                    insuranceCompanyName: v.insuranceCompanyName,
                    policyID: x.policyID,
                    applicationStatus: x.applicationStatus,
                    applicationStatusCode: x.applicationStatusCode,
                    applicationNo: x.applicationNo,
                    landSurveyNumber: x.landSurveyNumber,
                    landDivisionNumber: x.landDivisionNumber,
                    plotVillageName: x.plotVillageName,
                    applicationSource: x.applicationSource,
                    cropName: x.cropName,
                    cropShare: parseFloat(x.cropShare).toFixed(3),
                    createdAt: x.createdAt,
                    ifscCode: x.ifscCode,
                    farmerShare: x.farmerShare,
                    sowingDate: x.sowingDate,
                  });
                });
              });
              setInsuranceCompanyDataGreivence(farmerAndApplicationData);
              toggleInsuranceCompanyModalGreivence();
            } else {
              setInsuranceCompanyDataGreivence([]);
              setAlertMessage({
                type: "warning",
                message: "Policy Data not found.",
              });
            }
          } else {
            setInsuranceCompanyDataGreivence([]);
            setAlertMessage({
              type: "warning",
              message: "Policy Data not found.",
            });
          }
        } else {
          setInsuranceCompanyDataGreivence([]);
          setAlertMessage({
            type: "warning",
            message: "Policy Data not found.",
          });
        }
      } else {
        setAlertMessage({
          type: "warning",
          message: "Policy Data not found.",
        });
      }
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };
  const updateStateForFarmerInfo = (name, value) => {
    debugger;
    setFormValuesForFarmerInfo({ ...formValuesForFarmerInfo, [name]: value });
    formValidationFarmersInfoError[name] = validateFarmersInfoField(name, value);
  };

  const [openInsuranceCompanyModalGreivence, setOpenInsuranceCompanyModalGreivence] = useState(false);
  const toggleInsuranceCompanyModalGreivence = () => {
    setOpenInsuranceCompanyModalGreivence(!openInsuranceCompanyModalGreivence);
  };

  const onCellDoubleClickedDetailsGreivence = (event) => {
    setSelectedOption("1");
    setSelectedClaimOrGrievence("GR");
    setSelectedInsuranceDetails(event.data);
    if (event.data && event.data.scheme) {
      const scheme = event.data && event.data.scheme ? schemeList.find((x) => x.ShortName === event.data.scheme) : null;
      if (scheme !== null) {
        if (formValuesForFarmerInfo.txtSchemeForFarmerInfo === null) {
          setFormValuesForFarmerInfo({
            ...formValuesForFarmerInfo,
            txtSchemeForFarmerInfo: scheme,
          });
        }
      }
    }
    setTicketCategoryTypeList([]);
    setTicketCategoryList([]);
    setLossAtList([]);
    setCropStageList([]);
    setFormValuesTicketCreation({
      ...formValuesTicketCreation,
      txtTicketCategory: null,
      txtTicketCategoryType: null,
      txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropLossIntimation: "On-time",
      txtCropLossTime: "",
      txtTicketDescription: "",
      txtLossAt: null,
      txtOtherSubCategory: "",
      txtCropStage: null,
      txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropName: "",
    });
    getTicketCategoryTypeListData("1", 0, "TCKTYP");
    toggleInsuranceCompanyModalGreivence();
  };

  const clearInsuranceFieldsAndTicketCreation = () => {
    setSelectedInsuranceDetails([]);
    setFormValuesForFarmerInfo({
      ...formValuesForFarmerInfo,
      txtSeasonForFarmerInfo: null,
      txtYearForFarmerInfo: null,
      txtSchemeForFarmerInfo: null,
    });
    setFormValuesTicketCreation({
      ...formValuesTicketCreation,
      txtTicketCategory: null,
      txtTicketCategoryType: null,
      txtCropLossDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropLossIntimation: "On-time",
      txtCropLossTime: "",
      txtTicketDescription: "",
      txtLossAt: null,
      txtOtherSubCategory: "",
      txtCropStage: null,
      txtCropHarvestDate: dateToSpecificFormat(moment(), "YYYY-MM-DD"),
      txtCropName: "",
    });
    setSelectedOption("1");
    setSelectedOptionCropStage("1");
    setTicketCategoryTypeList([]);
    setTicketCategoryList([]);
    setLossAtList([]);
    setCropStageList([]);
    getTicketCategoryTypeListData("1", 0, "TCKTYP");
  };
  const supportTicketOnClick = async () => {
    debugger;
    try {
      if (selectedInsuranceDetails.length === 0 && selectedInsuranceDetails.length !== undefined) {
        setAlertMessage({
          type: "warning",
          message: "Insurance Company is required!",
        });

        return;
      }

      if (!handleValidationSupportTicket()) {
        return;
      }
      // A const pAttachment =
      // A  formValuesTicketCreation.txtDocumentUpload && formValuesTicketCreation.txtDocumentUpload ? formValuesTicketCreation.txtDocumentUpload : "";
      // A const UniqueDateTimeTick = getCurrentDateTimeTick();
      // A let pAttachmentName = "";
      // A let phasDocument = 0;
      // A let pAttachmentPath = "";
      // A let pAttachmentDirPath = "";
      // A if (pAttachment !== "") {
      // A  phasDocument = 1;
      // A  const val = pAttachment.name;
      // A  const valExtension = val.substring(val.lastIndexOf(".")).toLowerCase().slice(1);
      // A  const valSpilt = val.split(".");
      // A  const ValOrgName = valSpilt[0].toString();
      // A  pAttachmentName = `${UniqueDateTimeTick}_${ValOrgName}.${valExtension}`;
      // A  pAttachmentPath = `${selectedFarmer.farmerID}/xxxx/${pAttachmentName}`;
      // A  switch (valExtension) {
      // A    case "jpeg":
      // A    case "jpg":
      // A    case "png":
      // A    case "pdf":
      // A      break;
      // A    default:
      // A      setAlertMessage({
      // A        type: "error",
      // A        message: "Please select only jpeg,jpg,png,pdf extension attachment.",
      // A      });
      // A      return;
      // A  }
      // A  if (pAttachment.size > 2000000) {
      // A    setAlertMessage({
      // A      type: "error",
      // A      message: "Please upload less than 2MB or 2MB attachment!",
      // A    });
      // A    return;
      // A  }
      // A }

      let pticketStatusID = 0;
      let pticketStatusNoneBMCG = 0;
      let pticketStatus = "";
      let papplicationNo = "";
      let pPolicyID = "";
      let pticketHeaderID = 0;

      if (selectedOption === "1" || selectedOption === "4") {
        pticketStatusID = 109019;
        pticketStatus = "Open";
        pticketStatusNoneBMCG = "109301";
        // A pticketHeaderID = 1;
        pticketHeaderID = Number(selectedOption);
      } else if (selectedOption === "2") {
        pticketStatusID = 109025;
        pticketStatus = "Resolved";
        pticketStatusNoneBMCG = "109303";
        // A pticketHeaderID = 2;
        pticketHeaderID = Number(selectedOption);
      }
      if (selectedClaimOrGrievence === "CI") {
        // A papplicationNo = selectedInsuranceDetails ? selectedInsuranceDetails.applicationNo : "";
        // A pPolicyID = selectedInsuranceDetails ? selectedInsuranceDetails.policyID : "";
        papplicationNo = selectedInsuranceDetails && selectedInsuranceDetails.applicationNo ? selectedInsuranceDetails.applicationNo : "";
        pPolicyID = selectedInsuranceDetails && selectedInsuranceDetails.policyID ? selectedInsuranceDetails.policyID : "";
      } else {
        // A papplicationNo = selectedInsuranceDetails && selectedInsuranceDetails.applicationList ? selectedInsuranceDetails.applicationList[0].applicationNo : "";
        // A pPolicyID = selectedInsuranceDetails && selectedInsuranceDetails.applicationList ? selectedInsuranceDetails.applicationList[0].policyID : "";
        papplicationNo = selectedInsuranceDetails && selectedInsuranceDetails.applicationNo ? selectedInsuranceDetails.applicationNo : "";
        pPolicyID = selectedInsuranceDetails && selectedInsuranceDetails.policyID ? selectedInsuranceDetails.policyID : "";
      }

      const user = getSessionStorage("user");
      const formData = {
        callerContactNumber: formValuesCallerInformation.txtCallerMobileNumber ? formValuesCallerInformation.txtCallerMobileNumber : "",
        supportTicketID: 0,
        ticketRequestorID: selectedFarmer ? selectedFarmer.farmerID : "",
        stateCodeAlpha: selectedFarmer && selectedFarmer.stateID ? selectedFarmer.stateID : selectedFarmer.resStateID ? selectedFarmer.resStateID : "",
        districtRequestorID:
          selectedFarmer && selectedFarmer.districtID ? selectedFarmer.districtID : selectedFarmer.resDistrictID ? selectedFarmer.resDistrictID : "",
        villageRequestorID:
          selectedFarmer && selectedFarmer.villageID ? selectedFarmer.villageID : selectedFarmer.resVillageID ? selectedFarmer.resVillageID : "",
        supportTicketNo: "0",
        requestorName: selectedFarmer ? selectedFarmer.farmerName : "",
        requestorMobileNo: selectedFarmer && selectedFarmer.mobile ? selectedFarmer.mobile : "",
        requestorAccountNo: selectedFarmer && selectedFarmer.accountNumber ? selectedFarmer.accountNumber : "",
        requestorAadharNo: selectedFarmer && selectedFarmer.aadharNumber4 ? selectedFarmer.aadharNumber4 : "",
        ticketCategoryID:
          formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID
            : 0,
        cropCategoryOthers: formValuesTicketCreation.txtOtherSubCategory ? formValuesTicketCreation.txtOtherSubCategory : "",
        cropStageMasterID:
          formValuesTicketCreation.txtCropStage && formValuesTicketCreation.txtCropStage.CropStageMasterID
            ? formValuesTicketCreation.txtCropStage.CropStageMasterID
            : 0,
        ticketHeaderID: pticketHeaderID,
        requestYear:
          formValuesForFarmerInfo.txtYearForFarmerInfo && formValuesForFarmerInfo.txtYearForFarmerInfo.Value
            ? formValuesForFarmerInfo.txtYearForFarmerInfo.Value
            : 0,
        requestSeason:
          formValuesForFarmerInfo.txtSeasonForFarmerInfo && formValuesForFarmerInfo.txtSeasonForFarmerInfo.CropSeasonID
            ? formValuesForFarmerInfo.txtSeasonForFarmerInfo.CropSeasonID
            : 0,

        ticketDescription: formValuesTicketCreation.txtTicketDescription,
        lossDate: selectedOption !== "4" ? null : formValuesTicketCreation.txtCropLossDate ? dateToCompanyFormat(formValuesTicketCreation.txtCropLossDate) : "",
        lossTime: selectedOption !== "4" ? null : formValuesTicketCreation.txtCropLossTime ? formValuesTicketCreation.txtCropLossTime : "",
        postHarvestDate:
          selectedOption !== "4" || selectedOptionCropStage !== "2"
            ? null
            : formValuesTicketCreation.txtCropHarvestDate
              ? dateToCompanyFormat(formValuesTicketCreation.txtCropHarvestDate)
              : "",
        ticketSourceID: 6,
        ticketStatusID: pticketStatusID,
        applicationNo: papplicationNo,
        insuranceCompanyID: 0,
        companyName: selectedInsuranceDetails ? selectedInsuranceDetails.insuranceCompanyName : "",
        companyCode: 0,
        insurancePolicyNo: pPolicyID,
        insurancePolicyDate: "",
        insuranceExpiryDate: "",
        agentUserID: user && user.LoginID ? user.LoginID.toString() : "0",
        bankMasterID: 0,
        schemeID:
          formValuesForFarmerInfo.txtSchemeForFarmerInfo && formValuesForFarmerInfo.txtSchemeForFarmerInfo.SchemeID
            ? formValuesForFarmerInfo.txtSchemeForFarmerInfo.SchemeID
            : 0,
        hasDocument: 0,
        onTimeIntimationFlag: stateCropLossIntimation,
        attachmentPath: "",
        cropName: formValuesTicketCreation.txtCropName ? formValuesTicketCreation.txtCropName : "",
        applicationCropName: selectedInsuranceDetails ? selectedInsuranceDetails.cropName : "",
        area: selectedInsuranceDetails ? selectedInsuranceDetails.policyArea : "",
        villageName: selectedInsuranceDetails ? selectedInsuranceDetails.resVillage : "",
        // A hasDocument: phasDocument,
        //  A supportTicketAttachment: `krph_documents/${pAttachmentPath}`,
      };
      setisBtndisabled(1);
      setBtnLoaderSupportTicketActive(true);
      const result = await farmergenerateSupportTicket(formData);
      setBtnLoaderSupportTicketActive(false);
      setisBtndisabled(0);
      if (result.response.responseCode === 1) {
        if (result.response && result.response.responseData) {
          let pTicketHeadName = "";
          if (selectedOption === "1") {
            pTicketHeadName = "Grievance";
          } else if (selectedOption === "2") {
            pTicketHeadName = "Information";
          } else if (selectedOption === "4") {
            pTicketHeadName = "Crop Loss Intimation";
          }
          // A pAttachmentDirPath = `${selectedFarmer.farmerID}/${
          // A  result.response.responseData.SupportTicketNo ? result.response.responseData.SupportTicketNo : ""
          // A }/`;
          setAlertMessage({
            type: "success",
            message: result.response.responseMessage,
          });
          // ************Close right now
          // A clearFormTicketCreation();
          // A showfunc();
          // ***************************

          // A if (pAttachment !== "") {
          // A  const formDataDoc = new FormData();
          // A  formDataDoc.append("ImgPath", pAttachmentDirPath);
          // A  formDataDoc.append("files", pAttachment);
          // A  formDataDoc.append("ImageName", pAttachmentName);

          // A  try {
          // A    const resultDoc = await UploadDocumentData(formDataDoc);
          // A    console.log(resultDoc);
          // A    handleResetFile();
          // A  } catch (error) {
          // A    console.log(error);
          // A  }
          // A }
          clearInsuranceFieldsAndTicketCreation();
        }
      } else {
        setAlertMessage({
          type: "error",
          message: result.response.responseMessage,
        });
      }
    } catch (error) {
      console.log(error);
      setAlertMessage({
        type: "error",
        message: error,
      });
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = 2018; i <= currentYear; i += 1) {
      yearArray.push({ Name: i.toString(), Value: i.toString() });
    }

    setYearList(yearArray.sort().reverse());
    getTicketCategoryTypeListData("1", 0, "TCKTYP");
  }, []);

  return (
    <>
      {openInsuranceCompanyModalGreivence && (
        <InsuranceCompanyModalGreivence
          toggleInsuranceCompanyModalGreivence={toggleInsuranceCompanyModalGreivence}
          onCellDoubleClickedDetailsGreivence={onCellDoubleClickedDetailsGreivence}
          insuranceCompanyDataGreivence={insuranceCompanyDataGreivence}
        />
      )}
      <div className={BizClass.Box}>
        <div className={BizClass.Div}>
          <div className={BizClass.InfoDiv}>
            <div className={BizClass.FarmerInfoDiv}>
              <div className={BizClass.Title}>
                <h3>Caller Information</h3>
              </div>
              <div className={BizClass.Content}>
                <div className={BizClass.Form_One}>
                  <Form.Group controlwidth="35%">
                    <Form.InputGroup label="Mobile No." req="true" column={1} errorMsg={formValidationSupportTicketError["txtCallerMobileNumber"]}>
                      <Form.InputControl
                        control="input"
                        name="txtCallerMobileNumber"
                        autoComplete="off"
                        value={formValuesCallerInformation.txtCallerMobileNumber}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) => updateStateCallerInformation("txtCallerMobileNumber", e.target.value.replace(/\D/g, ""))}
                      />
                    </Form.InputGroup>
                  </Form.Group>
                </div>
              </div>
              <div className={BizClass.Title}>
                <h3>Farmer Information</h3>
              </div>
              <div className={BizClass.Content}>
                <Form.Group column="2" controlwidth="360px">
                  <Form.InputGroup label="Farmer Name">
                    <p className={BizClass.ContentPresenter}>{selectedFarmer && selectedFarmer.farmerName}</p>
                  </Form.InputGroup>
                  <Form.InputGroup label="Mobile No">
                    <p className={BizClass.ContentPresenter}>{selectedFarmer && selectedFarmer.mobile ? maskMobileNumber(selectedFarmer.mobile) : ""}</p>
                  </Form.InputGroup>
                  <Form.InputGroup label="State">
                    <p className={BizClass.ContentPresenter}>
                      {selectedFarmer && selectedFarmer.state
                        ? selectedFarmer.state
                        : selectedFarmer.stateName
                          ? selectedFarmer.stateName
                          : selectedFarmer.resState
                            ? selectedFarmer.resState
                            : ""}
                    </p>
                  </Form.InputGroup>
                  <Form.InputGroup label="District">
                    <p className={BizClass.ContentPresenter}>
                      {selectedFarmer && selectedFarmer.district
                        ? selectedFarmer.district
                        : selectedFarmer.districtName
                          ? selectedFarmer.districtName
                          : selectedFarmer.resDistrict
                            ? selectedFarmer.resDistrict
                            : ""}
                    </p>
                  </Form.InputGroup>
                  <Form.InputGroup label="Taluka">
                    <p className={BizClass.ContentPresenter}>
                      {selectedFarmer && selectedFarmer.subDistrict
                        ? selectedFarmer.subDistrict
                        : selectedFarmer.resSubDistrict
                          ? selectedFarmer.resSubDistrict
                          : ""}
                    </p>
                  </Form.InputGroup>
                  <Form.InputGroup label="Village">
                    <p className={BizClass.ContentPresenter}>
                      {selectedFarmer && selectedFarmer.village
                        ? selectedFarmer.village
                        : selectedFarmer.villageName
                          ? selectedFarmer.villageName
                          : selectedFarmer.resVillage
                            ? selectedFarmer.resVillage
                            : ""}
                    </p>
                  </Form.InputGroup>
                </Form.Group>
                <div className={BizClass.ContentDiv}>
                  <Form.Group column="2" controlwidth="360px">
                    <Form.CustomGroup column={4} columntemplate="140px 140px auto">
                      <Form.InputGroup label="" errorMsg={formValidationFarmersInfoError["txtYearForFarmerInfo"]}>
                        <Form.InputControl
                          control="select"
                          label="Year"
                          name="txtYearForFarmerInfo"
                          value={formValuesForFarmerInfo.txtYearForFarmerInfo}
                          options={yearList}
                          getOptionLabel={(option) => `${option.Name}`}
                          getOptionValue={(option) => `${option}`}
                          onChange={(e) => updateStateForFarmerInfo("txtYearForFarmerInfo", e)}
                        />
                      </Form.InputGroup>
                      <Form.InputGroup errorMsg={formValidationFarmersInfoError["txtSeasonForFarmerInfo"]}>
                        <Form.InputControl
                          control="select"
                          label="Season"
                          name="txtSeasonForFarmerInfo"
                          value={formValuesForFarmerInfo.txtSeasonForFarmerInfo}
                          options={seasonForPolicyNumberDropdownDataList}
                          // A loader={isLoadingSeasonPolicyNumberDropdownDataList ? <Loader /> : null}
                          // A isLoading={isLoadingSeasonPolicyNumberDropdownDataList}
                          getOptionLabel={(option) => `${option.CropSeasonName}`}
                          getOptionValue={(option) => `${option}`}
                          onChange={(e) => updateStateForFarmerInfo("txtSeasonForFarmerInfo", e)}
                        />
                      </Form.InputGroup>
                      <Form.InputGroup label="" errorMsg={formValidationSupportTicketError["txtSchemeForFarmerInfo"]}>
                        <Form.InputControl
                          control="select"
                          label="Scheme"
                          name="txtSchemeForFarmerInfo"
                          value={formValuesForFarmerInfo.txtSchemeForFarmerInfo}
                          options={schemeList}
                          getOptionLabel={(option) => `${option.SchemeName}`}
                          getOptionValue={(option) => `${option}`}
                          onChange={(e) => updateStateForFarmerInfo("txtSchemeForFarmerInfo", e)}
                        />
                      </Form.InputGroup>
                    </Form.CustomGroup>
                  </Form.Group>
                  <Form.Group column="2" controlwidth="360px" style={{ background: "#d6dbdf", padding: "5px", "border-radius": "4px" }}>
                    <Form.InputGroup label="Insurance Company">
                      <p className={BizClass.ContentPresenter}>
                        {selectedInsuranceDetails && selectedInsuranceDetails.insuranceCompanyName ? selectedInsuranceDetails.insuranceCompanyName : ""}
                      </p>
                    </Form.InputGroup>
                    <Form.InputGroup label="Application No.">
                      <p className={BizClass.ContentPresenter}>
                        {selectedClaimOrGrievence === "CI"
                          ? selectedInsuranceDetails && selectedInsuranceDetails.applicationNo
                            ? selectedInsuranceDetails.applicationNo
                            : ""
                          : selectedInsuranceDetails && selectedInsuranceDetails.applicationNo
                            ? selectedInsuranceDetails.applicationNo
                            : ""}
                      </p>
                    </Form.InputGroup>
                    <Form.InputGroup label="Farmer Premium">
                      <p className={BizClass.ContentPresenter}>
                        {selectedClaimOrGrievence === "CI"
                          ? selectedInsuranceDetails && selectedInsuranceDetails.farmerPremium
                            ? selectedInsuranceDetails.farmerPremium
                            : ""
                          : selectedInsuranceDetails && selectedInsuranceDetails.policyPremium
                            ? selectedInsuranceDetails.policyPremium
                            : ""}
                      </p>
                    </Form.InputGroup>
                    <Form.InputGroup label="Village">
                      <p className={BizClass.ContentPresenter}>
                        {selectedClaimOrGrievence === "CI"
                          ? selectedInsuranceDetails && selectedInsuranceDetails.plotVillageName
                            ? selectedInsuranceDetails.plotVillageName
                            : ""
                          : selectedInsuranceDetails && selectedInsuranceDetails.plotVillageName
                            ? selectedInsuranceDetails.plotVillageName
                            : ""}
                      </p>
                    </Form.InputGroup>
                    <Form.InputGroup label="Area In Hactare">
                      <p className={BizClass.ContentPresenter}>
                        {selectedClaimOrGrievence === "CI"
                          ? selectedInsuranceDetails && selectedInsuranceDetails.area
                            ? selectedInsuranceDetails.area
                            : ""
                          : selectedInsuranceDetails && selectedInsuranceDetails.policyArea
                            ? selectedInsuranceDetails.policyArea
                            : ""}
                      </p>
                    </Form.InputGroup>
                    <Form.InputGroup label="Crop Name">
                      <p className={BizClass.ContentPresenter}>
                        {selectedClaimOrGrievence === "CI"
                          ? selectedInsuranceDetails && selectedInsuranceDetails.cropName
                            ? selectedInsuranceDetails.cropName
                            : ""
                          : selectedInsuranceDetails && selectedInsuranceDetails.cropName
                            ? selectedInsuranceDetails.cropName
                            : ""}
                      </p>
                    </Form.InputGroup>
                  </Form.Group>
                  <Form.Group column="2" controlwidth="360px" style={{ "padding-top": "4px" }}>
                    <div className={BizClass.InputBox} style={{ display: "flex" }}>
                      <Button
                        className={BizClass.Button}
                        trigger={btnLoaderFarmerGreivenceInfoActive && "true"}
                        onClick={() => getPolicyOfFarmerGreivenceOnClick()}
                      >
                        Fetch Details
                      </Button>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className={BizClass.CreationDiv}>
              <div className={BizClass.Title}>
                <h3>Ticket Creation</h3>
              </div>
              <div className={BizClass.Content}>
                <Form.Group column="2" controlwidth="360px">
                  <Form.InputGroup label="Ticket Type" errorMsg="" column={3}>
                    <ul className={BizClass.ValidateTabGroup}>
                      <button type="button" className={selectedOption === "1" && BizClass.Active} onClick={() => selectedOptionOnClick("GR")}>
                        <div className={BizClass.ValidateTabCheckBox} />
                        <span>Grievance</span>
                      </button>
                      <button type="button" className={selectedOption === "2" && BizClass.Active} onClick={() => selectedOptionOnClick("IN")}>
                        <div className={BizClass.ValidateTabCheckBox} />
                        <span>Information</span>
                      </button>
                      <button type="button" className={selectedOption === "4" && BizClass.Active} onClick={() => selectedOptionOnClick("LO")}>
                        <div className={BizClass.ValidateTabCheckBox} />
                        <span>Crop Loss Intimation</span>
                      </button>
                    </ul>
                  </Form.InputGroup>
                  {selectedOption === "4" ? (
                    <Form.InputGroup label="" errorMsg="" column={4}>
                      <ul className={BizClass.ValidateTabGroup}>
                        {(formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 51
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 52
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 53
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 58
                          : 0) ? (
                          <button type="button" style={{ border: "none", width: "90px" }} />
                        ) : selectedOptionCropStage === "2" || selectedOptionCropStage === "1" ? (
                          <button type="button" style={{ border: "none", width: "70px" }} />
                        ) : null}

                        <button
                          type="button"
                          className={selectedOptionCropStage === "1" && BizClass.Active}
                          onClick={() => selectedOptionOnClickCropStage("SCS")}
                        >
                          <div className={BizClass.ValidateTabCheckBox} />
                          <span>Standing Crop Stage</span>
                        </button>
                        <button
                          type="button"
                          className={selectedOptionCropStage === "2" && BizClass.Active}
                          onClick={() => selectedOptionOnClickCropStage("HS")}
                        >
                          <div className={BizClass.ValidateTabCheckBox} />
                          <span>Harvested Stage</span>
                        </button>
                      </ul>
                    </Form.InputGroup>
                  ) : null}
                  {/* <Form.InputGroup column={2} label="Attachment" errorMsg={formValidationSupportTicketError["txtDocumentUpload"]}>
                    <Form.InputControl
                      control="input"
                      type="file"
                      accept="image/*,.pdf"
                      name="txtDocumentUpload"
                      onChange={(e) => updateStateTicketCreation(e.target.name, e.target.files[0])}
                      ref={fileRef}
                    />
                  </Form.InputGroup>
                  <Form.InputGroup column={1}>
                    <Button type="button" varient="primary" onClick={() => handleResetFile()}>
                      {" "}
                      Reset File
                    </Button>
                  </Form.InputGroup> */}
                  {selectedOption === "4" ? (
                    <Form.InputGroup column={3} label="Loss At" errorMsg={formValidationSupportTicketError["txtLossAt"]}>
                      <Form.InputControl
                        control="select"
                        name="txtLossAt"
                        value={formValuesTicketCreation.txtLossAt}
                        options={lossAtList}
                        // A loader={isLoadingLossAtList ? <Loader /> : null}
                        isLoading={isLoadingLossAtList}
                        getOptionLabel={(option) => `${option.CropStageSelection}`}
                        getOptionValue={(option) => `${option}`}
                        onChange={(e) => updateStateTicketCreation("txtLossAt", e)}
                      />
                    </Form.InputGroup>
                  ) : null}
                  <Form.InputGroup label="Category" errorMsg={formValidationSupportTicketError["txtTicketCategoryType"]}>
                    <Form.InputControl
                      control="select"
                      name="txtTicketCategoryType"
                      value={formValuesTicketCreation.txtTicketCategoryType}
                      options={ticketCategoryTypeList}
                      // A loader={isLoadingTicketCategoryTypeList ? <Loader /> : null}
                      isLoading={isLoadingTicketCategoryTypeList}
                      getOptionLabel={(option) => `${option.SupportTicketTypeName}`}
                      getOptionValue={(option) => `${option}`}
                      onChange={(e) => updateStateTicketCreation("txtTicketCategoryType", e)}
                    />
                  </Form.InputGroup>
                  <Form.InputGroup label="Sub Category" errorMsg={formValidationSupportTicketError["txtTicketCategory"]}>
                    <Form.InputControl
                      control="select"
                      name="txtTicketCategory"
                      value={formValuesTicketCreation.txtTicketCategory}
                      options={ticketCategoryList}
                      // A loader={isLoadingTicketCategoryList ? <Loader /> : null}
                      isLoading={isLoadingTicketCategoryList}
                      getOptionLabel={(option) => `${option.TicketCategoryName}`}
                      getOptionValue={(option) => `${option}`}
                      onChange={(e) => updateStateTicketCreation("txtTicketCategory", e)}
                    />
                  </Form.InputGroup>
                  {(formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                    ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 51
                    : 0) ||
                  (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                    ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 52
                    : 0) ||
                  (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                    ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 53
                    : 0) ||
                  (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                    ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 58
                    : 0) ? (
                    <Form.InputGroup column={3} label="Other Sub Cat." errorMsg={formValidationSupportTicketError["txtOtherSubCategory"]}>
                      <Form.InputControl
                        control="input"
                        type="text"
                        name="txtOtherSubCategory"
                        value={formValuesTicketCreation.txtOtherSubCategory}
                        onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                      />
                    </Form.InputGroup>
                  ) : null}
                  {selectedOption === "4" ? (
                    <Form.InputGroup column={3} label="Crop Stage" errorMsg={formValidationSupportTicketError["txtCropStage"]}>
                      <Form.InputControl
                        control="select"
                        name="txtCropStage"
                        value={formValuesTicketCreation.txtCropStage}
                        options={cropStageList}
                        // A loader={isLoadingCropStageList ? <Loader /> : null}
                        isLoading={isLoadingCropStageList}
                        getOptionLabel={(option) => `${option.CropStageMaster}`}
                        getOptionValue={(option) => `${option}`}
                        onChange={(e) => updateStateTicketCreation("txtCropStage", e)}
                      />
                    </Form.InputGroup>
                  ) : null}
                  {selectedOption === "4" ? (
                    <Form.CustomGroup
                      column={4}
                      columntemplate={
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 51
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 52
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 53
                          : 0) ||
                        (formValuesTicketCreation.txtTicketCategory && formValuesTicketCreation.txtTicketCategory.TicketCategoryID
                          ? formValuesTicketCreation.txtTicketCategory.TicketCategoryID === 58
                          : 0)
                          ? "90px 110px 68px 110px 85px auto"
                          : selectedOptionCropStage === "2"
                            ? "75px 110px 60px 110px 85px auto"
                            : selectedOptionCropStage === "1"
                              ? "70px 110px 85px auto"
                              : null
                      }
                    >
                      {selectedOptionCropStage === "2" ? (
                        <Form.InputGroup label="Harvest Date" req={true} errorMsg={formValidationSupportTicketError["txtCropHarvestDate"]}>
                          <Form.InputControl
                            control="input"
                            type="date"
                            name="txtCropHarvestDate"
                            value={formValuesTicketCreation.txtCropHarvestDate}
                            onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                            max={dateToSpecificFormat(moment().subtract(0, "days"), "YYYY-MM-DD")}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </Form.InputGroup>
                      ) : null}
                      {selectedOptionCropStage === "2" || selectedOptionCropStage === "1" ? (
                        <Form.InputGroup label="Loss Date" req={true} errorMsg={formValidationSupportTicketError["txtCropLossDate"]}>
                          <Form.InputControl
                            control="input"
                            type="date"
                            name="txtCropLossDate"
                            value={formValuesTicketCreation.txtCropLossDate}
                            onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                            min={dateToSpecificFormat(moment().subtract(1, "months"), "YYYY-MM-DD")}
                            max={dateToSpecificFormat(moment(), "YYYY-MM-DD")}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </Form.InputGroup>
                      ) : null}
                      {selectedOptionCropStage === "2" || selectedOptionCropStage === "1" ? (
                        <Form.InputGroup label="">
                          <Form.InputControl
                            control="input"
                            type="text"
                            name="txtCropLossIntimation"
                            value={formValuesTicketCreation.txtCropLossIntimation}
                            onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                            style={
                              stateCropLossIntimation === "YES" || stateCropLossIntimation === "NA"
                                ? { color: "#3f4254", background: "#ffffff" }
                                : { color: "#ffffff" }
                            }
                            className={
                              stateCropLossIntimation === "YES" || stateCropLossIntimation === "NA"
                                ? BizClass.disabledOnIntimationTextBox
                                : BizClass.disabledLateIntimationTextBox
                            }
                          />
                        </Form.InputGroup>
                      ) : null}
                      <Form.InputGroup label="" req={false} errorMsg={formValidationSupportTicketError["txtCropLossTime"]} style={{ display: "none" }}>
                        <Form.InputControl
                          control="input"
                          type="time"
                          name="txtCropLossTime"
                          value={formValuesTicketCreation.txtCropLossTime}
                          onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                        />
                      </Form.InputGroup>
                    </Form.CustomGroup>
                  ) : null}
                  {selectedOption === "4" ? (
                    <Form.InputGroup column={3} errorMsg={formValidationSupportTicketError["txtCropName"]} label="Crop Name">
                      <Form.InputControl
                        control="input"
                        autoComplete="off"
                        name="txtCropName"
                        value={formValuesTicketCreation.txtCropName}
                        placeholder=""
                        onChange={(e) => updateStateTicketCreation(e.target.name, e.target.value)}
                      />
                    </Form.InputGroup>
                  ) : null}
                  <Form.InputGroup label="Description" column={3} row={11} errorMsg={formValidationSupportTicketError["txtTicketDescription"]}>
                    <Form.InputControl
                      control="textarea"
                      row="11"
                      maxLength="500"
                      name="txtTicketDescription"
                      value={formValuesTicketCreation.txtTicketDescription}
                      onChange={(e) => updateStateTicketCreation("txtTicketDescription", e.target.value)}
                    />
                  </Form.InputGroup>
                </Form.Group>
                <div className={BizClass.ValidateFormFooter}>
                  <Button
                    className={isBtndisabled === 0 ? BizClass.FormFooterButton : classNames(BizClass.disableFormFooterButton, BizClass.FormFooterButton)}
                    disabled={isBtndisabled}
                    trigger={btnLoaderSupportTicketActive && "true"}
                    // A onClick={() => supportTicketOnClick(updateFarmersTickets, updateFarmersTicketsStatusCount, showfunc)}
                    onClick={() => supportTicketOnClick()}
                  >
                    Submit
                  </Button>
                  <Button className={BizClass.FormFooterButton} onClick={() => clearAddTicketForm()}>
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CropLossintimationTickets;

function InsuranceCompanyModalGreivence({ toggleInsuranceCompanyModalGreivence, onCellDoubleClickedDetailsGreivence, insuranceCompanyDataGreivence }) {
  return (
    <Modal title="Grievance" varient="bottom" width="100vw" show={toggleInsuranceCompanyModalGreivence} right={0} height="60vh">
      <Modal.Body>
        <div className={BizClass.ModalBox}>
          <PageBar>
            <PageBar.Search />
          </PageBar>
          <DataGrid
            rowData={insuranceCompanyDataGreivence}
            // A loader={isLoadingApplicationNoDataGreivence ? <Loader /> : null}
            rowSelection="single"
            suppressRowClickSelection="true"
            // A onGridReady={onGridReadySupportTicketGreivence}
            onCellDoubleClicked={(event) => onCellDoubleClickedDetailsGreivence(event)}
            tooltipShowDelay={500}
            tooltipMouseTrack={true}
            tooltipInteraction={true}
          >
            <DataGrid.Column field="insuranceCompanyName" headerName="Insurance Company Name" width="280px" headerTooltip="Name of the insurance company" />
            <DataGrid.Column
              field="policyID"
              headerName="Policy Number"
              width="180"
              headerTooltip="Policy no.: <scheme code><season code><state code><YY><Insurance policy>"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].policyID : null;
              // A }}
            />
            <DataGrid.Column
              field="policyPremium"
              headerName="Total Premium"
              width="132px"
              headerTooltip="Total Premium of policy for all the applications against the policy"
            />
            <DataGrid.Column
              field="policyArea"
              headerName="Total Area"
              width="110px"
              headerTooltip="Total Area of policy in hectare, for all the applications against the policy"
            />
            <DataGrid.Column
              field="applicationNo"
              headerName="Application Number"
              width="170"
              headerTooltip="Application number against respective land and crop. It may be multiple against the same policy ID for different land"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].applicationNo : null;
              // A  }}
            />
            <DataGrid.Column
              field="cropName"
              headerName="Crop Name"
              width="140"
              headerTooltip="Crop Covered for the particular application against the policy"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].cropName : null;
              // A }}
            />
            <DataGrid.Column
              field="farmerShare"
              headerName="Premium Share"
              width="140"
              headerTooltip="Premium Share of particular Application"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].farmerShare : null;
              // A }}
            />
            <DataGrid.Column
              field="cropShare"
              headerName="Area covered under Application"
              width="235"
              headerTooltip="sowing crop area in land"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].cropShare : null;
              // A }}
            />
            <DataGrid.Column
              field="landSurveyNumber"
              headerName="Land Number"
              width="125"
              headerTooltip="Registered Number of Total Land (Khata Number)"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].landSurveyNumber : null;
              // A }}
            />
            <DataGrid.Column
              field="landDivisionNumber"
              headerName="Division Number"
              width="140"
              headerTooltip="Division number against of that particular Land"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].landDivisionNumber : null;
              // A }}
            />

            <DataGrid.Column
              field="applicationSource"
              headerName="Source"
              width="90"
              headerTooltip="Source of the application submitted by Farmer"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].applicationSource : null;
              // A  }}
            />
            <DataGrid.Column
              field="applicationStatus"
              headerName="Application Status"
              width="190"
              headerTooltip="Status of the application submitted by farmer"
              // A cellRenderer={(node) => {
              // A  return node.data.applicationList.length > 0 ? node.data.applicationList[0].applicationStatus : null;
              // A }}
            />
          </DataGrid>
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

InsuranceCompanyModalGreivence.propTypes = {
  toggleInsuranceCompanyModalGreivence: PropTypes.func.isRequired,
  onGridReadySupportTicketGreivence: PropTypes.func.isRequired,
  insuranceCompanyDataGreivence: PropTypes.func.isRequired,
  isLoadingApplicationNoDataGreivence: PropTypes.bool.isRequired,
  onCellDoubleClickedDetailsGreivence: PropTypes.func.isRequired,
  getClaimStatusOnClick: PropTypes.func.isRequired,
};

function ClaimStatusModal({
  toggleClaimStatusModal,
  onGridReadyClaimStatus,
  claimStatusData,
  onChangeClamStatus,
  isLoadingClaimStatusDataData,
  openCustomeWindow,
  OnClickCustomeWindow,
  customeWindowWidth,
  customeWindowHeight,
}) {
  return (
    <Modal
      title="Claim Status"
      varient="bottom"
      width={customeWindowWidth}
      show={toggleClaimStatusModal}
      left="90px"
      bottom="12.5px"
      height={customeWindowHeight}
    >
      <Modal.Header>
        <span style={{ width: "100%" }} />
        {openCustomeWindow === "S" ? (
          <AiOutlinePlusSquare title="Maximize The Window" style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => OnClickCustomeWindow("S")} />
        ) : openCustomeWindow === "B" ? (
          <AiOutlineMinusSquare title="Minimize The Window" style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => OnClickCustomeWindow("B")} />
        ) : null}
      </Modal.Header>
      <Modal.Body>
        <div className={BizClass.ModalBox}>
          <PageBar>
            <PageBar.Search onChange={(e) => onChangeClamStatus(e.target.value)} />
          </PageBar>
          <DataGrid
            rowData={claimStatusData}
            loader={isLoadingClaimStatusDataData ? <Loader /> : null}
            rowSelection="single"
            suppressRowClickSelection="true"
            onGridReady={onGridReadyClaimStatus}
          >
            <DataGrid.Column field="applicationNo" headerName="Application Number" width="175px" />
            <DataGrid.Column
              field="claimDate"
              headerName="Claim Date"
              width="115px"
              cellRenderer={(node) => {
                return dateFormatDDMMYY(node.data.claimDate);
              }}
            />
            <DataGrid.Column field="amount" headerName="Claim Amount" width="135px" />
            <DataGrid.Column field="ClaimType" headerName="Claim Type" width="150px" />
            <DataGrid.Column field="UtrNumber" headerName="UTR Number" width="140px" />
            <DataGrid.Column field="aadharPaymentAccountNumber" headerName="Payment To Account Number" width="220px" />
            <DataGrid.Column field="aadharPaymentBankName" headerName="Payment To Bank Name" width="220px" />
            <DataGrid.Column field="aadharPaymentFarmerName" headerName="Farmer Name" width="290px" />
            <DataGrid.Column
              field="aadharPaymentAadharNumber"
              headerName="Aadhar Number"
              width="140px"
              valueGetter={(node) => {
                return node.data.aadharPaymentAadharNumber ? node.data.aadharPaymentAadharNumber.replace(/.(?=.{4})/g, "x") : null;
              }}
            />
            <DataGrid.Column field="ClaimStatus" headerName="Claim Status" width="220px" />
            <DataGrid.Column field="paymentMode" headerName="Payment Mode" width="140px" />
            <DataGrid.Column field="Status" headerName="Status" width="155px" />
          </DataGrid>
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

ClaimStatusModal.propTypes = {
  toggleClaimStatusModal: PropTypes.func.isRequired,
  onGridReadyClaimStatus: PropTypes.func.isRequired,
  claimStatusData: PropTypes.func.isRequired,
  onChangeClamStatus: PropTypes.func.isRequired,
  isLoadingClaimStatusDataData: PropTypes.bool.isRequired,
  OnClickCustomeWindow: PropTypes.func.isRequired,
  openCustomeWindow: PropTypes.string,
  customeWindowWidth: PropTypes.string,
  customeWindowHeight: PropTypes.string,
};
