import React from "react";
import "../assets/Style/Layout/loading-full-page.less";
import { LoadingOutlined } from "@ant-design/icons/lib";

const LoadingFullPage: React.FC = () => {
  return (
    <div className={"loading-full-page container"}>
      <div>
        <LoadingOutlined style={{ fontSize: 80 }} />
        <div>Chargement de Terradia</div>
      </div>
    </div>
  );
};

export default LoadingFullPage;
