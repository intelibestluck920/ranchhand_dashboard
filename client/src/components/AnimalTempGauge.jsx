import React from "react";

const AnimalTempGauge = (props) => {
  const colors = ["#FF0000", "#E0B400", "#73BF69", "#4040FF"];
  const getBgColor = (value) => {
    if (value >= 40.4) {
      return colors[0];
    } else if (value >= 39.6) {
      return colors[1];
    } else if (value >= 38.2) {
      return colors[2];
    }
    return colors[3];
  };

  const getHeight = (value, max, height) => {
    return height * (value / max);
  };
  return (
    <div className="d-flex align-items-center" style={{ height: props.height, flexDirection: "column-reverse" }}>
      <div
        style={{
          width: "100%",
          height: getHeight(props.value, props.max, props.height),
          borderRadius: "3px",
          transition: "height 1s eas 0s",
          backgroundColor: getBgColor(props.value) + "59",
          borderTop: `2px solid ${getBgColor(props.value)}`,
        }}
      ></div>
      <div style={{ textAlign: "center", color: getBgColor(props.value), marginBottom: "2px" }}>
        {props.value.toFixed(2)}
        <span style={{ fontSize: "16px" }}>°C</span>
      </div>
    </div>
  );
};

export default AnimalTempGauge;
