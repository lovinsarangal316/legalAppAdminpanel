import React, { useEffect, useState } from "react";
import { TbBrandBooking } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import CustomApexChart from "../components/Charts";
import "./css/dashboard.css";
import { GetApplicationCount, GetApplicationStatusChartData, GetDashboardCounterService, GetUsersCount, GetUsersStatusChartData } from "../services/globalServices";
import Loader from "../components/loaders/Loader";
import { allowedMonths } from "../helper";
import { pathData } from "../navigation/constants";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dashCount, setDashCount] = useState([
    {
      id: 1,
      label: "Applications",
      value: "0",
      percount: "+55%",
      icons: <TbBrandBooking size={20} />,
      iconcolorcode: "#7db56a",
      redirectUrl: pathData.applicationManagement,
    },

    {
      id: 2,
      label: "Users",
      value: "0",
      percount: "+3%",
      icons: <FaUsers size={20} />,
      iconcolorcode: "#7db56a",
      redirectUrl: pathData.userManagement,
    },
    // {
    //   id: 3,
    //   label: "Revenue",
    //   value: "34k",
    //   percount: "+1%",
    //   icons: <IoBarChartSharp size={20} />,
    //   iconcolorcode: "#7db56a",
    //   redirectUrl: "revenue",
    // },
  ]);
  const [chartStateColumn, setChartStateColumn] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: allowedMonths?.map((cur) => cur.label),
      },
      title: {
        text: "Users Status",
        align: "left",
        style: {
          fontSize: "20px",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      colors: ["#157e80"],
    },
    series: [
      {
        name: "Users",
        data: allowedMonths?.map((cur) => cur.data),
      },
    ],
  });

  const [chartDataRevenue, setChartDataRevenue] = useState({
    series: [
      {
        name: "Revenue",
        data: [
          4500, 5600, 6100, 7800, 9000, 11000, 12500, 14000, 15500, 17000,
          20000, 22000,
        ], // Monthly revenue data
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Months",
        },
      },
      yaxis: {
        title: {
          text: "Revenue (USD)",
        },
        labels: {
          formatter: (value) => `$${value.toLocaleString()}`,
        },
      },
      title: {
        text: "Revenue Growth",
        align: "left",
        style: {
          fontSize: "20px",
        },
      },
      tooltip: {
        y: {
          formatter: (value) => `$${value.toLocaleString()}`,
        },
      },
      colors: ["#157e80"],
    },
  });

  const [chartStatePie, setChartStatePie] = useState({
    options: {
      // labels: ["Pending", "Approved", "Rejected"],
      // colors: ["#43b1ab", "#76b56a", "#dd4d3e"], // Set unique colors for each label
      labels: ["Queued", "Processed", "Permanently Referred"],
      colors: ["#43b1ab", "#7da8b0", "#76b56a"], // Set unique colors for each label (Remove on 21-03-2025)
      chart: {
        type: "pie",
      },
      title: {
        text: "Application Status", // Add title
        align: "center", // Align the title
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    series: [0, 0, 0],
  });

  // //  get dashboard counter
  const getDashboardCounterData = async () => {
    // GetDashboardCounterService(
    //   setDashCount,
    //   setChartStatePie,
    //   setChartStateColumn,
    //   setLoading
    // );
    GetApplicationCount(setDashCount, setLoading)
    GetUsersCount(setDashCount, setLoading)
    GetApplicationStatusChartData(setChartStatePie, setLoading)
    GetUsersStatusChartData(setChartStateColumn, setLoading)
  };
  useEffect(() => {
    getDashboardCounterData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="dashboardWrapper pt-3">
      <div className="row pt-3">
        {dashCount?.map((curElm) => (
          <div
            key={curElm.id}
            className="col-md-6 cursor"
            onClick={() => {
              if (curElm.redirectUrl === "revenue") {
                const revenueSection = document.getElementById("revenue");
                if (revenueSection) {
                  revenueSection.scrollIntoView({ behavior: "smooth" });
                }
              } else if (curElm.redirectUrl) {
                navigate(curElm.redirectUrl);
              }
            }}
          >
            <div className="custom_card d-flex flex-row justify-content-between border-0 shadow card p-4">
              <div
                className="icon_box"
                style={{ backgroundColor: curElm.iconcolorcode }}
              >
                {curElm.icons}{" "}
              </div>
              <div className="text-end">
                <h5 className="text-uppercase">{curElm.label}</h5>
                <h6>
                  <b>{curElm.value}</b>
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chartData pt-5">
        <div className="row">
          <div className="col-md-6">
            <CustomApexChart chartstate={chartStateColumn} type="bar" />
          </div>
          <div className="col-md-6">
            <CustomApexChart chartstate={chartStatePie} type="donut" />
          </div>
          <div className="col-md-12 mt-4 d-none">
            <div id="revenue">
              <CustomApexChart chartstate={chartDataRevenue} type="line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
