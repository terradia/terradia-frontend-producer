import React, { ReactNode } from "react";
import Button from "../Ui/Button";
import { RegisterStepsState } from "./CompanyRegisterForm";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
import Logout from "../Authentication/Logout/Logout";
import { LeftOutlined } from "@ant-design/icons/lib";
import { FormInstance } from "antd/es/form";

declare interface FormStepButtonProps {
  currentStep: number;
  steps: RegisterStepsState;
  createLoading: boolean;
  updateLoading: boolean;
  prevStep: () => void;
  children: ReactNode;
  nextStep: () => void;
  form: FormInstance;
}

const FormStepButton = (props: FormStepButtonProps) => {
  return (
    <>
      {props.currentStep > 0 && (
        <div onClick={props.prevStep} className={"prev_step"}>
          {props.currentStep === 1 && <Logout />}
          {props.currentStep > 1 && (
            <>
              <LeftOutlined />
              <span>{"Étape précédente"}</span>
            </>
          )}
        </div>
      )}
      {props.children}
      <div className="external_connexion">
        {props.currentStep < props.steps.length - 1 && (
          <Button
            isLoading={props.createLoading || props.updateLoading}
            text={"Étape suivante"}
            className={"form_item"}
            id={"next_step"}
            size={"large"}
            onClick={() => props.nextStep()}
          />
        )}
        {props.currentStep === props.steps.length - 1 && (
          <Button
            isLoading={props.updateLoading}
            text={"Mettre à jours l'entreprise"}
            className={"form_item"}
            id={"login_button"}
            size={"large"}
            onClick={() => props.form.submit()}
          />
        )}
      </div>
    </>
  );
};

export default FormStepButton;
