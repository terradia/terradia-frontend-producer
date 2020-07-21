import React from "react";
import { Menu } from "antd";
import PageButton from "../../Ui/PageButton";
import { LeftOutlined, UserOutlined } from "@ant-design/icons/lib";

declare interface SidebarProfileProps {
  onClickedLink: (href) => void;
  currentPage: string;
  collapsed?: boolean;
}

const SidebarProfile = (props: SidebarProfileProps) => {
  return (
    <Menu
      defaultSelectedKeys={[props.currentPage]}
      mode={"inline"}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexFlow: "column",
        justifyContent: "center",
        alignContent: "space-around",
      }}
    >
      <PageButton
        key={"/home"}
        link={"/home"}
        label={"Accueil"} // TODO : Translate this.
        onClick={props.onClickedLink}
        collapsed={props.collapsed}
        selected={false}
        icon={<LeftOutlined />}
      />
      <PageButton
        key={"/profile/userProfile"}
        link={"/profile/userProfile"}
        label={"Profil"} // TODO : Translate this.
        onClick={props.onClickedLink}
        collapsed={props.collapsed}
        selected={props.currentPage === "/profile/userProfile"}
        icon={<UserOutlined />}
      />
    </Menu>
  );
};

export default SidebarProfile;
