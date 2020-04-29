import React from "react";
import {ReactComponent as DocumentLogo} from "../../../assets/Icon/page/Document Logo.svg";
import SvgContainer from "../SvgContainer";

declare interface DocumentIconProps {
    style?: React.CSSProperties;
}

const DocumentIcon = (props: DocumentIconProps) => {
    return (
        <SvgContainer style={props.style}>
            <DocumentLogo style={{ maxWidth: "100%", maxHeight: "100%" }}/>
        </SvgContainer>
    );
};

export default DocumentIcon;