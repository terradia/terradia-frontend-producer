import React from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

declare interface CreateCompanyButtonProps {
  callback?: () => void;
}

const CreateCompanyButton = (props: CreateCompanyButtonProps) => {
  const { t } = useTranslation("common");

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
      {
        t("CompanyRegisterPage.createCompanyButton")
      }
    </Button>
  );
};

export default CreateCompanyButton;
