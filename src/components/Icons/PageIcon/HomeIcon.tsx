import React from "react"
import SvgContainer from "../SvgContainer";
import { ReactComponent as HomeLogo } from '../../../assets/Icon/page/Home Logo.svg';

declare interface HomeLogoProps {
    style?: React.CSSProperties;
}

const HomeIcon = (props: HomeLogoProps) => {
    return (
        <SvgContainer style={props.style}>
            <HomeLogo style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </SvgContainer>
    );
};

export default HomeIcon;