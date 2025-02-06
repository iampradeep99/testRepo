import React, { useState } from "react";
import Customcard from "../partials/Customcard";
import svgicon from "../../../../assets/img/sla/systemuptime.svg";
import setting from "../../../../assets/img/sla/settings.png";
import callicon from "../../../../assets/img/sla/call.png";
import callquality from "../../../../assets/img/sla/call-quality.png";
import agenticon from "../../../../assets/img/sla/agent-icon.png";
import seaticon from "../../../../assets/img/sla/seat.png";
import Sidebardrawer from "./Sidebardrawer";

const Maincard = () => {
  const [open, setOpen] = useState(false);
  const [currentCard, setCurentcard] = useState({});
  const handleopen = (data) => {
    setOpen(true);
    setCurentcard(data);
  };
  const handleclose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="row align-items-stretch py-4">
        <div className="col-md-4">
          <Customcard
            color={"#378c77"}
            name={"System Uptime"}
            value={"100.00%"}
            list={["No. of calls Audited (A): 2010", "No. of Agents (B): 712", "Total Score of all Agents (C):173710"]}
            icon={svgicon}
            handleopen={handleopen}
          />
        </div>
        <div className="col-md-4">
          <Customcard
            color={"#CD6A65"}
            name={"ASA > 30 Seconds"}
            value={"81.04%"}
            list={["Total Call Answered (A): 2162185", "Call Answered within 30 seconds (B): 1752268"]}
            icon={setting}
            handleopen={handleopen}
          />
        </div>
        <div className="col-md-4">
          <Customcard
            color={"#D38135"}
            name={"AHT >= 300 Seconds"}
            value={"15.24%"}
            list={["Total Call Answered (A) : 2162185", "Call having AHT of 300 seconds (B) : 329430"]}
            icon={callicon}
            handleopen={handleopen}
          />
        </div>
        <div className="col-md-4">
          <Customcard
            color={"#D46FA9"}
            name={"Call Quality Score"}
            value={"86.42%"}
            list={["No. of calls Audited (A): 2010", "No. of Agents (B): 712", "Total Score of all Agents (C):173710"]}
            icon={callquality}
            handleopen={handleopen}
          />
        </div>
        <div className="col-md-4">
          <Customcard
            color={"#5A79D6"}
            name={"Agents Training"}
            value={"57 Hrs"}
            list={["No. of Agents completed 6/12 months (A):200", "Total hours of Training:11457"]}
            icon={agenticon}
            handleopen={handleopen}
          />
        </div>

        <div className="col-md-4">
          <Customcard
            color={"#8C68C8"}
            name={"Seat Utilization"}
            value={"100.00%"}
            list={["Total Inbound Calls: 3168503", "Total Outbound Calls: 77509 ", "Total Landed Calls: 3246012", "Active Agents : 616"]}
            icon={seaticon}
            handleopen={handleopen}
          />
        </div>
      </div>
      {open && <Sidebardrawer open={open} currentCard={currentCard} handleclose={handleclose} />}
    </>
  );
};

export default Maincard;
