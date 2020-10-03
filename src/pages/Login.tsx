import "../assets/Style/Login-Register/loginRegisterPage.less";
import { ReactComponent as Logo } from "../assets/Logo/Terradia_white.svg";
import React from "react";
import { Divider } from "antd";
import LoginForm from "../components/Authentication/Login/LoginForm";

const Login = () => {
  return (
    <div className={"loginPage"}>
      <div className={"presentation"}>
        <Logo className={"logo"} />
        <Divider className={"presentation-divider"} />
        <p className={"description"}>
          Facilitez votre accès aux produits locaux.
        </p>
      </div>
      <div className={"action-auth"}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
