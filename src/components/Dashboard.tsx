import React from "react";
import { useLocation } from "react-router-dom";
import avator from "../assets/images/Avatar.svg";
import "./Dashboard.scss";

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state;
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
          <div>ここにチャートが表示されます。</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
