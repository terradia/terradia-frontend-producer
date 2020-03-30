import React from 'react'
import {ReactComponent as LogoutIcon} from "../../../assets/Logout.svg"
import {Icon, Menu} from "antd";
import {LogoutProps} from "../../../interfaces/Authentication/Logout/Logout";
import {useApolloClient} from "@apollo/react-hooks";

const textStyle = {
    //marginLeft: "5%",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#BBBBBB",
    flexShrink: 0
};

const Logout = React.forwardRef(({
                                     isMenu,
                                     ...props
                                 }: LogoutProps, ref) => {
    const client = useApolloClient();

    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        /*if (visible) {
            visible(false);
        }*/
        client.resetStore();
        return null;
    };
    if (isMenu) {
        return (
            <Menu
                mode={"inline"}
                inlineIndent={12}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignContent: "space-around",
                    position: "sticky",
                    bottom: 0
                }}
            >
                <Menu.Item key={"logout"} onClick={onLogoutHandler} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }} {...props}>
                    <Icon component={() => <LogoutIcon height={'25px'} width={'25px'} style={{display: "flex"}}/>}/>
                    <span style={textStyle}>
                    Se déconnecter
                </span>
                </Menu.Item>
            </Menu>
        )
    }
    return (
        <div style={{
            position: "fixed",
            bottom: "5px"
        }}>
            <Icon component={() => <LogoutIcon height={'25px'} width={'25px'}/>}/>
            <span style={textStyle}>
                    Se déconnecter
                </span>
        </div>
    )
});

export default Logout;