import React from "react"
import {ReactComponent as CategoriesLogo} from "../../../assets/Icon/page/Categories Logo.svg";
import SvgContainer from "../SvgContainer";

declare interface CategoriesIconProps {
    style?: React.CSSProperties;
}

const CategoriesIcon = (props: CategoriesIconProps) => {
    return (
        <SvgContainer style={props.style}>
            <CategoriesLogo style={{maxWidth: '100%', maxHeight: '100%' }}/>
        </SvgContainer>
    );
};

export default CategoriesIcon