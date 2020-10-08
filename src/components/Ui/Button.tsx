import React from "react";
import { Button as AntButton } from "antd";
import { ButtonShape, ButtonSize, ButtonType } from "antd/es/button";

export interface ButtonProps {
  text?: string;
  type?: ButtonType; // can be set to 'primary' 'ghost' 'dashed' 'link' or 'omitted' (meaning default)
  disable?: boolean;
  shape?: ButtonShape;
  style?: React.CSSProperties;
  isLoading?: boolean;
  icon?: any;
  rightIcon?: any;
  size?: ButtonSize;
  width?: string;
  targetLink?: string;
  htmlType?: "button" | "reset" | "submit" | undefined;
  fitParentWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  id?: string;
  className?: string;
  accentColor?: string;
  error?: boolean;
  danger?: boolean;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  accentColor,
  type,
  shape,
  isLoading,
  onClick,
  size,
  targetLink,
  fitParentWidth,
  htmlType,
  icon,
  id,
  style,
  text,
  children,
  danger,
  ...props
}) => {
  const defaultStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: props.width && props.width,
  };

  // if there is an accent color, we change manually the color of the button
  if ((!type || type === "default" || type === "dashed") && accentColor) {
    defaultStyle["color"] = accentColor;
    defaultStyle["backgroundColor"] = "rgba(0, 0, 0, 0)";
    defaultStyle["borderColor"] = accentColor;
  } else if (type && type === "primary" && accentColor) {
    defaultStyle["color"] = "white";
    defaultStyle["backgroundColor"] = accentColor;
    defaultStyle["borderColor"] = "rgba(0, 0, 0, 0)";
  } else if (type && type === "link" && accentColor) {
    defaultStyle["color"] = accentColor;
  }

  if (danger === true) defaultStyle["color"] = "#F5222D";

  return (
    <AntButton
      type={type}
      shape={shape}
      loading={isLoading}
      onClick={onClick}
      size={size}
      target={targetLink}
      block={fitParentWidth}
      htmlType={htmlType}
      danger={danger}
      icon={
        icon !== undefined &&
        React.cloneElement(icon, {
          style: { color: defaultStyle["color"] },
        })
      }
      style={{
        ...style,
        ...defaultStyle,
      }}
      id={id}
      className={props.className}
      {...props}
    >
      {text}
      {children && children}
    </AntButton>
  );
};

export default Button;
