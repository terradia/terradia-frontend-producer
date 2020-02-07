import '../assets/loginPage.less';
import Terradia from "../public/WhiteLogo.svg"

import React from "react";
import {Checkbox, Divider} from "antd";
import LoginForm from "../components/Authentication/Login/LoginForm";
// import withApollo from "../lib/apollo";



const Login = () => {
    return (
        <div className={'loginPage'}>
            <div className={"left"}>
                <Terradia
                    className={'logo'}
                />
                <Divider className={'login-divier'}/>
                <p className={"description"}> L’application qui facilite l’accès aux producteurs</p>
            </div>
            <div className={'right'}>
                <div className={'inputBox'}>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
};

export default Login;
// export default withApollo(Login);