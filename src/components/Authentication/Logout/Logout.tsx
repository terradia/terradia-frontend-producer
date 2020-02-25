import React from 'react'
import {ReactComponent as LogoutIcon} from "../../../assets/Logout.svg"
import {Icon, Menu} from "antd";
import {LogoutProps} from "../../../interfaces/Authentication/Logout/Logout";
import {useApolloClient} from "@apollo/react-hooks";

const textStyle = {
    marginLeft: "5%",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#575757",
    flexShrink: 0
};

const Logout = (props: LogoutProps) => {
    const client = useApolloClient();

    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        if (props.visible) {
            props.visible(false);
        }
        client.resetStore();
        return null;
    };
    if (props.isMenu) {
        return (
            <Menu mode={"inline"}>
                <Menu.Item
                    style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center"
                    }}
                    onClick={onLogoutHandler}
                >
                    <Icon component={() => <LogoutIcon height={'25px'} width={'25px'}/>}/>
                    <span style={textStyle}>
                        Se déconnecter
                    </span>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <>
                <Icon component={() => <LogoutIcon height={'25px'} width={'25px'}/>}/>
                <span style={textStyle}>
                    Se déconnecter
                </span>
            </>
        )
    }

};

export default Logout;