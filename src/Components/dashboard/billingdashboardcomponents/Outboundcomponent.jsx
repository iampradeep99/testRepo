import React from "react";
import Calculationdetails from "../Partials/Calculationdetails";
import Tabledata from "../Partials/Tabledata";
import Calculationdetailsbootom from "../Partials/Calculationdetailsbootom";

const Outboundcomponent = ({
  activeKey,
  currentcarddetails,
  billingDashBoardList = [],
  numberWithCommas,
  billingDashBoardObICDetailsList = [],
  grandTotalOBTCPercntShare,
  grandTotalOBPulses,
  totalICOBTotalAmount,
  totalICOBGSTAmount,
  totalICOBTotalBillableAmount,
  downloadpdfdata,
}) => {
  const detailscards = [
    {
      show: false,
      name: "No. Of Active Agents",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].totalDistinctAgents
          ? `${numberWithCommas(billingDashBoardList[0].totalDistinctAgents)}`
          : "0",
    },
    {
      show: true,
      name: "No. Of Outbound Calls",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].totalCalls
          ? `${numberWithCommas(billingDashBoardList[0].totalCalls)}`
          : "0",
    },
    {
      show: true,
      name: "Total OB Billable Pulses",
      value:
        billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0].totalCustPulse
          ? `${numberWithCommas(billingDashBoardList[0].totalCustPulse)}`
          : "0",
    },
  ];
  const columns = ["Sr. No", "Insurance Company", "% Share of OBTC Pulses (B1)", "Share of Outbound Calls(T*= B1 * Total OB Billable Pulses)"];
  const tabledata =
    billingDashBoardObICDetailsList && billingDashBoardObICDetailsList.length > 0 && billingDashBoardObICDetailsList[0].ic_data
      ? billingDashBoardObICDetailsList[0].ic_data.map((item, index) => ({
          index: index + 1,
          id: item["_id"],
          tagedPulses: item.tagged_pulse_percentage ? `${numberWithCommas(parseFloat(item.tagged_pulse_percentage).toFixed(2))}%` : "0%",
          percentagePulse: item.total_pulses ? numberWithCommas(parseFloat(item.total_pulses).toFixed(2)) : "0.00",
        }))
      : [];

  const grandtotal = [
    grandTotalOBTCPercntShare ? `${numberWithCommas(parseFloat(grandTotalOBTCPercntShare).toFixed(2))}%` : "0",
    grandTotalOBPulses ? numberWithCommas(parseFloat(grandTotalOBPulses).toFixed(2)) : "0",
  ];
  let customStyle = [
    { textAlign: "left", textWrap: "nowrap" },
    { textAlign: "left" },
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
        name={"Outbound Calls Details"}
        detailscards={detailscards}
      />

      <Tabledata columns={columns} tabledata={tabledata} grandtotal={grandtotal} customStyle={customStyle} downloadpdfdata={downloadpdfdata} />

      <Calculationdetailsbootom
        name={"Out Bound Pulses Billing Total of Insurance Company"}
        currentcarddetails={currentcarddetails}
        tabonename={["Amount for Out bound Pulses", "X1 = R1 * 1.25"]}
        inboundpulse={totalICOBTotalAmount ? `Rs. ${numberWithCommas(parseFloat(totalICOBTotalAmount).toFixed(2))}` : "0"}
        tabtwoname={["Taxes (GST)", "Y3 = X3 * 18%"]}
        taxes={totalICOBGSTAmount ? `Rs. ${numberWithCommas(parseFloat(totalICOBGSTAmount).toFixed(2))}` : "0"}
        tabthree={["Total Bill for OB Pulses", "Z3 = X3 + Y3"]}
        total={totalICOBTotalBillableAmount ? `Rs. ${numberWithCommas(parseFloat(totalICOBTotalBillableAmount).toFixed(2))}` : "0"}
      />
    </div>
  );
};

export default Outboundcomponent;
