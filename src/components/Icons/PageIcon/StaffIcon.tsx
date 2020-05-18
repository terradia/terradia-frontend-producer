import React from "react";
import { ReactComponent as StaffLogo } from "../../../assets/Icon/page/Staff Logo.svg";
import SvgContainer from "../SvgContainer";

declare interface StaffIconProps {
  style?: React.CSSProperties;
}

const StaffIcon = (props: StaffIconProps) => {
  return (
    <SvgContainer style={props.style}>
      <StaffLogo style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </SvgContainer>
  );
};

export default StaffIcon;
