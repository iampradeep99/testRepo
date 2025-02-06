import React from "react";
import closeicon from "../../../../assets/img/sla/close.png";

import svgicon from "../../../../assets/img/sla/systemuptime.svg";
import Customcardsidebar from "../partials/Customcardsidebar";
import { Drawer } from "@mui/material";
const Sidebardrawer = ({ open, currentCard, handleclose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleclose} sx={{
      "& .MuiDrawer-paper": {
        width: 600,
        transition: "transform 0.3s ease-in-out",
        transform: open ? "translateX(0)" : "translateX(100%)"
      },
    }}>
      <div className="sla-dashboard">
        <div className="sidebar_drawer">
          <div className="sidebar_drawer_container">
            <div className="title_container">
              <p className="title">Agents Information</p>
              <img onClick={handleclose} src={closeicon} className="icon-close" alt="" />
            </div>
            <div className="sla-content-area pb-3">
              <Customcardsidebar color={currentCard.color} name={currentCard?.name} value={currentCard.value} list={currentCard.list} icon={currentCard.icon} />
            </div>
            <div className="title_container">
              <p className="title">Service Level Agreement</p>
            </div>
            <div className="agreement_data py-3">
              <table className="table">
                <thead>
                  <th>Target</th>
                  <th>Penalty Clause</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{">=97%"}</td>
                    <td>Nil</td>
                  </tr>
                  <tr>
                    <td>{">=95% but <97%"}</td>
                    <td>1.0% of the monthly billed amount</td>
                  </tr>
                  <tr>
                    <td>{">=92.5% but <95%"}</td>
                    <td>2.0% of the monthly billed amount</td>
                  </tr>
                  <tr>
                    <td>{">=90% but <92.5%"}</td>
                    <td>3.0% of the monthly billed amount</td>
                  </tr>
                  <tr>
                    <td>{">=87% but <90%"}</td>
                    <td>5.0% of the monthly billed amount</td>
                  </tr>
                  <tr>
                    <td>{"<87%"}</td>
                    <td>7.0% of the monthly billed amount</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="down-button-area">
              <button className="close-btn" onClick={handleclose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebardrawer;
