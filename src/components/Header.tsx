import React from "react";
import avator from "../assets/images/Avatar.svg";

type HeaderProps = {
  email: string;
};

const Header: React.FC<HeaderProps> = ({ email }) => {
  return (
    <div className="header">
      <h2>タイトル</h2>
      <div className="userInfo">
        <div className="icon">
          <img src={avator} alt="Avatar" />
        </div>
        <div className="userEmail">
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
