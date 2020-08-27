import React from "react";
import { Input, Form } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";
import CountryCode from "../Ui/CountryCode";

const AdministrativeInfoForm = () => {
  return (
    <>
      <Form.Item
        name={"siren"}
        rules={[
          {
            required: true,
            //TODO: Translate this
            message: "Veuillez renseigner le SIREN de votre entreprise",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input className={"form_item"} placeholder={"SIREN"} />
        </div>
      </Form.Item>
      <Form.Item
        name={"name"}
        rules={[
          {
            required: true,
            //TODO: translate this
            message: "Veuillez renseigner le nom de l'entreprise",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input
            className={"form_item required"}
            placeholder={"Nom de l'entreprise"}
          />
        </div>
      </Form.Item>
      <Form.Item name={"address"}>
        <div className={"form_item_wrapper required"}>
          <Input
            className={"form_item input_item required"}
            placeholder={"Address"}
          />
        </div>
      </Form.Item>
      <Form.Item
        name={"email"}
        rules={[
          {
            required: true,
            //TODO: Translate this
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
            //TODO: Translate this
            message: "Veuillez renseigner un numéro de téléphone",
          },
        ]}
      >
        <div className={"form_item_wrapper required"}>
          <Input
            className={"form_item"}
            placeholder={"Phone"}
            addonBefore={<CountryCode />}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default AdministrativeInfoForm;
