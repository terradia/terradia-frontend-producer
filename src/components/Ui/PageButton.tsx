import React from "react";
import { Menu } from "antd";
import "../../assets/Style/Layout/page-button.less";

declare interface PageButtonProps {
  link: string;
  label: string;
  icon: any;
  onClick: (href: string) => void;
  selected?: boolean;
  collapsed?: boolean;
}

const PageButton = ({
  link,
  icon,
  label,
  onClick,
  selected = false,
  collapsed = false,
  ...props
}: PageButtonProps) => {
  return (
    <Menu.Item
      key={link}
      onClick={() => onClick(link)}
      placeholder={label}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
      {...props}
    >
      <span
        className={
          "icon-container" +
          (selected === true ? " selected" : "") +
          (collapsed === true ? " collapsed" : "")
        }
      >
        {icon}
      </span>
      <span
        className={
          "label-container" +
          (selected === true ? " selected" : "") +
          (collapsed === true ? " collapsed" : "")
        }
      >
        {label}
      </span>
    </Menu.Item>
  );
};

export default PageButton;
