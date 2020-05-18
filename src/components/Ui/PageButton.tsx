import React from "react";
import { Menu } from "antd";

declare interface PageButtonProps {
  link: string;
  label: string;
  icon: React.ReactNode;
  onClick: (href: string) => void;
  selected?: boolean;
}

const PageButton = ({
  link,
  icon,
  label,
  onClick,
  selected = false,
  ...props
}: PageButtonProps) => {
  return (
    <Menu.Item
      key={link}
      onClick={() => onClick(link)}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: "16",
      }}
      {...props}
    >
      <div className={"button-container"}>
        <span
          className={"icon-container" + (selected === true ? " selected" : "")}
        >
          {icon}
        </span>
        <span
          className={"label-container" + (selected === true ? " selected" : "")}
        >
          {label}
        </span>
      </div>
    </Menu.Item>
  );
};

export default PageButton;
