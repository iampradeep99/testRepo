import React, { useState } from "react";
import Calculationdetails from "../Partials/Calculationdetails";
import Tabledata from "../Partials/Tabledata";
import Calculationdetailsbootom from "../Partials/Calculationdetailsbootom";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";



const Agentscomponent = ({
  activeKey,
  currentcarddetails,
  billingDashBoardList = [],
  numberWithCommas,
  grandTotalIBTCAgentPercntShare,
  grandTotalAgentCost,
  billingDashBoardAgentICList = [],
  noOfWorkingDays,
  totalICAgentTotalAmount,
  totalICAgentGSTAmount,
  totalICAgentTotalBillableAmount,
  billingDashBoardAgentWorkingDetailsList,
  downloadpdfdata,
}) => {
  const [show, setShow] = useState(false);
  const detailscards = [
    {
      show: true,
      name: "No. Of Active Agents",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].active_agent
          ? `${numberWithCommas(billingDashBoardList[0].active_agent)}`
          : "0",
    },
    {
      show: true,
      name: "No. Of Working Days",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].total_working_days_in_month
          ? `${numberWithCommas(billingDashBoardList[0].total_working_days_in_month)}`
          : "0",
    },
    {
      show: false,
      name: "No. Of Calls Attended",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].call_attended
          ? `${numberWithCommas(billingDashBoardList[0].call_attended)}`
          : "0",
    },
    {
      show: false,
      name: "No. Of Training Hours",
      value: billingDashBoardList && billingDashBoardList.length > 0 ? `${numberWithCommas(billingDashBoardList[0].total_training_hr)}` : "0",
    },
  ];
  const columns = ["Sr. No", "Insurance Company", "% Share of IBTC Pulses (B1)", "Share of Working Days"];
  const tabledata =
    billingDashBoardAgentICList && billingDashBoardAgentICList.length > 0 && billingDashBoardAgentICList[0].IC_data
      ? billingDashBoardAgentICList[0].IC_data.map((item, index) => ({
          index: index + 1,
          id: item["_id"],
          tagedPulses: item.percentagePulse ? `${numberWithCommas(parseFloat(item.percentagePulse).toFixed(2))}%` : "0%", // Format percentagePulse as a percentage
          percentagePulse:
            item.percentagePulse && noOfWorkingDays
              ? numberWithCommas(parseFloat((parseFloat(item.percentagePulse) * noOfWorkingDays) / 100).toFixed(2))
              : "0.00", // Calculate percentage for working days and format it
        }))
      : [];

  const grandtotal = [
    grandTotalIBTCAgentPercntShare ? `${numberWithCommas(parseFloat(grandTotalIBTCAgentPercntShare).toFixed(2))}%` : "0%",
    grandTotalAgentCost ? numberWithCommas(parseFloat(grandTotalAgentCost).toFixed(2)) : 0,
  ];

  const columns2 = ["Sr. No", "Agent Id", "Working Days (Including Training)", "Weekly Off And Holidays (In Days)", "Total No. Of Working Days"];
  const tabledata2 =
    billingDashBoardAgentWorkingDetailsList && billingDashBoardAgentWorkingDetailsList.length > 0
      ? billingDashBoardAgentWorkingDetailsList.map((item, index) => ({
          index: index + 1,
          id: item.user || "0",
          tagedPulses: item.working_days ? numberWithCommas(parseFloat(item.working_days).toFixed(2)) : "0",
          percentagePulse: item.holidays && item.holidays.total_holidays ? numberWithCommas(parseFloat(item.holidays.total_holidays).toFixed(2)) : "0",
          untagedPulses: item.total_working_days ? numberWithCommas(parseFloat(item.total_working_days).toFixed(2)) : "0",
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
        <div className="d-flex align-items-center justify-content-between">
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
            {show ? <FaAngleUp /> : <FaAngleDown /> }
          </button>
        </div>
      </div>
      {show && <Tabledata columns={columns2} tabledata={tabledata2} grandtotal={grandtotal2} customStyle={customStyle2} />}

      <Calculationdetailsbootom
        name={"Call Center Agents Billing Total of Insurance Company"}
        currentcarddetails={currentcarddetails}
        tabonename={["Agents Share of Working Days IC wise", "X2 = (S1 * 122)/No. Of Days In Month"]}
        inboundpulse={totalICAgentTotalAmount ? `Rs. ${numberWithCommas(parseFloat(totalICAgentTotalAmount).toFixed(2))}` : 0}
        tabtwoname={["Taxes (GST)", "Y1 = X1 * 18%"]}
        taxes={totalICAgentGSTAmount ? `Rs. ${numberWithCommas(parseFloat(totalICAgentGSTAmount).toFixed(2))}` : 0}
        tabthree={["Total Bill for IB Pulses", "Z1 = X1 + Y1"]}
        total={totalICAgentTotalBillableAmount ? `Rs. ${numberWithCommas(parseFloat(totalICAgentTotalBillableAmount).toFixed(2))}` : 0}
      />
    </div>
  );
};

export default Agentscomponent;
