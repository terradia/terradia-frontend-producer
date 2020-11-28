import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons/lib";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Empty, Popconfirm, Tooltip } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import ProductCard from "../Grid/ProductCard";
import { useTranslation } from "react-i18next";

const mutationDeleteCategory = graphqlLoader(
  "../../../../graphql/mutation/category/deleteCompanyProductCategory.graphql"
);
const queryGetCategories = graphqlLoader(
  "../../../../graphql/query/getAllCompanyProductsCategories.graphql"
);

declare interface CategoryColumnProps {
  cat: { id: string; name: string; products: any };
  ProductModal: {
    setVisible: (e) => void;
    setDefaultCategory: (e) => void;
    setUpdateProduct: (e) => void;
  };
  CategoryModal?: {
    setVisible?: (e) => void;
    setCategoryId?: (e) => void;
    setCategoryName?: (e) => void;
  };
}

const getItemStyle = (isDragging, draggableStyle) => {
  return {
    userSelect: "none",
    ...draggableStyle,
  };
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#a3ee71" : null,
});

function CategoryColumn(props: CategoryColumnProps) {
  const companyId = localStorage.getItem("selectedCompany");

  const [draggingOver, setDraggingOver] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [deleteCategoryMutation] = useMutation(mutationDeleteCategory, {
    refetchQueries: [
      {
        query: queryGetCategories,
        variables: { companyId: companyId },
      },
    ],
  });

  function deleteCategory() {
    deleteCategoryMutation({
      variables: {
        categoryId: props.cat.id,
      },
    }).catch((error) => {
      console.log(error);
    });
  }

  const { t } = useTranslation("common");

  return (
    <div
      className={"column"}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Droppable
        droppableId={props.cat.id}
        direction={"vertical"}
        key={props.cat.id}
      >
        {(provided, snapshot) => {
          setDraggingOver(snapshot.isDraggingOver);
          return (
            <div
              className={"droppable-column"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div ref={provided.innerRef} className={"column-header"}>
                <div
                  className={"column-title"}
                >{`${props.cat.name} (${props.cat.products.length})`}</div>
                <div
                  ref={provided.innerRef}
                  className={`category-title-icon column-title-icon ${
                    isHover === true ? "category-title-icon-isHover" : ""
                  }`}
                >
                  <Tooltip
                    title={t("ProductsPage.tooltip.addProductToCategory")}
                  >
                    <PlusCircleOutlined
                      className={"category-icon"}
                      onClick={(event) => {
                        props.ProductModal.setDefaultCategory(props.cat.id);
                        props.ProductModal.setVisible(true);
                        event.stopPropagation();
                      }}
                    />
                  </Tooltip>
                  {props.cat.id !== `nonCat${companyId}` && (
                    <Tooltip title={t("ProductsPage.tooltip.editCategoryName")}>
                      <EditOutlined
                        className={"category-icon"}
                        onClick={(event) => {
                          props.CategoryModal.setCategoryId(props.cat.id);
                          props.CategoryModal.setCategoryName(props.cat.name);
                          props.CategoryModal.setVisible(true);
                          event.stopPropagation();
                        }}
                      />
                    </Tooltip>
                  )}
                  {props.cat.id !== `nonCat${companyId}` && (
                    <Popconfirm
                      placement="top"
                      title={"Voulez-vous vraiment supprimer cette catégorie?"}
                      onConfirm={(event) => {
                        deleteCategory();
                        event.stopPropagation();
                      }}
                      onCancel={(event) => {
                        event.stopPropagation();
                      }}
                      okText="Oui"
                      cancelText="Non"
                    >
                      <Tooltip title={t("ProductsPage.tooltip.deleteCategory")}>
                        <DeleteOutlined
                          className={"category-icon red"}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      </Tooltip>
                    </Popconfirm>
                  )}
                </div>
              </div>
              <div
                ref={provided.innerRef}
                className={"column-content"}
                style={getListStyle(draggingOver)}
              >
                {props.cat.products.length !== 0 && (
                  <div
                    ref={provided.innerRef}
                    className={"card-list-column"}
                    style={{ height: snapshot.isDraggingOver ? "200px" : null }}
                  >
                    {props.cat.products.map((product, index) => (
                      <Draggable
                        key={product.id}
                        draggableId={product.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <ProductCard
                              provided={provided}
                              snapshot={snapshot}
                              style={{
                                ...getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                ),
                              }}
                              onClick={() => {
                                product.category = props.cat.name;
                                props.ProductModal.setUpdateProduct(product);
                                props.ProductModal.setVisible(true);
                              }}
                              product={product}
                            />
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
                {props.cat.products.length === 0 && (
                  <div ref={provided.innerRef} className={"empty-list-board"}>
                    <Empty
                      description={t("ProductsPage.noProductInCategory")}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default CategoryColumn;
