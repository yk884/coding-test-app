import React from "react";
import Filter from "./Filter";
import Button from "../button/Button";

type SideMenuProps = {
  showSideMenu: boolean;
  toggleSideMenu: () => void;
  params: any;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SideMenu: React.FC<SideMenuProps> = ({
  showSideMenu,
  toggleSideMenu,
  params,
  handleRadioChange,
}) => {
  return (
    <div className={`sideMenu ${showSideMenu ? "show" : "hide"}`}>
      <div className="filterContainer">
        <Button className="sideMenuButton" onClick={toggleSideMenu}>
          フィルタ
        </Button>
        <div className="filterTitle">フィルター</div>
        <Filter params={params} handleRadioChange={handleRadioChange} />
      </div>
    </div>
  );
};

export default SideMenu;
