import React from "react";
import Chart from "react-apexcharts";

const CustomApexChart = ({ chartstate, type }) => {
  return (
    <Chart
      options={chartstate.options}
      series={chartstate.series}
      type={type}
      // width={"100%"}
      height={320}
    />
  );
};

export default CustomApexChart;
