import React from "react";
import { ReactComponent as Logo } from "../assets/Logo/Terradia_white.svg";
import { Divider } from "antd";
import ReturnButtonContainer from "../components/Authentication/Register/ReturnButtonContainer";
import ResetForm from "../components/Authentication/ResetPassword/ResetForm";
import "../assets/Style/ResetPassword/index.less";

export default function ResetPassword() {
  return (
    <div className={"resetPage"}>
      <div className={"presentation"}>
        <Logo className={"logo"} />
        <Divider className={"presentation-divider"} />
        <p className={"description"}>
          Facilitez votre accès aux produits locaux.
        </p>
      </div>
      <div className={"action-auth"}>
        <ReturnButtonContainer text={"Retour"} />
        <ResetForm />
      </div>
    </div>
  );
}
