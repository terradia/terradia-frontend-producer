import React from "react";
import {ReactComponent as ReactLogo} from "../../assets/Terradia.svg";
import Logout from "../Authentication/Logout/Logout";
import {Layout as AntLayout, Avatar} from "antd";
import CompanySelector from "../CompanySelector/CompanySelector";

const AntHeader = AntLayout.Header;

declare interface HeaderProps {
    Company?: boolean
}

//TODO Faire un burger menu si la taille est trop petite

const Header = (props: HeaderProps) => {
    let displayedInfo;

    if (props.Company) {
        displayedInfo = (
            <div style={{
                order: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
            }}>
                <Logout/>
            </div>
        )
    } else {
        displayedInfo = (
            <div style={{
                order: 1,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                flex: 1,
            }}>
                <span style={{
                    height: '18px'
                }}>
                    Victor Heim
                </span>
                <CompanySelector/>
            </div>
        )
    }

    return (
        <>
            <AntHeader
                style={{
                    height: '10vh',
                    background: "white",
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "#CBCBCB",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "thin"
                }}
            >
                <ReactLogo
                    height={"5vh"}
                    width={"25vh"}
                    style={{
                        marginLeft: '2%',
                    }}
                />
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Avatar
                        size={"large"}
                        shape={"circle"}
                        alt={"profile"}
                        style={{
                            order: 2,
                            marginRight: "5%",
                            marginLeft: "5%"
                        }}
                    />
                    {displayedInfo}
                </div>
            </AntHeader>
        </>
    )
};

export default Header;