import React, { useEffect } from "react";
import { Col, Form, Input, Row } from "antd";

interface AddCategoryFormProps {
  setForm: any;
  confirm?: () => void;
  categoryName?: string;
}

function CategoryForm(props: AddCategoryFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    props.setForm(form);
  });

  return (
    <Form
      layout={"vertical"}
      form={form}
      name="control-hooks"
      onFinish={() => {
        props.confirm();
      }}
      initialValues={{
        name: props.categoryName ? props.categoryName : undefined,
      }}
    >
      <Row>
        <Col xl={2} span={4} />
        <Col xl={20} span={16}>
          <Form.Item
            label={"Nom"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Le nom de la catégorie est requis",
              },
              {
                min: 2,
                message: "Le nom de la catégorie nom est trop court",
              },
              {
                whitespace: true,
                message: "Le nom de la catégorie ne peut être vide",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={2} span={4} />
      </Row>
    </Form>
  );
}

export default CategoryForm;
