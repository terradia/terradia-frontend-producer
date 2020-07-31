import React, { useEffect } from "react";
import { Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("common");

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
            label={t("ProductsPage.createCategoryModal.name")}
            name={"name"}
            rules={[
              {
                required: true,
                message: `${t("ProductsPage.createCategoryModal.errors.name")}`,
              },
              {
                min: 2,
                message: `${t("ProductsPage.createCategoryModal.errors.min")}`,
              },
              {
                whitespace: true,
                message: `${t(
                  "ProductsPage.createCategoryModal.errors.whitespace"
                )}`,
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
