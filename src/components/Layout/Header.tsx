import React from "react";
import { ReactComponent as TerradiaLogo } from "../../assets/Logo/Terradia.svg";
import Logout from "../Authentication/Logout/Logout";
import { Layout as AntLayout } from "antd";
import CompanySelector from "../CompanySelector/CompanySelector";
import "../../assets/Style/Header/user-informations.less";

const AntHeader = AntLayout.Header;

declare interface HeaderProps {
  Company?: boolean;
}

//TODO Faire un burger menu si la taille est trop petite

const Header = (props: HeaderProps) => {
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
      <AntHeader
        style={{
          height: "10vh",
          background: "white",
          padding: "0 2% 0 2%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "#CBCBCB",
          borderBottomStyle: "solid",
          borderBottomWidth: "thin",
          lineHeight: "normal",
          width: "99vw",
          maxWidth: "99vw",
        }}
        className={"header"}
      >
        <TerradiaLogo
          height={"5vh"}
          width={"25vh"}
          style={{
            marginLeft: "2%",
          }}
        />
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
