import React from "react";
import SvgContainer from "../SvgContainer";
import { ReactComponent as LogoutLogo } from "../../../assets/Icon/page/Logout.svg";

declare interface LogoutIconProps {
  style?: React.CSSProperties;
}

const LogoutIcon = (props: LogoutIconProps) => {
  return (
    <SvgContainer style={props.style}>
      <LogoutLogo style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </SvgContainer>
  );
};

export default LogoutIcon;
