import React, { useEffect } from "react";
import * as echarts from "echarts";

const HeatStressHistory = (props) => {
  useEffect(() => {
    var dom = document.getElementById(props.id);
    var chart = echarts.init(dom, "dark");
    const dateList = props.value.map((item) => {
      return item[0];
    });
    const valueList = props.value.map((item) => {
      return item[1];
    });
    var option = {
      backgroundColor: "transparent",
      textStyle: {
        fontFamily: "Inter, Helvetica Neue",
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#22252B",
        borderWidth: 0,
        textStyle: {
          color: "#CCCCDC",
          fontSize: 13,
          fontWeight: 400,
        },
        axisPointer: {
          type: "cross",
          label: {
            show: false,
          },
        },
      },
      visualMap: {
        show: false,
        pieces: [
          {
            gt: 30,
            lte: 72,
            color: "#5794F2",
          },
          {
            gt: 72,
            lte: 90,
            color: "#FF9830",
          },
          {
            gt: 90,
            color: "#F2495C",
          },
        ],
        outOfRange: {
          color: "#73BF69",
        },
      },
      xAxis: {
        data: dateList,
        axisLabel: {
          show: true,
          interval: props.xAxisInterval,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "solid",
            color: "#dddddd1a",
          },
          interval: props.xAxisInterval,
        },
      },
      yAxis: {
        min: Math.min(...valueList) - 4.1,
        splitNumber: 3,
        splitLine: {
          lineStyle: {
            color: "#dddddd1a",
          },
        },
      },
      grid: {
        top: "4%",
        bottom: "14%",
        left: "4%",
        right: "1%",
      },
      series: {
        type: "line",
        name: "THI",
        showSymbol: false,
        smooth: true,
        data: valueList,
        lineStyle: {
          width: 1,
        },
        itemStyle: {
          color: "#5794F2",
          borderWidth: 6,
          borderColor: "#5794F256",
        },
        areaStyle: {
          color: "#5794F2",
          opacity: 0.1,
        },
      },
    };
    option && chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return <div className="d-flex justify-content-center align-items-center" id={props.id} style={{ width: props.width, height: props.height }}></div>;
};

export default HeatStressHistory;
