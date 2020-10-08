import React from "react";
import { Input, Form } from "antd";

const PersonalInfoForm = () => {
  return (
    <>
      <Form.Item
        preserve
        name={"firstname"}
        rules={[{ message: "Veuillez renseigner votre prénom" }]}
      >
        <Input className={"input_item"} placeholder={"Prénom"} />
      </Form.Item>
      <Form.Item
        preserve
        name={"lastname"}
        rules={[{ message: "Veuillez renseigner votre nom" }]}
      >
        <Input className={"input_item"} placeholder={"Nom"} />
      </Form.Item>
      <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
        <Form.Item
          preserve
          name="year"
          rules={[{ message: "Veuillez renseigner votre année de naissance" }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="Input birth year" />
        </Form.Item>
        <Form.Item
          preserve
          name="month"
          rules={[{ message: "Veuillez renseigner votre mois de naissance" }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Input birth month" />
        </Form.Item>
      </Form.Item>
    </>
  );
};

export default PersonalInfoForm;
