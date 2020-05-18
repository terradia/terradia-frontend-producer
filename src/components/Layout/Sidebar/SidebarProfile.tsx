import React from "react";
import { Menu } from "antd";
import PageButton from "../../Ui/PageButton";
import { LeftOutlined, UserOutlined } from "@ant-design/icons/lib";

declare interface SidebarProfileProps {
  onClickedLink: (href) => void;
  currentPage: string;
}

const SidebarProfile = (props: SidebarProfileProps) => {
  console.log("SidebarProfile Props", props);
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
        link={"/home"}
        label={"Retour"}
        onClick={props.onClickedLink}
        icon={<LeftOutlined />}
      />
      <PageButton
        link={"/profile/userProfile"}
        label={"Profil"}
        onClick={props.onClickedLink}
        icon={<UserOutlined />}
      />
    </Menu>
  );
};

export default SidebarProfile;
