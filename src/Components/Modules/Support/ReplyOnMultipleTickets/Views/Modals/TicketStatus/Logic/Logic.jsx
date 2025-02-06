import { useEffect, useState } from "react";
import { AlertMessage } from "Framework/Components/Widgets/Notification/NotificationProvider";
import { getSessionStorage, getUserRightCodeAccess } from "Components/Common/Login/Auth/auth";
import { getMasterDataBinding, AddBulkSupportTicketReviewData } from "../../../../Services/Methods";

function TicketStatusLogic() {
  const [value, setValue] = useState("<p></p>");
  const [wordcount, setWordcount] = useState(0);

  const setAlertMessage = AlertMessage();
  const resolvedTicketRight = getUserRightCodeAccess("mdh9");

  const [formValuesReplyOnTickets, setFormValuesReplyOnTickets] = useState({
    txtTicketStatus: null,
  });

  const updateStateReplyOnTickets = (name, value) => {
    setFormValuesReplyOnTickets({ ...formValuesReplyOnTickets, [name]: value });
  };

  const [btnLoaderActive, setBtnLoaderActive] = useState(false);
  const handleSave = async (showfunc, filterValues, setFarmersTicketData, setSatatusCount, settotalSatatusCount) => {
    debugger;
    if (!handleValidationReplyWithExcel()) {
      return;
    }
    const pAttachment =
      formValuesReplyWithExcel.txtDocumentUpload && formValuesReplyWithExcel.txtDocumentUpload ? formValuesReplyWithExcel.txtDocumentUpload : "";
    if (pAttachment !== "") {
      const valExtension = pAttachment.name.substring(pAttachment.name.lastIndexOf(".")).toLowerCase().slice(1);
      switch (valExtension) {
        case "xlsx":
          break;
        default:
          setAlertMessage({
            type: "error",
            message: "Please select only xlsx extension file.",
          });
          return;
      }
      if (pAttachment.size > 1000000) {
        setAlertMessage({
          type: "error",
          message: "Please upload less than 1MB or 1MB file!",
        });
        return;
      }
    }
    if (excelFile !== null) {
      debugger;
      const workBook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workBook.SheetNames[0];
      const wokrSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(wokrSheet, {
        header: 0,
        defval: "",
      });
      if (data && data.length > 0) {
        const obj = data[0];
        if (!Object.keys(obj).includes("Ticket No")) {
          setAlertMessage({
            open: true,
            type: "warning",
            message: "Please do not change the Haeder cloumn Ticket No",
          });
          return;
        }
        if (!Object.keys(obj).includes("Type")) {
          setAlertMessage({
            open: true,
            type: "warning",
            message: "Please do not change the Haeder cloumn Type",
          });
          return;
        }
        if (!Object.keys(obj).includes("Ticket Status")) {
          setAlertMessage({
            open: true,
            type: "warning",
            message: "Please do not change the Haeder cloumn Ticket Status",
          });
          return;
        }
        if (!Object.keys(obj).includes("Comments")) {
          setAlertMessage({
            open: true,
            type: "warning",
            message: "Please do not change the Haeder cloumn Comments",
          });
          return;
        }
        const dataForUpload = [];
        let rtnval = true;
        data.forEach((val) => {
          dataForUpload.push({
            supportTicketNo: val["Ticket No"],
            ticketDescription: val.Comments,
            ticketStatusID:
              val["Ticket Status"] === "Open"
                ? 109301
                : val["Ticket Status"] === "In-Progress"
                  ? 109302
                  : val["Ticket Status"] === "Resolved"
                    ? 109303
                    : val["Ticket Status"] === "Re-Open"
                      ? 109304
                      : 0,
            ticketStatus: val["Ticket Status"],
            ticketHeaderID: val.Type === "Grievance" ? 1 : val.Type === "Information" ? 2 : val.Type === "Crop Loss Intimation" ? 4 : 0,
            ticketHeader: val.Type,
          });
        });
        const user = getSessionStorage("user");
        const ChkBRHeadTypeID = user && user.BRHeadTypeID ? user.BRHeadTypeID.toString() : "0";
        const ChkAppAccessTypeID = user && user.AppAccessTypeID ? user.AppAccessTypeID.toString() : "0";
        for (let i = 0; i < dataForUpload.length; i += 1) {
          if (!rtnval) {
            return;
          }
          if (
            dataForUpload[i].ticketHeader !== "Grievance" &&
            dataForUpload[i].ticketHeader !== "Information" &&
            dataForUpload[i].ticketHeader !== "Crop Loss Intimation"
          ) {
            setAlertMessage({
              open: true,
              type: "warning",
              message: `Please use these values(Grievance,Information,Crop Loss Intimation) for Haeder cloumn Type at row no.${i + 1}`,
            });
            rtnval = false;
            break;
          }
          if (
            dataForUpload[i].ticketStatus !== "Open" &&
            dataForUpload[i].ticketStatus !== "In-Progress" &&
            dataForUpload[i].ticketStatus !== "Re-Open" &&
            dataForUpload[i].ticketStatus !== "Resolved"
          ) {
            setAlertMessage({
              open: true,
              type: "warning",
              message: `Please use these values(Open,In-Progress,Re-Open,Resolved) for Haeder cloumn Ticket Status at row no.${i + 1}`,
            });
            rtnval = false;
            break;
          }
          if (dataForUpload[i].ticketStatusID === filterValues.txtStatus.CommonMasterValueID) {
            setAlertMessage({
              open: true,
              type: "warning",
              message: `Same status is not allowed to change the ticket status at row no.${i + 1}`,
            });
            rtnval = false;
            break;
          }
          if (dataForUpload[i].ticketStatusID === 109303) {
            if (resolvedTicketRight === false) {
              setAlertMessage({
                type: "warning",
                message: `You do not have right to resolve the ticket at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
          }
          if (ChkBRHeadTypeID === "124001" || ChkBRHeadTypeID === "124002") {
            if (dataForUpload[i].ticketStatusID === 109303) {
              setAlertMessage({
                type: "warning",
                message: `CSC user can not resolve the ticket at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
            if (dataForUpload[i].ticketStatusID === 109014) {
              setAlertMessage({
                type: "warning",
                message: `CSC user can not change the ticket status(In-Progress) at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
          }
          if (ChkBRHeadTypeID === "124003") {
            if (ChkAppAccessTypeID === "472") {
              if (dataForUpload[i].ticketStatusID === 109301) {
                setAlertMessage({
                  type: "warning",
                  message: `Insurance admin user can not Open the ticket at row no.${i + 1}`,
                });
                rtnval = false;
                break;
              }
              if (dataForUpload[i].ticketStatusID === 109304) {
                setAlertMessage({
                  type: "warning",
                  message: `Insurance admin user can not Re-Open the ticket at row no.${i + 1}`,
                });
                rtnval = false;
                break;
              }
            }
            if (ChkAppAccessTypeID === "503") {
              if (dataForUpload[i].ticketStatusID === 109301) {
                setAlertMessage({
                  type: "warning",
                  message: `Insurance user can not Open the ticket at row no.${i + 1}`,
                });
                rtnval = false;
                break;
              }
              if (dataForUpload[i].ticketStatusID === 109304) {
                setAlertMessage({
                  type: "warning",
                  message: `Insurance user can not Re-Open the ticket t row no.${i + 1}`,
                });
                rtnval = false;
                break;
              }
              if (dataForUpload[i].ticketStatusID === 109303) {
                setAlertMessage({
                  type: "warning",
                  message: `Insurance user can not resolve the ticket t row no.${i + 1}`,
                });
                rtnval = false;
                break;
              }
            }
          }
          if (filterValues.txtStatus.CommonMasterValueID === 109302) {
            if (dataForUpload[i].ticketStatusID === 109304) {
              setAlertMessage({
                type: "warning",
                message: `CSC user can not change the status(Re-Open) if status is In-Progress at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
          }
          if (filterValues.txtStatus.CommonMasterValueID === 109303) {
            if (dataForUpload[i].ticketStatusID === 109302 || dataForUpload[i].ticketStatusID === 109301) {
              setAlertMessage({
                type: "warning",
                message: `CSC user can not change the status(In-Progress or Open) or  if status is resolved at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
          }
          if (dataForUpload[i].ticketStatusID === 109304) {
            if (dataForUpload[i].ticketHeaderID === 2) {
              setAlertMessage({
                type: "warning",
                message: `CSC user can not Re-Open the ticket with ticket type(Information) at row no.${i + 1}`,
              });
              rtnval = false;
              break;
            }
          }
        }
        if (rtnval === true) {
          try {
            const formdata = {
              tickets: dataForUpload,
              agentUserID: user && user.LoginID ? user.LoginID : 0,
            };
            setBtnLoaderActive(true);
            const result = await getExcelBulkTicketsList(formdata);
            setBtnLoaderActive(false);
            if (result.responseCode === 1) {
              showfunc();
              setAlertMessage({
                type: "success",
                message: "Reply with excel file done successfuly,Please get the result excel file.",
              });
              const columnOrder = {
                TicketNo: "Ticket No",
                error: "Message",
              };
              const mappedData = result.responseData.map((value) => {
                return {
                  TicketNo: value.TicketNo,
                  error: value.error,
                };
              });
              const rearrangedData = rearrangeAndRenameColumns(mappedData, columnOrder);
              const workSheetColumnWidth = [{ width: 40 }, { width: 70 }];
              const UniqueDateTimeTick = getCurrentDateTimeTick();
              downloadExcel(rearrangedData, workSheetColumnWidth, `Reply_On_Multiple_Tickets_Result${UniqueDateTimeTick}`);
              setFarmersTicketData([]);
              setSatatusCount(0);
              settotalSatatusCount(0);
            } else {
              setAlertMessage({
                type: "error",
                message: result.responseMessage,
              });
            }
          } catch (error) {
            console.log(error);
            setAlertMessage({
              type: "error",
              message: error,
            });
          }
        }
      } else {
        setAlertMessage({
          type: "error",
          message: "Please , do not upload blank file!",
        });
      }
    }
  };
  const [ticketStatusList, setTicketStatusList] = useState([]);
  const [isLoadingTicketStatusList, setIsTicketStatusList] = useState(false);
  const getTicketStatusListData = async () => {
    debugger;
    try {
      setTicketStatusList([]);
      setIsTicketStatusList(true);
      const formdata = {
        filterID: 109,
        filterID1: 0,
        masterName: "COMMVAL",
        searchText: "#ALL",
        searchCriteria: "AW",
      };
      const result = await getMasterDataBinding(formdata);
      setIsTicketStatusList(false);
      if (result.response.responseCode === 1) {
        if (result.response.responseData && result.response.responseData.masterdatabinding && result.response.responseData.masterdatabinding.length > 0) {
          setTicketStatusList(result.response.responseData.masterdatabinding);
        } else {
          setTicketStatusList([]);
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
        message: "Something went Wrong! Error Code : 442",
      });
    }
  };
  useEffect(() => {
    console.log(value);
    getTicketStatusListData();
  }, [value]);

  return {
    value,
    setValue,
    handleSave,
    formValuesReplyOnTickets,
    updateStateReplyOnTickets,
    ticketStatusList,
    isLoadingTicketStatusList,
    getTicketStatusListData,
    wordcount,
    setWordcount,
    btnLoaderActive,
  };
}

export default TicketStatusLogic;
