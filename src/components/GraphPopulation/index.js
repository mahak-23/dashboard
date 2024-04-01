import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

//actions
import { fetchPopulationData } from "../../actions/app";

//icon
import Loader from "../../assets/loader.gif";

const GraphPopulation = ({ populationData, fetchPopulationData }) => {
  const { data, loader, error } = populationData;
  const [nations, setNations] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchPopulationData();
  }, []);

  useEffect(() => {
    if (data && data.length !== 0) {
      // Extract unique nations from the data
      const uniqueNations = [...new Set(data.map((item) => item.Nation))];
      setNations(uniqueNations);

      // Prepare series data for each nation
      const seriesData = uniqueNations.map((nation) => ({
        name: nation,
        type: "line",
        data: data
          .filter((item) => item.Nation === nation)
          .map((item) => [item.Year, item.Population]),
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "green",
            },
            {
              offset: 1,
              color: "#FFFFFF",
            },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: "rgb(175, 225, 175)",
            },
            {
              offset: 1,
              color: "#FFFFFF",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        showSymbol: false,
      }));

      setSeries(seriesData);
    }
  }, [data]);

  // Configure options for the chart
  const options = {
    color: ["green"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(0, 0, 0, 0.59)",
      borderWidth: 0,
    },
    grid: {
      containLabel: true,
      show: false,
    },
    legend: {
      data: nations,
      top: "bottom",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      name: "Year",
    },
    yAxis: {
      type: "value",
      name: "Population",
    },
    series: series,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {loader ? (
        <div className="loader-align">
          <img src={Loader} />
        </div>
      ) : error ? (
        <div className="loader-align error"> {error} </div>
      ) : data && data.length ? (
        <ReactECharts option={options} />
      ) : (
        <div>data not found </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  populationData: state.home.population,
});

export default connect(mapStateToProps, { fetchPopulationData })(
  GraphPopulation
);
