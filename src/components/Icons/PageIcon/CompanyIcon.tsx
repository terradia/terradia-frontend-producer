import React from "react";
import {ReactComponent as CompanyLogo} from "../../../assets/Icon/page/Company.svg";
import SvgContainer from "../SvgContainer";

declare interface CompanyIconProps {
    style?: React.CSSProperties;
}

const CompanyIcon = (props: CompanyIconProps) => {
    return (
        <SvgContainer style={props.style}>
            <CompanyLogo style={{ maxWidth: "100%", maxHeight: "100%" }}/>
        </SvgContainer>
    );
};

export default CompanyIcon;