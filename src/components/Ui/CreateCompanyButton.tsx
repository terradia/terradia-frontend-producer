import React from "react";
import Button from "./Button";

declare interface CreateCompanyButtonProps {
  callback?: () => void;
}

const CreateCompanyButton = (props: CreateCompanyButtonProps) => {
  return (
    <Button
      style={{
        display: "flex",
        borderColor: "#5CC04A",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={props.callback}
    >
      Enregistrer une entreprise
    </Button>
  );
};

export default CreateCompanyButton;