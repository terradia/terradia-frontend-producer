import React from "react";
import { Form } from "antd";
import { FormItemProps } from "antd/es/form";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";

const FormRequiredItem = (props: FormItemProps) => {
  return (
    <Form.Item noStyle>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className={"form_item_wrapper required"} />
        <Form.Item
          preserve
          style={{
            width: "100%",
          }}
          {...props}
        >
          {props.children}
        </Form.Item>
      </div>
    </Form.Item>
  );
};

export default FormRequiredItem;
