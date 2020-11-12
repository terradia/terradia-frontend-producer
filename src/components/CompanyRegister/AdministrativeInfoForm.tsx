import React from "react";
import { Input } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";
import CountryCode from "../Ui/CountryCode";
import FormRequiredItem from "../Ui/FormRequiredItem";
import { ValidateStatus } from "antd/es/form/FormItem";

export declare interface InputStatus {
  siren?: ValidateStatus;
  officialName?: ValidateStatus;
  name?: ValidateStatus;
  address?: ValidateStatus;
}

declare interface AdministrativeInfoFromProps {
  isLocked?: boolean;
  validationStatus?: InputStatus;
}

const AdministrativeInfoForm = (props: AdministrativeInfoFromProps) => {
  return (
    <>
      <FormRequiredItem
        hasFeedback
        validateStatus={
          props.validationStatus ? props.validationStatus.siren : undefined
        }
        name={"siren"}
        rules={[
          {
            required: true,
            message: "Veuillez renseigner le SIREN de votre entreprise",
          },
          {
            len: 9,
          },
        ]}
      >
        <Input className={"input_item"} placeholder={"SIREN"} />
      </FormRequiredItem>
      <FormRequiredItem
        hasFeedback
        validateStatus={
          props.validationStatus
            ? props.validationStatus.officialName
            : undefined
        }
        name={"officialName"}
        style={{
          width: "100%",
        }}
        rules={[
          {
            message: "Veuillez renseigner le nom officiel de l'entreprise",
          },
        ]}
      >
        <Input
          className={"input_item"}
          placeholder={"Nom officiel de l'entreprise"}
          disabled={props.isLocked}
        />
      </FormRequiredItem>
      <FormRequiredItem
        hasFeedback
        validateStatus={
          props.validationStatus ? props.validationStatus.name : undefined
        }
        name={"name"}
        rules={[
          {
            message: "Veuillez renseigner le nom de l'entreprise",
          },
        ]}
      >
        <Input className={"input_item"} placeholder={"Nom de l'entreprise"} />
      </FormRequiredItem>
      <FormRequiredItem
        hasFeedback
        validateStatus={
          props.validationStatus ? props.validationStatus.address : undefined
        }
        name={"address"}
        rules={[
          {
            message: "Veuillez renseigner l'adresse de l'entreprise",
          },
        ]}
      >
        <Input className={"input_item"} placeholder={"Address"} />
      </FormRequiredItem>
      <FormRequiredItem
        hasFeedback
        name={"email"}
        rules={[
          {
            type: "email",
          },
          {
            message: "Veuillez renseigner un email",
          },
        ]}
      >
        <Input className={"input_item"} placeholder={"Email"} />
      </FormRequiredItem>
      <FormRequiredItem
        name={"phone"}
        rules={[
          {
            message: "Veuillez renseigner un numéro de téléphone",
          },
        ]}
      >
        <Input
          className={"input_item"}
          placeholder={"Phone"}
          addonBefore={<CountryCode />}
        />
      </FormRequiredItem>
    </>
  );
};

export default AdministrativeInfoForm;
