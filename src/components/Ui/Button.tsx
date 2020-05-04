import React from "react";
import { Button as AntButton } from "antd";
import { ButtonShape, ButtonSize, ButtonType } from "antd/es/button";

const ButtonElementsContainer: React.FC = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

interface ButtonColumnProps {
  width: string;
  style?: React.CSSProperties;
}

const ButtonColumn: React.FC<ButtonColumnProps> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.style,
        width: props.width,
      }}
    >
      {props.children}
    </div>
  );
};

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
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const defaultStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: props.width === "full-width" ? "100%" : "",
  };

  let numberOfIcons = 0;
  if (props.icon) numberOfIcons++;
  if (props.rightIcon) numberOfIcons++;

  const mainElementSize = 100 - numberOfIcons * 15;
  const iconContainerSize = 20;

  const type = props.type;
  // if there is an accent color, we change manually the color of the button
  if ((!type || type === "default" || type === "dashed") && props.accentColor) {
    defaultStyle["color"] = props.accentColor;
    defaultStyle["borderColor"] = props.accentColor;
  } else if (type && type === "primary" && props.accentColor) {
    defaultStyle["color"] = "white";
    defaultStyle["backgroundColor"] = props.accentColor;
    defaultStyle["borderColor"] = "rgba(0, 0, 0, 0)";
  } else if (type && type === "link" && props.accentColor) {
    defaultStyle["color"] = props.accentColor;
  }

  return (
    <AntButton
      type={props.type}
      shape={props.shape}
      loading={props.isLoading}
      onClick={props.onClick}
      size={props.size}
      target={props.targetLink}
      block={props.fitParentWidth}
      htmlType={props.htmlType}
      style={{
        ...props.style,
        ...defaultStyle,
      }}
      id={props.id}
      className={props.className}
    >
      <ButtonElementsContainer>
        {props.icon && (
          <ButtonColumn width={iconContainerSize + "%"}>
            <i style={{ width: "60%", height: "60%" }}>{props.icon}</i>
          </ButtonColumn>
        )}
        <ButtonColumn width={mainElementSize + "%"}>
          {props.text}
          {props.children}
        </ButtonColumn>
        {props.rightIcon && (
          <ButtonColumn width={iconContainerSize + "%"}>
            <i style={{ width: "60%", height: "60%" }}>{props.rightIcon}</i>
          </ButtonColumn>
        )}
      </ButtonElementsContainer>
    </AntButton>
  );
};

export default Button;
