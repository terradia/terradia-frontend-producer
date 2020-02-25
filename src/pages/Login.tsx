import '../assets/Style/Login/loginPage.less';
import {ReactComponent as Logo} from "../assets/Terradia_white.svg"
import React from "react";
import {Divider} from "antd";
import LoginForm from "../components/Authentication/Login/LoginForm";

const Login = () => {
    return (
        <div className={'loginPage'}>
            <div className={'presentation'}>
                <Logo
                    className={'logo'}
                />
                <Divider className={'presentation-divider'}/>
                <p className={"description"}> L’application qui facilite l’accès aux producteurs</p>
            </div>
            <div className={'action-auth'}>
                <LoginForm/>
            </div>
        </div>
    )
};

export default Login;