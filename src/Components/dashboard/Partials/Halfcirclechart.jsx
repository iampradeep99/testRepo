import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { IoMdMore } from "react-icons/io";

Chart.register(ArcElement, Tooltip);

const Halfcirclechart = ({ data, total }) => {
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredlable, setHoverlabled] = useState(null);

  const readydata = {
    labels: data.map((card) => card.name),
    datasets: [
      {
        data: data.map((card) => parseFloat(card.value.replace(/,/g, ""))),
        backgroundColor: data.map((card) => card.color),
        borderColor: data.map((card) => card.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        backgroundColor: "rgba(0, 0, 0, 1)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const label = tooltipItem.label || "";
            return `${value}`;
          },
        },
      },
    },
    rotation: -90,
    circumference: 180,
    cutout: "85%",
    maintainAspectRatio: true,
    responsive: true,
    onHover: (event, chartElements) => {
      if (chartElements.length > 0) {
        const { index } = chartElements[0];
        const hoveredData = readydata.datasets[0].data[index];
        const hoveredLabel = readydata.labels[index];
        setHoveredValue(hoveredData);
        setHoverlabled(hoveredLabel);
      } else {
        setHoveredValue(null);
        setHoverlabled(null);
      }
    },
  };

  return (
    <div className="card card-custom graph-circle position-relative">
      <div className="d-flex align-items-center justify-content-between">
        <p>Total Billing</p>
        <IoMdMore />
      </div>
      <Doughnut data={readydata} options={options} />
      <div className="table-data">
        <p
          style={{
            fontSize: "12px",
          }}
        >
          {hoveredlable !== null ? `${hoveredlable}` : "Total"}{" "}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {hoveredValue !== null ? `Rs. ${hoveredValue}` : total}
        </p>
      </div>
      <ul className="item-data">
        {data.map((item, index) => (
          <li key={index} className="list-item" title={`${item.name}: ${item.value}`}>
            <div
              style={{
                background: item.color,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            ></div>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Halfcirclechart;
