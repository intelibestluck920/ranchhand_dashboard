import React, { useEffect } from "react";
import * as echarts from "echarts";

const ScatterChart = (props) => {
  useEffect(() => {
    var dom = document.getElementById(props.id);
    var chart = echarts.init(dom, "dark");
    const colorList = ["#73BF69", "#F2CC0C", "#8AB8FF", "#FF780A", "#F2495C", "#5794F2", "#B877D9", "#705DA0", "#37872D", "#E5C8E3"];
    var seriesList = props.value.map((item, idx) => {
      return {
        type: "scatter",
        name: item.id.toString(),
        data: item.data,
        smooth: true,
        showSymbol: false,
        itemStyle: {
          color: colorList[idx],
        },
        emphasis: {
          itemStyle: {
            borderWidth: 8,
            borderColor: colorList[idx] + "86",
          },
        },
        symbolSize: 6,
      };
    });

    if (props.showThreshold) {
      let threshold;
      if (props.inverse) {
        threshold = props.max - props.threshold;
      } else {
        threshold = props.threshold;
      }
      const thresholdArray = new Array(props.date.length).fill(threshold);
      // const thresholdArray = [threshold, threshold];
      seriesList.push({
        type: "line",
        name: "TRS",
        yAxisIndex: 1,
        // xAxisIndex: 1,
        data: thresholdArray,
        showSymbol: false,
        itemStyle: {
          color: "#FF7383",
        },
        areaStyle: {
          color: "#FF73832A",
        },
        symbolSize: 0,
        emphasis: {
          areaStyle: {
            color: "#FF73832A",
          },
        },
      });
    }

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
        // formatter: function (params) {
        //   var tooltipContent = "";
        //   for (var i = 0; i < params.length; i++) {
        //     if (i === params.length - 1) {
        //       tooltipContent += params[i].marker + params[i].seriesName + ": " + props.threshold + "<br>";
        //     } else {
        //       tooltipContent += params[i].marker + params[i].seriesName + ": " + params[i].value + "<br>";
        //     }
        //   }
        //   return tooltipContent;
        // },
      },
      legend: {
        orient: "vertical",
        top: 13,
        right: 0,
        icon: "roundRect",
        itemWidth: 14,
        itemHeight: 4,
        itemGap: 11,
      },
      xAxis: {
        data: props.date,
        boundaryGap: false,
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
      yAxis: [
        {
          min: props.min,
          max: props.max,
          axisLabel: {
            formatter: "{value} " + props.yLabel,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitNumber: 6,
          splitLine: {
            lineStyle: {
              color: "#dddddd1a",
            },
          },
        },
        {
          max: props.max,
          min: props.min,
          inverse: props.inverse,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      grid: {
        top: "4%",
        bottom: "7%",
        left: "4.5%",
        right: "6%",
      },
      series: seriesList,
    };
    option && chart.setOption(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return <div className="d-flex justify-content-center align-items-center" id={props.id} style={{ width: props.width, height: props.height }}></div>;
};

export default ScatterChart;
