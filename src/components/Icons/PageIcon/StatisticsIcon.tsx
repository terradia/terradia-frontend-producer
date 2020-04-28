import React from "react"
import SvgContainer from "../SvgContainer";
import {ReactComponent as StatisticsLogo} from "../../../assets/Icon/page/Statistics Logo.svg";

declare interface StatisticsIconProps {
    style?: React.CSSProperties;
}

const StatisticsIcon = (props: StatisticsIconProps) => {
    return (
        <SvgContainer style={props.style}>
            <StatisticsLogo style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </SvgContainer>
    );
};

export default StatisticsIcon