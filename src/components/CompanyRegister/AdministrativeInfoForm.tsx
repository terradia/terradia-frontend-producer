import React from "react";
import { Input, Form } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";

const AdministrativeInfoForm = () => {
  return (
    <>
      <Form.Item name={"description"}>
        <Input.TextArea
          className={"input_item"}
          placeholder={"Description courte (300 caractères)"}
          onChange={(event) => {
            if (event.currentTarget.value.length === 300) return false;
          }}
        />
      </Form.Item>
    </>
  );
};

export default AdministrativeInfoForm;
