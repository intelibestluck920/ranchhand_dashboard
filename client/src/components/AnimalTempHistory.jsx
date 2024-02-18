import React, { useEffect } from "react";
import * as echarts from "echarts";

const AnimalTempHistory = (props) => {
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
            gt: /*29*/ 38.2,
            lte: /*40.4*/39.6,
            color: "#73BF69",
          },
          {
            gt: /*40.4*/39.6,
            lte: /*41.4*/40.4,
            color: "#E0B400",
          },
          {
            gt: /*41.4*/40.4,
            color: "#FA6400",
          },
        ],
        outOfRange: {
          // color: "#F2495C",
          color: "#FF0000",
        },
      },
      legend: {
        bottom: -3,
        left: 15,
        icon: "roundRect",
        itemWidth: 15,
        itemHeight: 4,
      },
      xAxis: {
        data: dateList,
        axisLabel: {
          show: true,
          interval: 24,
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
          interval: 24,
        },
      },
      yAxis: {
        min: Math.min(...valueList) - 0.2,
        axisLabel: {
          formatter: "{value} °C",
        },
        splitNumber: 3,
        splitLine: {
          lineStyle: {
            color: "#dddddd1a",
          },
        },
      },
      grid: {
        top: "4%",
        bottom: "20%",
        left: "3.5%",
        right: "0.5%",
      },
      series: {
        type: "line",
        name: "temperature",
        showSymbol: false,
        smooth: true,
        data: valueList,
        lineStyle: {
          width: 1,
        },
        itemStyle: {
          color: "#73BF69",
          borderWidth: 6,
          borderColor: "#73BF6956",
        },
        areaStyle: {
          color: "#73BF69",
          opacity: 0.1,
        },
      },
    };
    option && chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return <div className="d-flex justify-content-center align-items-center" id={props.id} style={{ width: props.width, height: props.height }}></div>;
};

export default AnimalTempHistory;
