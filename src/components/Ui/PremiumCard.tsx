import React from "react"
import {Icon} from "antd";
import {ReactComponent as Premium} from "../../assets/Icon/PremiumLogo.svg";
import PremiumButton from "./PremiumButton";

const PremiumCard = () => {
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            position: "fixed",
            bottom: "5px"
        }}>
            <Icon component={() => <Premium width={100} height={100}/>}/>
            <p style={{textAlign: "center"}}>
                En passant pro, vous obtiendrez des avantages exclusifs sur la plateforme.
            </p>
            <PremiumButton/>
        </div>
    );
};

export default PremiumCard