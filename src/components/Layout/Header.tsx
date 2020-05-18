import React from "react";
import { ReactComponent as TerradiaLogo } from "../../assets/Logo/Terradia.svg";
import Logout from "../Authentication/Logout/Logout";
import { Layout as AntLayout } from "antd";
import CompanySelector from "../CompanySelector/CompanySelector";
import "../../assets/Style/Layout/header.less";
import "../../assets/Style/Header/user-informations.less";

const AntHeader = AntLayout.Header;

declare interface HeaderProps {
  Company?: boolean;
  onClickOnBurger?: () => void;
  collapsed?: boolean;
}

//TODO Faire un burger menu si la taille est trop petite

const Header = ({
  onClickOnBurger,
  collapsed = false,
  ...props
}: HeaderProps) => {
  let displayedInfo;

  if (props.Company) {
    // if in CompanySelection page (login)
    displayedInfo = (
      <div
        style={{
          order: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Logout />
      </div>
    );
  } else {
    // if not in CompanySelection
    displayedInfo = <CompanySelector />;
  }

  return (
    <>
      <AntHeader className={"main-header"}>
        <div className={"logo-container"}>
          <TerradiaLogo height={"40px"} width={"200px"} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {displayedInfo}
        </div>
      </AntHeader>
    </>
  );
};

export default Header;
