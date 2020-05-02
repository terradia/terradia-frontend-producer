import React from "react";
import Button from "./Button";

declare interface CreateCompanyButtonProps {
  callback?: () => void;
}

const CreateCompanyButton = (props: CreateCompanyButtonProps) => {
  return (
    <Button
      onClick={props.callback}
      width={"full-width"}
    >
      Enregistrer une entreprise
    </Button>
  );
};

export default CreateCompanyButton;