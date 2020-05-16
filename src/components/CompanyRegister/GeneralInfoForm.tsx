import React from "react";
import { Input, Form } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";
import CountryCode from "../Ui/CountryCode";

const GeneralInfoForm = () => {
  return (
    <>
      <Form.Item
        name={"siren"}
        rules={[
          {
            required: true,
            message: "Veuillez renseigner le SIREN de votre entreprise",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input className={"input_item"} placeholder={"SIREN"} />
        </div>
      </Form.Item>
      <Form.Item
        name={"name"}
        rules={[
          {
            required: true,
            message: "Veuillez renseigner le nom de l'entreprise",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input
            className={"input_item required"}
            placeholder={"Nom de l'entreprise"}
          />
        </div>
      </Form.Item>
      <Form.Item name={"address"}>
        <Input className={"form_item input_item"} placeholder={"Address"} />
      </Form.Item>
      <Form.Item
        name={"email"}
        rules={[
          {
            required: true,
            message: "Veuillez renseigner un email",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input className={"input_item required"} placeholder={"Email"} />
        </div>
      </Form.Item>
      <Form.Item
        name={"phone"}
        rules={[
          {
            required: true,
            message: "Veuillez renseigner un numéro de téléphone",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input
            className={"input_item"}
            placeholder={"Phone"}
            addonBefore={<CountryCode />}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default GeneralInfoForm;
