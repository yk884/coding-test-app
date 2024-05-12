import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import avator from "../assets/images/Avatar.svg";
import "./Dashboard.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "就職者数",
        data: [],
        borderColor: "#2563EB",
        backgroundColor: "#2563EB",
        tension: 0,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opendata.resas-portal.go.jp/api/v1/employEducation/localjobAcademic/toTransition",
          {
            headers: {
              "X-API-KEY": apiKey,
            },
            params: {
              prefecture_cd: 28, // 兵庫県のコード
              displayMethod: 0, // 表示方法 0:実数 1:就職率・進学率
              matter: 0, // 表示内容 0:地元就職 1:流出 2:流入 3:純流入
              classification: 1, // 表示分類 1:進学 2:就職
              displayType: 10, // 表示区分 10:すべての進学 11:大学進学 12:短期大学進学 20:就職
              gender: 0, // 性別 0:総数 1:男性 2:女性
            },
          }
        );
        const data = response.data.result.changes[0].data;
        const labels = data.map((item: { year: number }) => item.year);
        const values = data.map((item: { value: number }) => item.value * 1000);

        console.log("Fetched data:", response.data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "就職者数",
              data: values,
              borderColor: "#2563EB",
              backgroundColor: "#2563EB",
              tension: 0,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: window.screen.width > 414,
          text: "人数",
        },
      },
      x: {
        title: {
          display: window.screen.width > 414,
          text: "年",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className="dashboardWrapper">
        <div className="header">
          <h2>タイトル</h2>
          <div className="userInfo">
            <div className="icon">
              <img src={avator} alt="" />
            </div>
            <div className="userEmail">
              <p>{email}</p>
            </div>
          </div>
        </div>
        <div className="chartContainer">
          <h3>兵庫県の就職者数の推移</h3>
          <div className="chartRenderArea">
            <Line data={chartData} options={options} />
          </div>
          <p className="caption">出典：RESAS（地域経済分析システム）</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
