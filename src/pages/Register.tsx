import React from "react";
import {ReactComponent as Logo} from "../assets/Logo/Terradia_white.svg";
import {Divider} from "antd";
import '../assets/Style/Register/registerPage.less';
import RegisterForm from "../components/Authentication/Register/RegisterForm";

const Register = () => {
  return (
    <div className={'loginPage'}>
      <div className={'presentation'}>
        <Logo className={'logo'} />
        <Divider className={'presentation-divider'} />
        <p className={'description'}>
          L’application qui facilite l’accès aux produits locaux
        </p>
      </div>
      <div className={'action-auth'}>
        <ReturnButtonContainer />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
