import React, { useEffect, useState } from "react";
import { Col, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImageSelectorButton from "../../../Gallery/ImageSelectorButton";
import { useTranslation } from "react-i18next";

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

function ProductsForm(props: AddProductsFormProps) {
  const [form] = Form.useForm();
  const [unitList, setUnitList] = useState([]);
  const [initialValues] = useState({
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
    cover:
      props.updateProduct && props.updateProduct.cover
        ? props.updateProduct.cover.companyImage !== null
          ? props.updateProduct.cover.companyImage.id
          : null
        : undefined,
  });
  const [coverImage, setCoverImage] = useState(
    props.updateProduct &&
      props.updateProduct.cover !== null &&
      props.updateProduct.cover.companyImage.filename !== null
      ? props.updateProduct.cover.companyImage
      : null
  );

  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    if (coverImage !== null) {
      setFileList([
        {
          key: coverImage.id,
          uid: coverImage.id,
          name: coverImage.name,
          url: `https://media.terradia.eu/${coverImage.filename}`,
        },
      ]);
    }
  }, [coverImage]);

  useEffect(() => {
    // TODO : translate the "Pièce"
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
          Pièce(s)
        </Option>
      );
      setUnitList(tmpUnitList);
    }
  }, [form, props, props.units]);

  const { t } = useTranslation("common");

  return (
    <Form
      layout={"vertical"}
      form={form}
      name="product-form"
      onFinish={props.confirm}
      initialValues={initialValues}
    >
      <Row className={"row-product-form"}>
        <Col xl={11} span={24}>
          <Form.Item
            name="name"
            label={t("ProductsPage.createProductModal.productName")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={t("ProductsPage.createProductModal.productCategory")}
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={t("ProductsPage.createProductModal.selectCategory")}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.categoryList}
            </Select>
          </Form.Item>
          <Form.Item
            label={t("ProductsPage.createProductModal.portion")}
            required={true}
          >
            <Input.Group compact>
              <Form.Item
                name={"quantityUnit"}
                noStyle
                rules={[
                  {
                    required: true,
                    message: `${t(
                      "ProductsPage.createProductModal.portionValidation.portion.errors"
                    )}`,
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  step={1}
                  precision={0}
                  className={"input-text-right"}
                  style={{ width: "70%", height: "100%", textAlign: "right" }}
                  placeholder={t(
                    "ProductsPage.createProductModal.portionValidation.portion.name"
                  )}
                />
              </Form.Item>
              <Form.Item
                name={"unit"}
                noStyle
                rules={[
                  {
                    required: true,
                    message: `${t(
                      "ProductsPage.createProductModal.portionValidation.unity.errors"
                    )}`,
                  },
                ]}
              >
                <Select
                  placeholder={t(
                    "ProductsPage.createProductModal.portionValidation.unity.name"
                  )}
                  style={{ width: "30%" }}
                >
                  {unitList}
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="price"
            label={t("ProductsPage.createProductModal.price")}
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              formatter={(value) => `${value}€`}
              parser={(value) => value.replace(/€\s?|(,*)/g, "")}
              style={{ width: "100%", height: "100%" }}
              className={"input-text-right"}
              placeholder="Prix du produit"
            />
          </Form.Item>
        </Col>
        <Col xl={2} span={24} />
        <Col xl={11} span={24}>
          <Form.Item
            name={"description"}
            label={t("ProductsPage.createProductModal.desc")}
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label={t("ProductsPage.createProductModal.image")}>
            <Form.Item name="cover" noStyle>
              <>
                <ImageSelectorButton
                  onlyOneImageByOne
                  onValidate={(selectedImages) => {
                    setCoverImage(selectedImages[0]);
                    form.setFieldsValue({
                      cover: selectedImages[0].id,
                    });
                  }}
                />
                {fileList !== null && (
                  <Upload
                    listType={"picture"}
                    fileList={fileList}
                    onRemove={() => {
                      setFileList(null);
                      form.setFieldsValue({
                        cover: null,
                      });
                    }}
                  />
                )}
              </>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductsForm;
