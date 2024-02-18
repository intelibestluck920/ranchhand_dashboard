import React, { useEffect } from "react";
import * as echarts from "echarts";

const HeatStressGauge = (props) => {
  useEffect(() => {
    var dom = document.getElementById(props.id);
    var chart = echarts.init(dom, "dark");
    var option = {
      backgroundColor: "transparent",
      textStyle: {
        fontFamily: "Inter, Helvetica Neue",
      },
      series: [
        {
          type: "gauge",
          center: ["50%", "68%"],
          radius: "112%",
          startAngle: 200,
          endAngle: -20,
          min: 30,
          max: 100,
          itemStyle: {
            color: [
              [0.6, "#5794F2"],
              [0.8571, "#FF9830"],
              [1, "#F2495C"],
            ],
          },
          progress: {
            show: true,
            width: 20,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 20,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: props.value,
            },
          ],
        },
        {
          type: "gauge",
          center: ["50%", "68%"],
          radius: "120%",
          startAngle: 200,
          endAngle: -20,
          min: 30,
          max: 100,
          splitNumber: 70,
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [0.6, "#5794F2"],
                [0.857143, "#FF9830"],
                [1, "#F2495C"],
              ],
            },
          },
          axisLabel: {
            show: true,
            color: "#CCCCDC",
            fontSize: 14,
            distance: -30,
            rotate: "tangential",
            formatter: function (value) {
              if (value === 30) {
                return "30";
              } else if (value === 72) {
                return "72";
              } else if (value === 90) {
                return "90";
              } else if (value === 100) {
                return "100";
              }
              return "";
            },
          },
          progress: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, "10%"],
            fontSize: 30,
            fontWeight: "500",
            formatter: function (value) {
              if (value >= 30 && value <= 72) {
                return "No Risk";
              } else if (value > 72 && value <= 90) {
                return "Risk";
              } else if (value > 90) {
                return "High Risk";
              }
              return value;
            },
            color: "inherit",
          },
          data: [
            {
              value: props.value,
            },
          ],
        },
      ],
    };
    option && chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return <div className="d-flex justify-content-center align-items-center" id={props.id} style={{ width: props.width, height: props.height }}></div>;
};

export default HeatStressGauge;
