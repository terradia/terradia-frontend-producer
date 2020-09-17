import React from "react";
import { ReactComponent as Logo } from "../assets/Logo/Terradia_white.svg";
import { Divider } from "antd";
import CompanyRegisterForm from "../components/CompanyRegister/CompanyRegisterForm";
import "../assets/Style/Login-Register/loginRegisterPage.less";

const CompanyRegister = () => {
  return (
    <div className={"loginPage"}>
      <div className={"presentation"}>
        <Logo className={"logo"} />
        <Divider className={"presentation-divider"} />
        <p className={"description"}>
          L’application qui facilite l’accès aux produits locaux!
        </p>
      </div>
      <div className={"action-auth"}>
        <CompanyRegisterForm />
      </div>
    </div>
  );
};

export default CompanyRegister;
