import React, { useEffect, useState } from "react";
import { Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { InboxOutlined } from "@ant-design/icons/lib";

interface AddProductsFormProps {
  setForm: (e) => void; // To pass the form to the modal
  confirm: () => void;
  category?: string; // default category ?
  categoryList?: any; // list of category
  updateProduct: any; // if you want to update a products or create one
  units: [
    {
      id: string;
      name: string;
      notation: string;
      multiplicationFactor: number;
      referenceUnit: {
        id: string;
        name: string;
        notation: string;
        multiplicationFactor: number;
      };
    }
  ];
}

const { Option } = Select;

const fileList = [];

function ProductsForm(props: AddProductsFormProps) {
  const [form] = Form.useForm();
  const [unitList, setUnitList] = useState([]);

  const initialValues = {
    name: props.updateProduct ? props.updateProduct.name : undefined,
    description: props.updateProduct
      ? props.updateProduct.description
      : undefined,
    category: props.updateProduct
      ? props.updateProduct.category
      : props.category,
    price: props.updateProduct ? props.updateProduct.price : 0.0,
    quantityUnit: props.updateProduct ? props.updateProduct.quantityForUnit : 1,
    unit: props.updateProduct
      ? props.updateProduct.unit !== null
        ? props.updateProduct.unit.id
        : "null"
      : undefined,
  };

  useEffect(() => {
    props.setForm(form);
    if (props.units) {
      const tmpUnitList = [];
      props.units.forEach((unit) => {
        tmpUnitList.push(
          <Option key={unit.id} value={unit.id}>
            {unit.notation}
          </Option>
        );
      });
      tmpUnitList.push(
        <Option key={"null"} value={"null"}>
          Unité
        </Option>
      );
      setUnitList(tmpUnitList);
    }
  }, [form, props, props.units]);

  return (
    <Form
      layout={"vertical"}
      form={form}
      name="product-form"
      onFinish={props.confirm}
      initialValues={initialValues}
    >
      <Row className={"row-product-form"}>
        <Col xl={10} span={24}>
          <Form.Item
            name="name"
            label="Nom du produit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Catégorie du produit"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Sélectionner une catégorie"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.categoryList}
            </Select>
          </Form.Item>
          <Form.Item label={"Portion"} required={true}>
            <Input.Group compact>
              <Form.Item
                name={"quantityUnit"}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "La portion a vendre est requise",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  step={1}
                  precision={0}
                  style={{ width: "40%", height: "100%" }}
                  placeholder="Quantité de portion"
                />
              </Form.Item>
              <Form.Item
                name={"unit"}
                noStyle
                rules={[
                  { required: true, message: "L'unité du produit est requise" },
                ]}
              >
                <Select
                  placeholder={"Sélectionner une unité"}
                  style={{ width: "60%" }}
                >
                  {unitList}
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name="price" label={"Prix"} rules={[{ required: true }]}>
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              formatter={(value) => `${value}€`}
              parser={(value) => value.replace(/€\s?|(,*)/g, "")}
              style={{ width: "40%", height: "100%" }}
              placeholder="Prix du produit"
            />
          </Form.Item>
        </Col>
        <Col xl={2} span={0} />
        <Col xl={12} span={24}>
          <Form.Item
            name={"description"}
            label={"Description"}
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Image du produit">
            <Form.Item valuePropName="fileList" noStyle>
              <Upload.Dragger
                name="files"
                listType={"picture"}
                defaultFileList={[...fileList]}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
              {/*TODO Mettre une preview de l'image chargé*/}
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductsForm;
