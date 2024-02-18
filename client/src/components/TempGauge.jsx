import React, { useEffect } from "react";
import * as echarts from "echarts";

const TempGauge = (props) => {
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
          center: ["50%", "75%"],
          radius: "131.5%",
          startAngle: 200,
          endAngle: -20,
          min: 27,
          max: 45,
          itemStyle: {
            color: [
              [0.11, "#F2495C"],
              [0.7444, "#73BF69"],
              [0.8, "#E0B400"],
              [1, "#FA6400"],
            ],
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
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
          center: ["50%", "75%"],
          radius: "140%",
          startAngle: 200,
          endAngle: -20,
          min: 27,
          max: 45,
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [0.11, "#F2495C"],
                [0.7444, "#73BF69"],
                [0.8, "#E0B400"],
                [1, "#FA6400"],
              ],
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
          axisLabel: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, "10%"],
            fontSize: 26,
            fontWeight: "500",
            formatter: "{value} °C",
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

export default TempGauge;
