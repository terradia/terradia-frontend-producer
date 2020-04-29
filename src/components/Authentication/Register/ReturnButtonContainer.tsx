import React from "react";
import Button from "../../Ui/Button";
import { useHistory } from "react-router-dom";

const ReturnButtonContainer = () => {
  const history = useHistory();

  return (
    <div className={"return-to-login-button-container"}>
      <Button
        type={"link"}
        text={"Déjà un compte ? Se connecter"}
        size={"large"}
        onClick={() => {
          history.push("/Login");
        }}
      />
    </div>
  );
};

export default ReturnButtonContainer;
