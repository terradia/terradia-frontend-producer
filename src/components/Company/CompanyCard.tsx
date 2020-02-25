import React from "react";
import {Avatar, Card} from "antd";

const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#575757",
    flexShrink: 0
};

declare interface CompanyCardProps {
    id: string;
    selected: boolean;
    loading?: boolean;
    name?: string;
    cover?: string;
    logo?: string;
    onClick: (string) => void
}

const CompanyCard = ({
                         id,
                         selected= false,
                         loading = false,
                         name = "Mon compte personnel",
                         cover = "/src/assets/company/defaultCover",
                         logo = "/src/assets/company/defaultLogo",
                         onClick
                     }: CompanyCardProps) => {

    const onClickHandler = () => {
        onClick(id)
    };

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Card style={{
                width: 250,
                height: 250,
                margin: "24px",
                boxSizing: "border-box",
                boxShadow: "0px 5px 15px " + (selected) ? "#C4C4C4" : "#FFFFFF" ,
                borderRadius: "8px"
            }}
                  onClick={onClickHandler}
                  loading={loading}
            >
                <Avatar
                    size={200}
                    shape={"circle"}
                    alt={"profile"}
                    src={"S3Url" + logo}
                />
            </Card>
            <span style={textStyle}>
                {name}
            </span>
        </div>
    )
};

export default CompanyCard;