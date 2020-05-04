import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import HomeIcon from "../Icons/PageIcon/HomeIcon";
import ProductIcon from "../Icons/PageIcon/ProductIcon";
import CategoriesIcon from "../Icons/PageIcon/CategoriesIcon";
import StatisticsIcon from "../Icons/PageIcon/StatisticsIcon";
import StaffIcon from "../Icons/PageIcon/StaffIcon";
import DocumentIcon from "../Icons/PageIcon/DocumentIcon";
import CompanyIcon from "../Icons/PageIcon/CompanyIcon";
import { Menu } from "antd";
import PageButton from "../Ui/PageButton";

const Sidebar = () => {
  const currentUrl = useLocation().pathname;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(currentUrl);

  const OnClickedLink = (href: string) => {
    setCurrentPage(href);
    history.push(href);
  };

  return (
    <Menu
      defaultSelectedKeys={[currentPage]}
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
        onClick={OnClickedLink}
        icon={
          <HomeIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/products"}
        label={"Product"}
        onClick={OnClickedLink}
        icon={
          <ProductIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/categories"}
        label={"Categories"}
        onClick={OnClickedLink}
        icon={
          <CategoriesIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/statistics"}
        label={"Statistics"}
        onClick={OnClickedLink}
        icon={
          <StatisticsIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/staff"}
        label={"Staff"}
        onClick={OnClickedLink}
        icon={
          <StaffIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/document"}
        label={"Documents"}
        onClick={OnClickedLink}
        icon={
          <DocumentIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
      <PageButton
        link={"/company"}
        label={"Company"}
        onClick={OnClickedLink}
        icon={
          <CompanyIcon
            style={{ width: "32px", height: "32px", display: "flex" }}
          />
        }
      />
    </Menu>
  );
};

export default Sidebar;
