import React from "react";
import PageButton from "../../Ui/PageButton";
import { Divider, Menu } from "antd";
import {
  EyeOutlined,
  FileImageOutlined,
  HomeOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons/lib";

import Logout from "../../Authentication/Logout/Logout";

declare interface SidebarCompanyProps {
  onClickedLink: (href) => void;
  currentPage: string;
  collapsed?: boolean;
}

const SidebarCompany = (props: SidebarCompanyProps) => {
  return (
    <>
      <Menu
        defaultSelectedKeys={[props.currentPage]}
        mode={"inline"}
        inlineCollapsed={true}
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexGrow: 1,
          flexFlow: "column",
          justifyContent: "center",
          alignContent: "space-around",
        }}
      >
        <PageButton
          key={"/home"}
          link={"/home"}
          label={"Accueil"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/home"}
          icon={<HomeOutlined />}
        />
        <PageButton
          key={"/products"}
          link={"/products"}
          label={"Produits"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/products"}
          icon={<ShoppingCartOutlined />}
        />
        <PageButton
          key={"/statistics"}
          link={"/statistics"}
          label={"Statistiques"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/statistics"}
          icon={<PieChartOutlined />}
        />
        <PageButton
          key={"/staff"}
          link={"/staff"}
          label={"Employés"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/staff"}
          icon={<TeamOutlined />}
        />
        <PageButton
          key={"/files"}
          link={"/files"}
          label={"Galerie d'images"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/files"}
          icon={<FileImageOutlined />}
        />
        <PageButton
          key={"/company"}
          link={"/company"}
          label={"Entreprise"}
          onClick={props.onClickedLink}
          collapsed={props.collapsed}
          selected={props.currentPage === "/company"}
          icon={<EyeOutlined />}
        />
      </Menu>
      <Divider />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "column",
          justifyContent: "flex-start",
          alignContent: "space-around",
          alignItems: "center",
          padding: "1.5em",
        }}
      >
        <Logout key={"logout"} collapsed={props.collapsed} />
      </div>
    </>
  );
};

export default SidebarCompany;
