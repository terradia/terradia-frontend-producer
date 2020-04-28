import React from "react";
import Button from "./Button";
import {ReactComponent as Thunder} from "../../assets/Icon/thunder.svg";

const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 400,
    flexShrink: 0,
    color: "#5CC04A",
    fontSize: 16
};

const AdButton = () => {
    return (
        <Button
            style={{
                display: "flex",
                borderColor: "#5CC04A",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Thunder width={'25px'} height={'25px'}/>
            <span style={textStyle}>
                Créer une publicité
            </span>
        </Button>
    )
};

export default AdButton;