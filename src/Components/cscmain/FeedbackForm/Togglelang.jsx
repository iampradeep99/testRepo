import React, { useState } from "react";
import "../FeedbackForm/ToggleLang.css";

const ToggleLang = () => {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
    <div className="containerr">

    <div className="toggle-containerr" onClick={handleToggle}>
      <span className={isToggled ? "activee" : ""}>English</span>
      <span className={isToggled ? "" : "activee"}>Hindi</span>
    </div>
    </div>
    </>
  );
};

export default ToggleLang;
