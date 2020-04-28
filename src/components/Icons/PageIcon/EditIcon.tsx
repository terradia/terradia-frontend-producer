import React from "react"
import {ReactComponent as EditSvg} from "../../../assets/Icon/ui/edit.svg";
import SvgContainer from "../SvgContainer";

declare interface EditIconProps {
    style?: React.CSSProperties;
}

const EditIcon = (props: EditIconProps) => {
    return (
        <SvgContainer style={props.style}>
            <EditSvg style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </SvgContainer>
    );
};

export default EditIcon