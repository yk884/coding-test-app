import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Dashboard.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import Header from "./Header";
import SideMenu from "./SideMenu";
import ChartContainer from "./ChartContainer";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [showSideMenu, setShowSideMenu] = useState(true);

  // chart.js用のパラメータ初期設定
  const [params, setParams] = useState({
    prefecture_cd: 28, // 兵庫県のコード
    displayMethod: 0, // 表示方法 0:実数 1:就職率・進学率
    matter: 0, // 表示内容 0:地元進学 1:流出 2:流入 3:純流入
    classification: 1, // 表示分類 1:進学 2:就職
    displayType: 10, // 表示区分 10:すべての進学 11:大学進学 12:短期大学進学 20:就職
    gender: 0, // 性別 0:総数 1:男性 2:女性
  });

  // グラフの初期設定
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "graph",
        data: [],
        borderColor: "#2563EB",
        backgroundColor: "#2563EB",
        tension: 0,
        fill: false,
      },
    ],
  });

  // サイドメニューの表示/非表示切替
  const toggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  // APIからのデータフェッチ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opendata.resas-portal.go.jp/api/v1/employEducation/localjobAcademic/toTransition",
          {
            headers: {
              "X-API-KEY": apiKey,
            },
            params,
          }
        );
        const data = response.data.result.changes[0].data;
        const labels = data.map((item: { year: number }) => item.year);
        const values = data.map(
          (item: { value: number }) => item.value * 10000
        );

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "graph",
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
  }, [params]);

  // ラジオボタン操作時のアクション
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newParams = {
      ...params,
      [name]: parseInt(value, 10),
    };

    // 就職と進学を切り替えた際に自動で「表示区分」を初期値に再設定
    if (name === "classification") {
      if (value === "2") {
        // 就職が選ばれた場合
        newParams.displayType = 20; // 就職
      } else {
        newParams.displayType = 10; // すべての大学
      }
    }

    setParams(newParams);
  };

  return (
    <div className="dashboardWrapper">
      <Header email={email} />
      <div className="flexContainer">
        <SideMenu
          showSideMenu={showSideMenu}
          toggleSideMenu={toggleSideMenu}
          params={params}
          handleRadioChange={handleRadioChange}
        />
        <ChartContainer params={params} chartData={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
