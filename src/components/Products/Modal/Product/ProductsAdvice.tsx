import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Advice } from "../../../../interfaces/Advice";
import { Divider, Form, Input, List, Row } from "antd";
import Button from "../../../Ui/Button";
import { PlusOutlined } from "@ant-design/icons/lib";
import { useTranslation } from "react-i18next";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import ProductAdviceItem from "./ProductAdviceItem";

const mutationCreateProductAdvice = graphqlLoader(
  "../../../../graphql/mutation/products/createProductAdvice.graphql"
);
const mutationDeleteProductAdvice = graphqlLoader(
  "../../../../graphql/mutation/products/deleteProductAdvice.graphql"
);
const mutationUpdateProductAdvice = graphqlLoader(
  "../../../../graphql/mutation/products/updateProductAdvice.graphql"
);
const queryProductAdvices = graphqlLoader(
  "../../../../graphql/query/product/getCompanyProductAdvices.graphql"
);

declare interface ProductsAdviceProps {
  advices: [Advice] | []; // if you want to update a products or create one
  fetchMoreAdvices: any;
  loading: boolean;
  productId: string;
  companyId: string;
}

function ProductsAdvice(props: ProductsAdviceProps) {
  const { t } = useTranslation("common");

  const [loading, setLoading] = useState(false);
  const [creatingAdvice, setCreatingAdvice] = useState(false);
  const [editingAdvice, setEditingAdvice] = useState(null);
  const [offsetAdvice, setoffsetAdvice] = useState(1);
  const [noMoreReviews, setNoMoreReviews] = useState(false);

  const [form] = Form.useForm();
  const initialValues = {
    title: null,
    content: null,
  };

  const [createProductAdviceMutation] = useMutation(
    mutationCreateProductAdvice,
    {
      refetchQueries: [
        {
          query: queryProductAdvices,
          variables: {
            productId: props.productId,
            companyId: props.companyId,
            limit: 5 * offsetAdvice,
            offset: 0,
          },
        },
      ],
    }
  );

  const [deleteProductAdviceMutation] = useMutation(
    mutationDeleteProductAdvice,
    {
      refetchQueries: [
        {
          query: queryProductAdvices,
          variables: {
            productId: props.productId,
            companyId: props.companyId,
            limit: 5 * offsetAdvice,
            offset: 0,
          },
        },
      ],
    }
  );

  const [updateProductAdviceMutation] = useMutation(
    mutationUpdateProductAdvice,
    {
      refetchQueries: [
        {
          query: queryProductAdvices,
          variables: {
            productId: props.productId,
            companyId: props.companyId,
            limit: 5 * offsetAdvice,
            offset: 0,
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (props.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.loading]);

  function handleCreateAdvice(values) {
    createProductAdviceMutation({
      variables: {
        companyId: props.companyId,
        productId: props.productId,
        title: values.title,
        content: values.content,
      },
    }).then(() => {
      setCreatingAdvice(false);
      form.resetFields();
    });
  }

  function handleEditAdvice(values) {
    updateProductAdviceMutation({
      variables: {
        adviceId: editingAdvice,
        title: values.title,
        content: values.content,
      },
    }).then(() => {
      setEditingAdvice(null);
      form.resetFields();
    });
  }

  function setEditAdvice(advice) {
    setEditingAdvice(advice.id);
    form.setFieldsValue({
      title: advice.title,
      content: advice.content,
    });
  }

  function handleLoadMoreAdvice() {
    setLoading(true);
    props.fetchMoreAdvices({
      variables: {
        productId: props.productId,
        companyId: props.companyId,
        limit: 5,
        offset: 5 * offsetAdvice,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setLoading(false);
          return prev;
        }
        if (
          fetchMoreResult &&
          fetchMoreResult.getCompanyProductAdvises.length === 0
        ) {
          setNoMoreReviews(true);
          setLoading(false);
          return prev;
        }
        fetchMoreResult.getCompanyProductAdvises.map((newAdvice) => {
          if (
            prev.getCompanyProductAdvises.findIndex(
              (oldReview) => oldReview.id === newAdvice.id
            ) === -1
          )
            prev.getCompanyProductAdvises.push(newAdvice);
          return true;
        });
        setoffsetAdvice(offsetAdvice + 1);
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
  }

  return (
    <>
      {!creatingAdvice && !editingAdvice && (
        <Button
          className={"button"}
          text={t("ProductsPage.ProductAdvices.createAdvice")}
          icon={<PlusOutlined />}
          onClick={() => setCreatingAdvice(true)}
        />
      )}
      {(creatingAdvice === true || editingAdvice !== null) && (
        <>
          <Form
            layout={"vertical"}
            form={form}
            name="advice-form"
            onFinish={
              editingAdvice !== null ? handleEditAdvice : handleCreateAdvice
            }
            initialValues={initialValues}
          >
            <Row className={"row-product-form"}>
              <Form.Item
                name={"title"}
                label={t("ProductsPage.ProductAdvices.titleAdvice")}
                className={"product-advice-title"}
                rules={[
                  {
                    required: true,
                    message: `${t("ProductsPage.ProductAdvices.errorTitle")}`,
                  },
                  {
                    max: 150,
                    message: `${t(
                      "ProductsPage.ProductAdvices.errorTitleLen"
                    )}`,
                  },
                ]}
              >
                <Input
                  className={"product-advice-title-input"}
                  placeholder={t(
                    "ProductsPage.ProductAdvices.titlePlaceholder"
                  )}
                />
              </Form.Item>
            </Row>
            <Row className={"row-product-form"}>
              <Form.Item
                name={"content"}
                label={t("ProductsPage.ProductAdvices.contentAdvice")}
                className={"product-advice-content"}
                rules={[
                  {
                    required: true,
                    message: `${t("ProductsPage.ProductAdvices.errorContent")}`,
                  },
                  {
                    max: 500,
                    message: `${t(
                      "ProductsPage.ProductAdvices.errorContentLen"
                    )}`,
                  },
                ]}
              >
                <TextArea
                  className={"product-advice-content-input"}
                  rows={4}
                  placeholder={t(
                    "ProductsPage.ProductAdvices.contentPlaceholder"
                  )}
                />
              </Form.Item>
            </Row>
          </Form>
          <div className={"footer-advices-form"}>
            <Button
              className={"button"}
              text={t("ProductsPage.createProductModal.buttons.cancel")}
              onClick={() => {
                form.resetFields();
                setCreatingAdvice(false);
                setEditingAdvice(null);
              }}
            />
            <Button
              className={"button"}
              type={"primary"}
              text={t("ProductsPage.createProductModal.buttons.save")}
              onClick={() => {
                form.submit();
              }}
            />
          </div>
          <Divider />
        </>
      )}
      <List
        loading={loading}
        dataSource={props.advices}
        loadMore={
          !noMoreReviews ? (
            <span className={"load-more-advice"} onClick={handleLoadMoreAdvice}>
              voir plus
            </span>
          ) : null
        }
        renderItem={(item: Advice) => {
          return (
            <ProductAdviceItem
              item={item}
              deleteAdviceMutation={deleteProductAdviceMutation}
              setEditingAdvice={setEditAdvice}
            />
          );
        }}
      />
    </>
  );
}

export default ProductsAdvice;
