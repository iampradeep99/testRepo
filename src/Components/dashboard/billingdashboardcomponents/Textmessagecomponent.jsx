import React, { useEffect, useState } from "react";
import Calculationdetails from "../Partials/Calculationdetails";
import Tabledata from "../Partials/Tabledata";
import Calculationdetailsbootom from "../Partials/Calculationdetailsbootom";

const Textmessagecomponent = ({
  activeKey,
  currentcarddetails,
  numberWithCommas,
  billingDashBoardList,
  totalICTxtMsgTotalAmount,
  totalICTxtMsgGSTAmount,
  totalICTxtMsgTotalBillableAmount,
  grandTotalTextMsgPercntShare,
  grandTotalTextMsg,
  downloadpdfdata,
  sumColumn,
}) => {
  const [detailscards, setDetailscards] = useState([]);
  const columns = ["Sr. No", "Insurance Company", "% Share of IBTC Pulses (B1)", "SMS count to be Billed(U*= B1 * Total SMS sent)"];
  console.log(billingDashBoardList);
  const tabledata =
    billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0]
      ? billingDashBoardList[0].map((item, index) => ({
          index: index + 1,
          id: item["_id"],
          tagedPulses: item.perentage_pulses ? `${numberWithCommas(parseFloat(item.perentage_pulses).toFixed(2))}%` : "0%",
          percentagePulse: item.sms_submission ? numberWithCommas(parseFloat(item.sms_submission).toFixed(2)) : "0.00",
        }))
      : [];

  const grandtotal = [
    grandTotalTextMsgPercntShare ? `${numberWithCommas(parseFloat(grandTotalTextMsgPercntShare).toFixed(2))}%` : "0%",
    grandTotalTextMsg ? numberWithCommas(parseFloat(grandTotalTextMsg).toFixed(2)) : "0",
  ];
  let customStyle = [
    { textAlign: "left", textWrap: "nowrap" },
    { textAlign: "left" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
  ];
  useEffect(() => {
    if (billingDashBoardList && billingDashBoardList?.[0]?.length > 0) {
      setDetailscards([
        {
          show: true,
          name: "Text Messages Pulses",
          value: sumColumn(billingDashBoardList[0], "total_tagged_pulses")
            ? numberWithCommas(sumColumn(billingDashBoardList[0], "total_tagged_pulses"))
            : "0.00",
        },
      ]);
    }
  }, [billingDashBoardList]);
  return (
    <div>
      <Calculationdetails
        activeKey={activeKey}
        currentcarddetails={currentcarddetails}
        showcal={false}
        total={false}
        name={"Text Messages Details"}
        detailscards={detailscards}
      />
      <div className="mt-4"></div>
      <Tabledata columns={columns} tabledata={tabledata} grandtotal={grandtotal} customStyle={customStyle} downloadpdfdata={downloadpdfdata} />

      <Calculationdetailsbootom
        name={"SMS Billing Total of Insurance Company"}
        currentcarddetails={currentcarddetails}
        tabonename={["Amount for SMS Sent", "X4 = U1 * 0.125"]}
        inboundpulse={totalICTxtMsgTotalAmount ? `Rs. ${numberWithCommas(parseFloat(totalICTxtMsgTotalAmount).toFixed(2))}` : 0}
        tabtwoname={["Taxes (GST)", "Y4 = X4 * 18%"]}
        taxes={totalICTxtMsgGSTAmount ? `Rs. ${numberWithCommas(parseFloat(totalICTxtMsgGSTAmount).toFixed(2))}` : 0}
        tabthree={["Total Bill for SMS Sent", "Z4 = X4 + Y4"]}
        total={totalICTxtMsgTotalBillableAmount ? `Rs. ${numberWithCommas(parseFloat(totalICTxtMsgTotalBillableAmount).toFixed(2))}` : 0}
      />
    </div>
  );
};

export default Textmessagecomponent;
