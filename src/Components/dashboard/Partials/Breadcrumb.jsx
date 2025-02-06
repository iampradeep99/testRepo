import React, { useRef, useState, useEffect } from "react";
import billinginfo from "../billinginfo";
import moment from "moment";
import { getSessionStorage } from "Components/Common/Login/Auth/auth";

const Breadcrumb = ({ setCurrentdaterange, handlesubmit, insuranceCompanyoptions, currentdaterange }) => {
  const userData = getSessionStorage("user");
  const { yearlist, monthlist } = billinginfo();
  const [selecteddate, setSelecteddate] = useState({
    year: "",
    month: "",
    ic: "all",
  });
  const [alert, setAlert] = useState(false);
  const dateRef = useRef();

  // Set the current year as default
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelecteddate((prev) => ({
      ...prev,
      year: currentYear.toString(),
    }));
  }, []);

  const handleYearChange = (e) => {
    setSelecteddate((prev) => ({
      ...prev,
      year: e.target.value,
      month: "",
    }));
  };
  const handlecompanychange = (e) => {
    setSelecteddate((prev) => ({
      ...prev,
      ic: e.target.value,
    }));
  };
  const handleMonthChange = (e) => {
    setSelecteddate((prev) => ({
      ...prev,
      month: e.target.value,
    }));
  };

  const onsubmitdate = () => {
    if (!selecteddate?.month) {
      setAlert(true);
      dateRef.current?.focus();
      return;
    } else {
      convertToDateRange(selecteddate);
    }
    setAlert(false);
  };
  const convertToDateRange = ({ year, month }) => {
    const monthNumber = parseInt(month, 10);
    const from = moment(`${year}-${monthNumber}-01`, "YYYY-MM-DD").startOf("month").format("YYYY-MM-DD");
    const to = moment(`${year}-${monthNumber}-01`, "YYYY-MM-DD").endOf("month").format("YYYY-MM-DD");
    const tempdate = {
      from: from,
      to: to,
      ic: selecteddate.ic == "all" ? "" : selecteddate.ic,
    };
    setCurrentdaterange(tempdate);
  };
  const handleReset = () => {
    const currentYear = new Date().getFullYear();
    setSelecteddate({ year: currentYear.toString(), month: "", ic: "all" });
    setCurrentdaterange({
      from: "",
      to: "",
      ic: "all",
    });

    setAlert(false);
  };

  const isMonthDisabled = (monthValue) => {
    return parseInt(selecteddate.year, 10) === 2024 && parseInt(monthValue, 10) < 9;
  };
  useEffect(() => {
    if (currentdaterange?.to) {
      handlesubmit("SMDTLS");
    }
  }, [currentdaterange]);
  return (
    <div>
      <div className="breadcrumb">
        <div className="left_name">
          <p className="span-text">
            <span>Dashboards - </span>
            <span className="green-text">Billing</span>
          </p>
          {/* <p className="dashboard-name">Billing Dashboard</p> */}
        </div>
        <div className="right_content">
          <div className="date-time-main">
            <div className="daterange-container">
              {userData?.UserCompanyType == "CSC" && (
                <select className="form-select" value={selecteddate.ic} onChange={handlecompanychange}>
                  <option value={"all"}>ALL</option>
                  {insuranceCompanyoptions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}

              <select className="form-select" value={selecteddate.year} onChange={handleYearChange}>
                {yearlist.map((item, index) => (
                  <option key={index} value={item.toString()}>
                    {item}
                  </option>
                ))}
              </select>
              <select ref={dateRef} className="form-select" value={selecteddate.month} onChange={handleMonthChange}>
                <option value="">Select Month</option>
                {monthlist.map((item, index) => (
                  <option key={index} value={item.value} disabled={isMonthDisabled(item.value)}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary bg-green custom-btn-size" onClick={onsubmitdate}>
            Submit
          </button>
          <button className="btn btn-primary bg-orange custom-btn-size" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
