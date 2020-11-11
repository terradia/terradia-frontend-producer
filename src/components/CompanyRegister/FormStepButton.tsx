import React, { ReactNode } from "react";
import Button from "../Ui/Button";
import { RegisterStepsState } from "./CompanyRegisterForm";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
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
      {props.children}
      <div className="external_connexion">
        {props.currentStep > 0 && (
          <Button
            isLoading={props.createLoading || props.updateLoading}
            text={"Étape précédente"}
            className={"form_item"}
            id={"next_step"}
            size={"middle"}
            onClick={() => props.prevStep()}
          />
        )}
        {props.currentStep < props.steps.length - 1 && (
          <Button
            isLoading={props.createLoading || props.updateLoading}
            text={"Étape suivante"}
            className={"form_item"}
            id={"next_step"}
            size={"middle"}
            onClick={() => props.form.submit()}
          />
        )}
        {props.currentStep === props.steps.length - 1 && (
          <Button
            isLoading={props.updateLoading}
            text={"Mettre à jour l'entreprise"}
            className={"form_item"}
            id={"login_button"}
            size={"middle"}
            onClick={() => props.form.submit()}
          />
        )}
      </div>
    </>
  );
};

export default FormStepButton;
