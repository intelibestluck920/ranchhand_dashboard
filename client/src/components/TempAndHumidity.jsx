import React, { useEffect } from "react";
import * as echarts from "echarts";

const TempAndHumidity = (props) => {
  useEffect(() => {
    var dom = document.getElementById(props.id);
    var chart = echarts.init(dom, "dark");
    const dateList = props.value.map((item) => {
      return item[0];
    });
    const tempList = props.value.map((item) => {
      return item[1];
    });
    const humidityList = props.value.map((item) => {
      return item[2];
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
      legend: {
        bottom: -3,
        left: 15,
        icon: "roundRect",
        itemWidth: 15,
        itemHeight: 4,
        itemGap: 20,
      },
      xAxis: {
        data: dateList,
        axisLabel: {
          show: true,
          interval: 48,
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
          interval: 48,
        },
      },
      yAxis: [
        {
          min: Math.min(...tempList) - 3.2,
          axisLabel: {
            formatter: "{value} °C",
          },
          splitNumber: 5,
          splitLine: {
            lineStyle: {
              color: "#dddddd1a",
            },
          },
        },
        {
          min: Math.min(...humidityList) - 3.8,
          axisLabel: {
            formatter: "{value} %H",
          },
          splitLine: {
            lineStyle: {
              color: "#dddddd1a",
            },
          },
        },
      ],
      grid: {
        top: "4%",
        bottom: "15%",
        left: "4.5%",
        right: "5.6%",
      },
      series: [
        {
          type: "line",
          name: "Temperature",
          showSymbol: false,
          smooth: true,
          data: tempList,
          lineStyle: {
            width: 1,
          },
          itemStyle: {
            color: "#73BF69",
            borderWidth: 6,
            borderColor: "#73BF6956",
          },
        },
        {
          type: "line",
          name: "Humidity",
          yAxisIndex: 1,
          showSymbol: false,
          smooth: true,
          data: humidityList,
          lineStyle: {
            width: 1,
          },
          itemStyle: {
            color: "#F2CC0C",
            borderWidth: 6,
            borderColor: "#F2CC0C56",
          },
        },
      ],
    };
    option && chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return <div className="d-flex justify-content-center align-items-center" id={props.id} style={{ width: props.width, height: props.height }}></div>;
};

export default TempAndHumidity;
