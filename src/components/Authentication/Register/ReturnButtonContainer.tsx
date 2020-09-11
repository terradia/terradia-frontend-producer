import React from "react";
import Button from "../../Ui/Button";
import { useHistory } from "react-router-dom";

interface Props {
  text?: string;
}

const ReturnButtonContainer: React.FC<Props> = ({ text }: Props) => {
  const history = useHistory();

  return (
    <div className={"return-to-login-button-container"}>
      <Button
        type={"link"}
        text={text ? text : "Déjà un compte ? Se connecter"}
        size={"large"}
        onClick={() => {
          history.push("/login");
        }}
      />
    </div>
  );
};

export default ReturnButtonContainer;
