import React from "react";
import { Input, Form } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";

const AdministrativeInfoForm = () => {
  return (
    <Form.Item name={"address"}>
      <Input className={"form_item input_item"} placeholder={"Address"} />
    </Form.Item>
  );
};

export default AdministrativeInfoForm;
