import React, { useState } from "react";
import { Modal } from "antd";
import CategoryForm from "./CategoryForm";
import "../../../../assets/Style/Products/Modal/ProductsModal.less";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";

const mutationCreateCategory = graphqlLoader(
  "../../../../graphql/mutation/category/createCompanyProductsCategory.graphql"
);
const mutationUpdateCompany = graphqlLoader(
  "../../../../graphql/mutation/category/updateCompanyProductCategory.graphql"
);
const queryGetCategories = graphqlLoader(
  "../../../../graphql/query/getAllCompanyProductsCategories.graphql"
);

interface CategoryModalProps {
  visible: boolean;
  setVisible: any;
  categoryId?: string;
  categoryName?: string;
}

function CategoryModal(props: CategoryModalProps) {
  const companyId = localStorage.getItem("selectedCompany");

  const [addCategory] = useMutation(mutationCreateCategory, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  const [updateCategoryMutation] = useMutation(mutationUpdateCompany, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  const [form, setForm] = useState(null);

  function createProduct(values) {
    addCategory({
      variables: {
        companyId: companyId,
        name: values.name,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        props.setVisible(false);
      });
  }

  function updateCategory(values) {
    updateCategoryMutation({
      variables: {
        category: props.categoryId,
        name: values.name,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        props.setVisible(false);
      });
  }

  function handleCancel() {
    props.setVisible(false);
  }

  function handleOk() {
    if (props.categoryId) {
      form.validateFields().then((values) => {
        form.resetFields();
        updateCategory(values);
      });
    } else {
      form.validateFields().then((values) => {
        form.resetFields();
        createProduct(values);
      });
    }
  }

  return (
    <Modal
      title={
        props.categoryId
          ? "Modifier une catégorie"
          : "Créer un nouvelle catégorie"
      }
      className={"modal-product"}
      visible={props.visible}
      closable={true}
      width={"45%"}
      destroyOnClose={true}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <CategoryForm
        setForm={setForm}
        confirm={handleOk}
        categoryName={props.categoryName}
      />
    </Modal>
  );
}

export default CategoryModal;
