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
import Header from "./Header";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [showSideMenu, setShowSideMenu] = useState(true);

  // サイドメニューの表示/非表示切替
  const toggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

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

        // console.log("Fetched data:", response.data);

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

  // パラメータごとの対応するテキストをマッピング（タイトル部分で使用）
  type LabelMap = Record<string, string>;
  const labelsMap: Record<string, LabelMap> = {
    classification: {
      "1": "進学",
      "2": "就職",
    },
    matter: {
      "0": "地元",
      "1": "流出",
      "2": "流入",
      "3": "純流入",
    },
    displayType: {
      "10": "すべての大学",
      "11": "大学進学",
      "12": "短期大学進学",
      "20": "就職",
    },
    gender: {
      "0": "総数",
      "1": "男性",
      "2": "女性",
    },
  };

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
        // 進学が選ばれた場合
        newParams.displayType = 10; // すべての大学
      }
    }

    setParams(newParams);
  };

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
        <Header email={email} />
        <div className="flexContainer">
          {/* side menu */}
          <div className={`sideMenu ${showSideMenu ? "show" : "hide"}`}>
            <div className="filterContainer">
              <button className="sideMenuButton" onClick={toggleSideMenu}>
                フィルタ
              </button>
              <div className="filterTitle">フィルター</div>
              <div className="filter">
                <div className="filterContent classification">
                  <h4>表示分類</h4>
                  <input
                    type="radio"
                    name="classification"
                    value="1"
                    onChange={handleRadioChange}
                    required
                    checked={params.classification === 1}
                  />
                  進学
                  <br />
                  <input
                    type="radio"
                    name="classification"
                    value="2"
                    onChange={handleRadioChange}
                  />
                  就職
                </div>
                <div className="filterContent matter">
                  <h4>表示内容</h4>
                  <input
                    type="radio"
                    name="matter"
                    value="0"
                    onChange={handleRadioChange}
                    checked={params.matter === 0}
                  />
                  地元{params.classification === 1 ? <>進学</> : <>就職</>}
                  <br />
                  <input
                    type="radio"
                    name="matter"
                    value="1"
                    onChange={handleRadioChange}
                  />
                  流出
                  <br />
                  <input
                    type="radio"
                    name="matter"
                    value="2"
                    onChange={handleRadioChange}
                  />
                  流入
                  <br />
                  <input
                    type="radio"
                    name="matter"
                    value="3"
                    onChange={handleRadioChange}
                  />
                  純流入
                </div>
                <div className="filterContent displayType">
                  <h4>表示区分</h4>
                  {params.classification === 1 && (
                    <>
                      <input
                        type="radio"
                        name="displayType"
                        value="10"
                        onChange={handleRadioChange}
                        checked={params.displayType === 10}
                      />
                      すべての大学
                      <br />
                      <input
                        type="radio"
                        name="displayType"
                        value="11"
                        onChange={handleRadioChange}
                      />
                      大学進学
                      <br />
                      <input
                        type="radio"
                        name="displayType"
                        value="12"
                        onChange={handleRadioChange}
                      />
                      短期大学進学
                      <br />
                    </>
                  )}
                  {params.classification === 2 && (
                    <>
                      <input
                        type="radio"
                        name="displayType"
                        value="20"
                        onChange={handleRadioChange}
                        checked={params.displayType === 20}
                      />
                      就職
                    </>
                  )}
                </div>
                <div className="filterContent gender">
                  <h4>性別</h4>
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    required
                    onChange={handleRadioChange}
                    checked={params.gender === 0}
                  />
                  総数
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    onChange={handleRadioChange}
                  />
                  男性
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="2"
                    onChange={handleRadioChange}
                  />
                  女性
                </div>
              </div>
            </div>
          </div>
          {/* chart container */}
          <div className="chartContainer">
            <h3>
              兵庫県の{labelsMap.classification[params.classification]}
              者数の推移（{labelsMap.matter[params.matter]}-
              {labelsMap.displayType[params.displayType]}-
              {labelsMap.gender[params.gender]}）
            </h3>
            <div className="chartRenderArea">
              <Line data={chartData} options={options} />
            </div>
            <p className="caption">出典：RESAS（地域経済分析システム）</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
