import React from "react";
import PageButton from "../../Ui/PageButton";
import HomeIcon from "../../Icons/PageIcon/HomeIcon";
import ProductIcon from "../../Icons/PageIcon/ProductIcon";
import CategoriesIcon from "../../Icons/PageIcon/CategoriesIcon";
import StatisticsIcon from "../../Icons/PageIcon/StatisticsIcon";
import StaffIcon from "../../Icons/PageIcon/StaffIcon";
import DocumentIcon from "../../Icons/PageIcon/DocumentIcon";
import CompanyIcon from "../../Icons/PageIcon/CompanyIcon";
import { Menu } from "antd";

declare interface SidebarCompanyProps {
  onClickedLink: (href) => void;
  currentPage: string;
}

const SidebarCompany = (props: SidebarCompanyProps) => {
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
        label={"Home"}
        onClick={props.onClickedLink}
        icon={
          <HomeIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/products"}
        label={"Product"}
        onClick={props.onClickedLink}
        icon={
          <ProductIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/categories"}
        label={"Categories"}
        onClick={props.onClickedLink}
        icon={
          <CategoriesIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/statistics"}
        label={"Statistics"}
        onClick={props.onClickedLink}
        icon={
          <StatisticsIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/staff"}
        label={"Staff"}
        onClick={props.onClickedLink}
        icon={
          <StaffIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/document"}
        label={"Documents"}
        onClick={props.onClickedLink}
        icon={
          <DocumentIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/company"}
        label={"Company"}
        onClick={props.onClickedLink}
        icon={
          <CompanyIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
    </Menu>
  );
};

export default SidebarCompany;
