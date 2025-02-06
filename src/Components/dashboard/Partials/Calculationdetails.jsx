import React from "react";
import Contentcardcenter from "./Contentcardcenter";
import { FaPlus } from "react-icons/fa6";
import { TbEqual } from "react-icons/tb";
import { FaFileExcel } from "react-icons/fa";

const Calculationdetails = ({ activeKey, currentcarddetails, name, showcal, detailscards, total }) => {
  const totalval = new Intl.NumberFormat("en-IN").format(
    detailscards
      .filter((card) => card.show)
      .map((card) => parseFloat(card.value.replace(/,/g, "")) || 0)
      .reduce((sum, val) => sum + val, 0),
  );
  return (
    <div className="py-3 calculationdetails">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start custom-gap">
          <p className="title">{name}</p>
          <div className="green-line"></div>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-md-12">
          <div className="calculation-area">
            {detailscards.map((card, index) =>
              card.show ? (
                <React.Fragment key={index}>
                  <Contentcardcenter name={card.name} value={card.value} icon={currentcarddetails?.icon} color={currentcarddetails?.color} show={true} />
                  {index < detailscards.length - 1 && showcal && (
                    <div className="icon" style={{ background: "#D57616" }}>
                      <FaPlus />
                    </div>
                  )}
                </React.Fragment>
              ) : null,
            )}

            {showcal && (
              <div className="icon" style={{ background: "#D57616" }}>
                <TbEqual />
              </div>
            )}
            {total && <Contentcardcenter name="Total" value={totalval} icon={currentcarddetails?.icon} color={currentcarddetails?.color} show={false} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculationdetails;
