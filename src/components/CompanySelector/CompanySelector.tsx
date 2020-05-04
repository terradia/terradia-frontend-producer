import React from "react";
import { DownOutlined } from "@ant-design/icons";

declare interface CompanySelectorProps {
  name: string;
}

const CompanySelector = (props: CompanySelectorProps) => {
  return (
    <div style={{ color: "#5CC04A", fontSize: "20px", fontStyle: "bold" }}>
      <DownOutlined />
      <span>{props.name}</span>
    </div>
  );
};

export default CompanySelector;
