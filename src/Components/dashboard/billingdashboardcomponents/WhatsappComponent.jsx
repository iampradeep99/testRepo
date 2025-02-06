import React, { useEffect, useState } from "react";
import Calculationdetails from "../Partials/Calculationdetails";
import Tabledata from "../Partials/Tabledata";
import Calculationdetailsbootom from "../Partials/Calculationdetailsbootom";

const WhatsappComponent = ({
  activeKey,
  currentcarddetails,
  numberWithCommas,
  billingDashBoardList,
  totalICWhatsappGSTAmount,
  totalICWhatsappTotalBillableAmount,
  tempmessagelist,
  downloadpdfdata,
  sumColumn,
}) => {
  const [onlygst, setOnlygst] = useState(0);
  const [detailscards, setDetailscards] = useState([]);
  const columns = ["Sr. No", "Insurance Company", "% Share of IBTC Pulses (B1)", "Marketing Conv.", "Service Conv.", "Conversation Utility Conv."];

  const tabledata =
    billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0]
      ? billingDashBoardList[0]?.ic_data.map((item, index) => ({
          index: index + 1,
          id: item["_id"],
          tagedPulses:
            tempmessagelist[0].length > 0 && tempmessagelist[0][index]?.perentage_pulses !== undefined
              ? `${numberWithCommas(parseFloat(tempmessagelist[0][index]?.perentage_pulses).toFixed(2))}%`
              : "0%",
          percentagePulse: item.mkt_conv_qty ? numberWithCommas(parseFloat(item.mkt_conv_qty).toFixed(2)) : "0.00",
          untagedPulses: item.srv_conv_qty ? numberWithCommas(parseFloat(item.srv_conv_qty).toFixed(2)) : "0.00",
          totalBillingPulses: item.util_conv_qty ? numberWithCommas(parseFloat(item.util_conv_qty).toFixed(2)) : "0.00",
        }))
      : [];

  const sumData =
    billingDashBoardList && billingDashBoardList.length > 0 && billingDashBoardList[0]
      ? billingDashBoardList[0]?.ic_data.reduce(
          (sums, item) => {
            sums.tagedPulses += item.perentage_pulses ? parseFloat(item.perentage_pulses) : 0;
            sums.percentagePulse += item.mkt_conv_qty ? parseFloat(item.mkt_conv_qty) : 0;
            sums.untagedPulses += item.srv_conv_qty ? parseFloat(item.srv_conv_qty) : 0;
            sums.totalBillingPulses += item.util_conv_qty ? parseFloat(item.util_conv_qty) : 0;
            return sums;
          },
          {
            tagedPulses: 0,
            percentagePulse: 0,
            untagedPulses: 0,
            totalBillingPulses: 0,
          },
        )
      : {
          tagedPulses: 0,
          percentagePulse: 0,
          untagedPulses: 0,
          totalBillingPulses: 0,
        };
  const grandTotalTextMsgPercntShare =
    tempmessagelist?.[0]?.length > 0
      ? tempmessagelist[0].reduce((sum, item) => sum + (item?.perentage_pulses !== undefined ? parseFloat(item.perentage_pulses) : 0), 0)
      : 0;
  const grandtotal = [
    grandTotalTextMsgPercntShare ? `${numberWithCommas(parseFloat(grandTotalTextMsgPercntShare).toFixed(2))}%` : "0%",
    numberWithCommas(sumData.percentagePulse.toFixed(2)),
    numberWithCommas(sumData.untagedPulses.toFixed(2)),
    numberWithCommas(sumData.totalBillingPulses.toFixed(2)),
  ];

  useEffect(() => {
    if (totalICWhatsappTotalBillableAmount && totalICWhatsappGSTAmount) {
      let onlygstdata = parseFloat(totalICWhatsappGSTAmount - totalICWhatsappTotalBillableAmount);
      setOnlygst(onlygstdata);
    }
  }, [totalICWhatsappTotalBillableAmount, totalICWhatsappGSTAmount]);
  let customStyle = [
    { textAlign: "left", textWrap: "nowrap" },
    { textAlign: "left" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
    { textAlign: "center" },
  ];

  useEffect(() => {
    if (billingDashBoardList && billingDashBoardList?.[0]?.ic_data.length > 0) {
    
      setDetailscards([
        {
          show: true,
          name: "Total Whastapp Marketing Conv. Qty.",
          value: billingDashBoardList?.[0]?.t_mkt_qty ? numberWithCommas(billingDashBoardList?.[0]?.t_mkt_qty) : "0.00",
        },
        {
          show: true,
          name: "Total Whastapp Service Conv. Qty.",
          value: billingDashBoardList?.[0]?.t_srv_qty ? numberWithCommas(billingDashBoardList?.[0]?.t_srv_qty) : "0.00",
        },
        {
          show: true,
          name: "Total Conversation Utility Conv. Qty.",
          value: billingDashBoardList?.[0]?.t_util_qty ? numberWithCommas(billingDashBoardList?.[0]?.t_util_qty) : "0.00",
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
        name={"Whatsapp Details"}
        detailscards={detailscards}
      />
      <div className="mt-4"></div>
      <Tabledata columns={columns} tabledata={tabledata} grandtotal={grandtotal} customStyle={customStyle} downloadpdfdata={downloadpdfdata} />

      <Calculationdetailsbootom
        name={"Whatsapp Billing Total of Insurance Company"}
        currentcarddetails={currentcarddetails}
        tabonename={["Amount for WhatsApp message"]}
        inboundpulse={totalICWhatsappTotalBillableAmount ? `Rs. ${numberWithCommas(parseFloat(totalICWhatsappTotalBillableAmount).toFixed(2))}` : 0}
        tabtwoname={["Taxes (GST 18%)"]}
        taxes={onlygst ? `Rs. ${numberWithCommas(parseFloat(onlygst).toFixed(2))}` : 0}
        tabthree={["Total Bill for WhatsApp message"]}
        total={totalICWhatsappGSTAmount ? `Rs. ${numberWithCommas(parseFloat(totalICWhatsappGSTAmount).toFixed(2))}` : 0}
      />
    </div>
  );
};

export default WhatsappComponent;
