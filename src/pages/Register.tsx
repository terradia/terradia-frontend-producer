import React from "react";
import {ReactComponent as Logo} from "../assets/Terradia_white.svg";
import {Divider} from "antd";
import '../assets/Style/Register/registerPage.less';
import RegisterForm from "../components/Authentication/Register/RegisterForm";

const Register = () => {
    return (<div className={'registerPage'}>
        <div className={'action-auth'}>
            <RegisterForm/>
        </div>

        <div className={"presentation"}>
            <Logo
                className={'logo'}
            />
            <Divider className={'presentation-divider'}/>
            <p className={"description"}> L’application qui facilite l’accès aux producteurs</p>
        </div>
    </div>)
};

export default Register;
