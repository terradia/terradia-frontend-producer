import React from "react";
import { Tabs } from "antd";
import "../assets/Style/Files/index.less";
import ImagesTab from "../components/Files/ImagesTab";

const { TabPane } = Tabs;

const Files = () => {
  const companyId = localStorage.getItem("selectedCompany");

  return (
    <div className="card-container">
      <Tabs type={"card"} defaultActiveKey="1">
        <TabPane tab="Images" key="1">
          <ImagesTab companyId={companyId} />
        </TabPane>
        <TabPane tab="Fichiers" key="2">
          Liste des fichiers
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Files;
