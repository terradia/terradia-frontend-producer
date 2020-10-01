import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Tabs } from "antd";
import ProductsForm from "./ProductsForm";
import "../../../../assets/Style/Products/Modal/ProductsModal.less";
import { loader as graphqlLoader } from "graphql.macro";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import ProductsAdvice from "./ProductsAdvice";
import ProductsReviews from "./ProductsReviews";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const mutationCreateProduct = graphqlLoader(
  "../../../../graphql/mutation/products/createProduct.graphql"
);
const mutationDeleteProduct = graphqlLoader(
  "../../../../graphql/mutation/products/deleteProduct.graphql"
);
const mutationUpdateProduct = graphqlLoader(
  "../../../../graphql/mutation/products/updateProduct.graphql"
);
const mutationUpdateProductCompanyCategory = graphqlLoader(
  "../../../../graphql/mutation/products/addProductToCategory.graphql"
);
const queryGetCategories = graphqlLoader(
  "../../../../graphql/query/getAllCompanyProductsCategories.graphql"
);
const queryProductReviews = graphqlLoader(
  "../../../../graphql/query/getProductReviews.graphql"
);

interface ProductsModalProps {
  visible: boolean; // if the modal is visible
  setVisible: (e) => void; // set the modal visible or not

  category?: string; // category of the products you want to create
  setDefaultCategory: (e) => void; // set the default category

  categoryList: any; // List of categories for the Select component

  updateProduct: any; // the products to update or null if you create one
  setUpdateProduct: (e) => void;

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

function ProductsModal(props: ProductsModalProps) {
  const companyId = localStorage.getItem("selectedCompany");

  const [form, setForm] = useState(null);

  const [createProductMutation] = useMutation(mutationCreateProduct, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  const [deleteProductMutation] = useMutation(mutationDeleteProduct, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  const [updateProductMutation] = useMutation(mutationUpdateProduct, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  const [updateProductCompanyCategory] = useMutation(
    mutationUpdateProductCompanyCategory,
    {
      refetchQueries: [
        {
          query: queryGetCategories,
          variables: { companyId: companyId },
        },
      ],
    }
  );

  const [
    loadReviews,
    { loading: loadingReviews, data: dataReviews, fetchMore: fetchMoreReviews },
  ] = useLazyQuery(queryProductReviews);

  useEffect(() => {
    if (props.updateProduct) {
      loadReviews({
        variables: {
          id: props.updateProduct.id,
          limit: 5,
          offset: 0,
        },
      });
    }
  }, [props.updateProduct, loadReviews]);

  function handleCancel() {
    props.setDefaultCategory("");
    props.setUpdateProduct(null);
    props.setVisible(false);
    form.resetFields();
  }

  function createProduct(values) {
    createProductMutation({
      variables: {
        name: values.name,
        description: values.description,
        companyProductsCategoryId:
          values.category === `nonCat${companyId}` ? null : values.category,
        price: values.price,
        quantityForUnit: values.quantityUnit,
        unitId: values.unit === "null" ? null : values.unit,
        companyId: companyId,
        coverId: values.cover,
      },
    })
      .then(() => {
        handleCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteProduct() {
    deleteProductMutation({
      variables: {
        productId: props.updateProduct.id,
      },
    })
      .then(() => {
        handleCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateProduct(values) {
    // TODO une seule mutation
    // TODO query pour supprimer un produit d'une cat via la modal
    if (values.category !== props.updateProduct.category) {
      updateProductCompanyCategory({
        variables: {
          categoryId:
            values.category === `nonCat${companyId}` ? null : values.category,
          productId: props.updateProduct.id,
        },
      }).catch((error) => {
        console.log(error);
      });
    }

    if (
      values.name !== props.updateProduct.name ||
      values.description !== props.updateProduct.description ||
      values.quantityUnit !== props.updateProduct.quantityUnit ||
      values.price !== props.updateProduct.price ||
      values.unit !==
        (props.updateProduct.unit !== null
          ? props.updateProduct.unit.id
          : "null") ||
      values.cover !==
        (props.updateProduct.cover.companyImage !== null
          ? props.updateProduct.cover.companyImage.id
          : null)
    ) {
      updateProductMutation({
        variables: {
          productId: props.updateProduct.id,
          name: values.name,
          description: values.description,
          unitId: values.unit === "null" ? null : values.unit,
          quantityForUnit: values.quantityUnit,
          price: values.price,
          coverId: values.cover === undefined ? null : values.cover,
        },
      }).catch((error) => {
        console.log(error);
      });
    }
    handleCancel();
  }

  function handleOk() {
    form.validateFields().then((values) => {
      if (props.updateProduct) {
        updateProduct(values);
      } else {
        createProduct(values);
      }
    });
  }

  const { t } = useTranslation("common");

  return (
    <Modal
      title={
        props.updateProduct
          ? t("ProductsPage.createProductModal.editModalName")
          : t("ProductsPage.createProductModal.modalName")
      }
      className={"modal-product"}
      visible={props.visible}
      closable={true}
      width={"45%"}
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={
        <div>
          {props.updateProduct && (
            <Popconfirm
              placement="bottom"
              title={t("ProductsPage.createProductModal.popUp.title")}
              onConfirm={() => {
                deleteProduct();
              }}
              okText={t("ProductsPage.createProductModal.popUp.yes")}
              cancelText={t("ProductsPage.createProductModal.popUp.no")}
            >
              <Button>
                {t("ProductsPage.createProductModal.buttons.delete")}
              </Button>
            </Popconfirm>
          )}
          <Button onClick={handleCancel}>
            {t("ProductsPage.createProductModal.buttons.cancel")}
          </Button>
          <Button onClick={handleOk} type={"primary"}>
            {props.updateProduct
              ? t("ProductsPage.createProductModal.buttons.edit")
              : t("ProductsPage.createProductModal.buttons.create")}
          </Button>
        </div>
      }
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Informations du produits" key="1">
          <ProductsForm
            setForm={setForm}
            confirm={handleOk}
            category={props.category}
            categoryList={props.categoryList}
            updateProduct={props.updateProduct}
            units={props.units}
          />
        </TabPane>
        <TabPane tab="Conseil d'utilisation" key="2">
          <ProductsAdvice
            setForm={setForm}
            confirm={handleOk}
            updateProduct={props.updateProduct}
          />
        </TabPane>
        {props.updateProduct !== null && !loadingReviews && dataReviews && (
          <TabPane tab="Avis des clients" key="3">
            <ProductsReviews
              updateProduct={props.updateProduct}
              reviews={dataReviews.getProductReviews}
              fetchMore={fetchMoreReviews}
              reload={loadReviews}
            />
          </TabPane>
        )}
      </Tabs>
    </Modal>
  );
}

export default ProductsModal;
