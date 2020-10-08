import React from "react";
import { ReactComponent as Logo } from "../assets/Logo/Terradia_white.svg";
import { Divider } from "antd";
import "../assets/Style/Login-Register/loginRegisterPage.less";
import CompanyRegisterForm from "../components/CompanyRegister/CompanyRegisterForm";

const CompanyRegister = () => {
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
        <CompanyRegisterForm />
      </div>
    </div>
  );
};

export default CompanyRegister;
