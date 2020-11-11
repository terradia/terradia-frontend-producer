import React from "react";
import { Form } from "antd";
import { FormItemProps, Rule } from "antd/es/form";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
import { InputProps } from "antd/lib/input";

declare type FormRequiredItemProps = FormItemProps & InputProps;

const FormRequiredItem = (props: FormRequiredItemProps) => {
  const childProps = { ...props };
  const rules: Rule[] = childProps.rules;
  rules.push({ required: true });
  delete childProps.rules;
  return (
    <Form.Item noStyle {...childProps}>
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
          rules={rules}
          {...childProps}
        >
          {props.children}
        </Form.Item>
      </div>
    </Form.Item>
  );
};

export default FormRequiredItem;
