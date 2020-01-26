import React, {useContext} from 'react'
import {Menu} from "antd";
import DrawerMenu from "../../pages/Producer/DrawerMenu";
import {LoginContext} from "../Context/LoginContext";
import Register from "./Register/Register";
import Login from "./Login/Login";

export const AuthButton = () => {
    const loginContext = useContext(LoginContext);

    if (!loginContext.loggedIn)
        return (
            <Menu mode={"horizontal"} style={{float: 'right', display: 'inline-block', lineHeight: '8vh', width: '37.5vh', background: 'none'}}>
                <Menu.Item key={'login'} style={{float: 'right'}}>
                    <Login/>
                </Menu.Item>
                <Menu.Item key={'register'} style={{float: 'right'}}>
                    <Register/>
                </Menu.Item>
            </Menu>
        );
    return (
        <Menu mode={"horizontal"} style={{float: 'right', display: 'inline-block', lineHeight: '8vh', width: '21vh', background: 'none'}}>
            <Menu.Item key={'menu'} style={{float: 'right'}}>
                <DrawerMenu/>
            </Menu.Item>
        </Menu>
    );
};