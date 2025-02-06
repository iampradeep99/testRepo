import BillingDashboard from "../BillingDashboard";

const APIEndpoints = {
  Reports: {
    summaryTotalReports: "FGMS/summaryTotalReports",
    billingAgentDashboard: "FGMS/billingAgentDashboard",
    billingObCallDetails: "FGMS/billingObCallDetails",
    billingobcompanyShareDetails: "FGMS/billingobcompanyShareDetails",
    billingIbCompanyShareDetails: "FGMS/billingIbCompanyShareDetails",
    billingSmsCompanyDetails: "FGMS//billingSmsCompanyDetails",
    // A billingAgentWorkingDayDetails: "FGMS/billingAgentWorkingDayDetails",
    billingAgentWorkingDayDetails: "FGMS/agentWorkingDetails",
    agentOvertimeDetails: "FGMS/agentOvertimeDetails",
    whatsappdataDetails: "FGMS/billingGupsupWhatappCompanyDetail",
    getInsuranceCompanyList: "FGMS/getInsuranceCompanyList",
    getfeedbackformquestions: "FGMS/farmer-feedback/questions",
  },
};

export default APIEndpoints;
