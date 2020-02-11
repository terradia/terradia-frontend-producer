import '../../assets/Style/Login/loginPage.less';
import {ReactComponent as Logo} from "../../assets/WhiteLogo.svg"
import React from "react";
import {Divider} from "antd";
import LoginForm from "../components/Authentication/Login/LoginForm";
import { withApollo } from '@apollo/react-hoc';

const Login = () => {
    return (
        <div className={'loginPage'}>
            <div className={"left"}>
                <Logo
                    className={'logo'}
                />
                <Divider className={'login-divier'}/>
                <p className={"description"}> L’application qui facilite l’accès aux producteurs</p>
            </div>
            <div className={'right'}>
                    <LoginForm/>
            </div>
        </div>
    )
};

export default withApollo(Login);