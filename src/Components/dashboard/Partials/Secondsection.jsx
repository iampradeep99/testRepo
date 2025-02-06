import React, { useEffect, useState } from "react";
import Halfcirclechart from "./Halfcirclechart";
import Contentcard from "./Contentcard";

const Secondsection = ({ cards, currentmenu, handlechange, total, inbaundcall, agents, agentovertime, textmessage, outboundcall, whatsapp }) => {
  const [customdata, setcustomdata] = useState([]);
  useEffect(() => {
    if (cards.length > 0) {
      const updatedCards = cards.map((card) => {
        const valueMap = {
          INBNDCL: inbaundcall,
          AGNT: agents,
          AGNTOVRTM: agentovertime,
          TXTMSG: textmessage,
          OTBNDCL: outboundcall,
          WHAPP: whatsapp,
        };
        const tempvalue = valueMap[card.key] || card.value;
        return {
          ...card,
          value: tempvalue,
        };
      });
      setcustomdata(updatedCards);
    }
  }, [cards, inbaundcall, agents, agentovertime, textmessage, outboundcall]);

  return (
    <div className="billing-chart-container">
      <div className="row">
        <div className="col-lg-9">
          <div className="right-card-container">
            {customdata.map((card, index) => {
              return (
                <Contentcard
                  key={index}
                  keyvalue={card.key}
                  name={card.name}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                  currentmenu={currentmenu}
                  handlechange={handlechange}
                />
              );
            })}
          </div>
        </div>
        <div className="col-lg-3 ">
          <Halfcirclechart data={customdata} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Secondsection;
