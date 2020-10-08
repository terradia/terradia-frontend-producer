import React from "react";
import { Input } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";
import CountryCode from "../Ui/CountryCode";
import FormRequiredItem from "../Ui/FormRequiredItem";

const AdministrativeInfoForm = () => {
  return (
    <>
      <FormRequiredItem
        name={"siren"}
        rules={[
          { message: "Veuillez renseigner le SIREN de votre entreprise" },
        ]}
      >
        <Input className={"input_item"} placeholder={"SIREN"} />
      </FormRequiredItem>
      <FormRequiredItem
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
          placeholder={"Nom officel de l'entreprise"}
        />
      </FormRequiredItem>
      <FormRequiredItem
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
        name={"address"}
        rules={[
          {
            message: "Veuillez renseigner l'adresse de l'entreprise",
          },
        ]}
      >
        <Input className={"form_item input_item"} placeholder={"Address"} />
      </FormRequiredItem>
      <FormRequiredItem
        name={"email"}
        rules={[
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
