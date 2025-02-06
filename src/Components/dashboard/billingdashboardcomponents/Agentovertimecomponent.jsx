import React, { useState } from "react";
import Calculationdetails from "../Partials/Calculationdetails";
import Tabledata from "../Partials/Tabledata";
import Calculationdetailsbootom from "../Partials/Calculationdetailsbootom";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const Agentovertimecomponent = ({
  activeKey,
  currentcarddetails,
  numberWithCommas,
  billingDashBoardAgentOverTimeList,
  billingDashBoardAgentOverTimeICList,
  grandTotalIBTCAgentPercntShareOverTime,
  grandTotalAgentCostOverTime,
  noOfWorkingDaysOverTime,
  totalICAgentTotalAmountOverTime,
  totalICAgentGSTAmountOverTime,
  totalICAgentTotalBillableAmountOverTime,
  billingDashBoardAgentWorkingOverTimeDetailsList,
  downloadpdfdata,
}) => {
  const [show, setShow] = useState(false);
  const detailscards = [
    {
      show: false,
      name: "No. Of Active Agents",
      value:
        billingDashBoardAgentOverTimeList && billingDashBoardAgentOverTimeList.length > 0 && billingDashBoardAgentOverTimeList[0].active_agent
          ? `${numberWithCommas(billingDashBoardAgentOverTimeList[0].active_agent)}`
          : "0",
    },
    {
      show: true,
      name: "No. Of Working Over Time",
      value: noOfWorkingDaysOverTime ? `${numberWithCommas(parseFloat(noOfWorkingDaysOverTime).toFixed(2))} Hours` : "0",
    },
    {
      show: false,
      name: "No. Of Calls Attended",
      value:
        billingDashBoardAgentOverTimeList && billingDashBoardAgentOverTimeList.length > 0 && billingDashBoardAgentOverTimeList[0].call_attended
          ? `${numberWithCommas(billingDashBoardAgentOverTimeList[0].call_attended)}`
          : "0",
    },
    {
      show: false,
      name: "No. Of Training Hours",
      value:
        billingDashBoardAgentOverTimeList && billingDashBoardAgentOverTimeList.length > 0
          ? `(${numberWithCommas(billingDashBoardAgentOverTimeList[0].total_training_hr)})`
          : "(0)",
    },
  ];
  const columns = ["Sr. No", "Insurance Company", "% Share of IBTC Pulses (B1)", "Share of Working Over Time"];
  const tabledata =
    billingDashBoardAgentOverTimeICList && billingDashBoardAgentOverTimeICList.length > 0 && billingDashBoardAgentOverTimeICList[0].IC_data
      ? billingDashBoardAgentOverTimeICList[0].IC_data.map((item, index) => ({
          index: index + 1,
          id: item["_id"],
          tagedPulses: item.percentagePulse ? `${numberWithCommas(parseFloat(item.percentagePulse).toFixed(2))}%` : "0%",
          percentagePulse:
            item.percentagePulse && noOfWorkingDaysOverTime
              ? numberWithCommas(parseFloat((parseFloat(item.percentagePulse) * noOfWorkingDaysOverTime) / 100).toFixed(2))
              : "0.00",
        }))
      : [];

  const grandtotal = [
    grandTotalIBTCAgentPercntShareOverTime ? `${numberWithCommas(parseFloat(grandTotalIBTCAgentPercntShareOverTime).toFixed(2))}%` : "0%",
    grandTotalAgentCostOverTime ? numberWithCommas(parseFloat(grandTotalAgentCostOverTime).toFixed(2)) : "0",
  ];
  const columns2 = ["Sr. No", "Agent Id", "Over Time (In Hours)"];
  const tabledata2 =
    billingDashBoardAgentWorkingOverTimeDetailsList && billingDashBoardAgentWorkingOverTimeDetailsList.length > 0
      ? billingDashBoardAgentWorkingOverTimeDetailsList.map((item, index) => ({
          index: index + 1,
          id: item.user || "0",
          tagedPulses: item.overtime_hours ? numberWithCommas(parseFloat(item.overtime_hours).toFixed(2)) : "0",
        }))
      : [];

  const grandtotal2 = [];

  let customStyle = [
    { textAlign: "left", textWrap: "nowrap" },
    { textAlign: "left" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
  ];
  let customStyle2 = [
    { textAlign: "left", textWrap: "nowrap" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
  ];
  return (
    <div>
      <Calculationdetails
        activeKey={activeKey}
        currentcarddetails={currentcarddetails}
        showcal={false}
        total={false}
        name={"Agents"}
        detailscards={detailscards}
      />

      <Tabledata columns={columns} tabledata={tabledata} grandtotal={grandtotal} customStyle={customStyle} downloadpdfdata={downloadpdfdata} />
      <div className="py-3 calculationdetails">
        <div className="d-flex align-items-center justify-content-between custom-gap">
          <div className="d-flex align-items-center justify-content-start custom-gap">
            <p className="title">Agent Working Details</p>
            <div className="green-line"></div>
          </div>
          <button
            className="btn btn-primary btn-sm bg-orange"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>
      {show && <Tabledata columns={columns2} tabledata={tabledata2} grandtotal={grandtotal2} customStyle={customStyle2} />}

      <Calculationdetailsbootom
        name={"Call Center Agents Billing Total of Insurance Company"}
        currentcarddetails={currentcarddetails}
        tabonename={["Agents Share of Working Days IC wise", "X2 = (S1 * 122)/No. Of Days In Month"]}
        inboundpulse={totalICAgentTotalAmountOverTime ? `Rs. ${numberWithCommas(parseFloat(totalICAgentTotalAmountOverTime).toFixed(2))}` : 0}
        tabtwoname={["Taxes (GST)", "Y2 = X2 * 18 %"]}
        taxes={totalICAgentGSTAmountOverTime ? `Rs. ${numberWithCommas(parseFloat(totalICAgentGSTAmountOverTime).toFixed(2))}` : 0}
        tabthree={["Total Bill Agents", "Z2 = X2 + Y2"]}
        total={totalICAgentTotalBillableAmountOverTime ? `Rs. ${numberWithCommas(parseFloat(totalICAgentTotalBillableAmountOverTime).toFixed(2))}` : 0}
      />
    </div>
  );
};

export default Agentovertimecomponent;
