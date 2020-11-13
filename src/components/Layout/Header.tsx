import React from "react";
import { ReactComponent as TerradiaLogo } from "../../assets/Logo/Terradia.svg";
import Logout from "../Authentication/Logout/Logout";
import { Layout as AntLayout } from "antd";
import HeaderMenu from "./HeaderMenu";
import "../../assets/Style/Layout/header.less";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons/lib";

const AntHeader = AntLayout.Header;

declare interface HeaderProps {
  Company?: boolean;
  onClickOnBurger?: () => void;
  collapsed?: boolean;
  isMobile?: boolean;
}

//TODO Faire un burger menu si la taille est trop petite

const Header = ({
  onClickOnBurger,
  collapsed = false,
  isMobile = false,
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
    displayedInfo = <HeaderMenu />;
  }

  return (
    <>
      <AntHeader className={"main-header"}>
        {isMobile !== true ? (
          <>
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
          </>
        ) : (
          <>
            <div className={"mobile-header-element first"}>
              {React.createElement(collapsed ? MenuOutlined : CloseOutlined, {
                className: "trigger",
                onClick: onClickOnBurger,
                style: { fontSize: "1.5em" },
              })}
            </div>
            <div className={"mobile-header-element second logo-container"}>
              <TerradiaLogo height={"50px"} width={"100px"} />
            </div>
            <div className={"mobile-header-element third"}>
              <HeaderMenu isMobile={true} />
            </div>
          </>
        )}
      </AntHeader>
    </>
  );
};

export default Header;
