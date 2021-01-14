import React from "react";
import { Menu } from "antd";
import PageButton from "../../Ui/PageButton";
import {
  LeftOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { useTranslation } from "react-i18next";

declare interface SidebarProfileProps {
  onClickedLink: (href) => void;
  currentPage: string;
  collapsed?: boolean;
}

const SidebarProfile = (props: SidebarProfileProps) => {
  const { t } = useTranslation("common");
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
        key={"/products"}
        link={"/products"}
        label={t("ProfilePage.sidebar.company")}
        onClick={props.onClickedLink}
        collapsed={props.collapsed}
        selected={false}
        icon={<LeftOutlined />}
      />
      <PageButton
        key={"/profile/userProfile"}
        link={"/profile/userProfile"}
        label={t("ProfilePage.sidebar.profile")}
        onClick={props.onClickedLink}
        collapsed={props.collapsed}
        selected={props.currentPage === "/profile/userProfile"}
        icon={<UserOutlined />}
      />
      <PageButton
        key={"/profile/company-invitations"}
        link={"/profile/company-invitations"}
        label={t("ProfilePage.sidebar.invitations")}
        onClick={props.onClickedLink}
        collapsed={props.collapsed}
        selected={props.currentPage === "/profile/company-invitations"}
        icon={<MailOutlined />}
      />
    </Menu>
  );
};

export default SidebarProfile;
