import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ReactComponent as CarretIcon } from "../../../../assets/Icon/ui/caret.svg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib";
import { Divider, Empty, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import { loader as graphqlLoader } from "graphql.macro";
import "../../../../assets/Style/Products/ProductsPage.less";
import { useMutation } from "@apollo/client";
import ProductCard from "./ProductCard";

const mutationDeleteCategory = graphqlLoader(
  "../../../../graphql/mutation/category/deleteCompanyProductCategory.graphql"
);
const queryGetCategories = graphqlLoader(
  "../../../../graphql/query/getAllCompanyProductsCategories.graphql"
);

interface CategoryProductsProps {
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
  height: isDraggingOver ? "200px" : null,
});

function CategoryProducts(props: CategoryProductsProps) {
  const { t } = useTranslation("common");

  const companyId = localStorage.getItem("selectedCompany");
  const collapsedCategory = JSON.parse(
    localStorage.getItem("collapsedCategory")
  );

  const [collapsed, setCollapsed] = useState(false);
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

  useEffect(() => {
    setCollapsed(false);
  }, [draggingOver]);

  useEffect(() => {
    if (collapsedCategory) {
      const indexLocalStorage = collapsedCategory.findIndex((elem) => {
        return elem === props.cat.id;
      });
      if (indexLocalStorage !== -1) {
        setCollapsed(true);
      }
    }
  }, [collapsedCategory, props.cat.id]);

  function handleCollapse() {
    if (collapsed) {
      setCollapsed(false);
      const indexLocalStorage = collapsedCategory.findIndex((elem) => {
        return elem === props.cat.id;
      });
      if (indexLocalStorage !== -1) {
        collapsedCategory.splice(indexLocalStorage, 1);
        localStorage.setItem(
          "collapsedCategory",
          JSON.stringify(collapsedCategory)
        );
      }
    } else {
      setCollapsed(true);
      collapsedCategory.push(props.cat.id);
      localStorage.setItem(
        "collapsedCategory",
        JSON.stringify(collapsedCategory)
      );
    }
  }

  return (
    <>
      <div
        className={`category ${collapsed === true ? "collapsed-category" : ""}`}
        style={getListStyle(draggingOver)}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Droppable
          droppableId={props.cat.id}
          direction={"horizontal"}
          key={props.cat.id}
        >
          {(provided, snapshot) => {
            setDraggingOver(snapshot.isDraggingOver);
            return (
              <div
                className={"droppable"}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  ref={provided.innerRef}
                  className={"category-title"}
                  onClick={handleCollapse}
                >
                  <CarretIcon
                    style={{
                      transform: collapsed ? null : "rotate(90deg)",
                      marginRight: "5px",
                    }}
                  />
                  {`${props.cat.name} (${props.cat.products.length})`}
                  <div
                    ref={provided.innerRef}
                    className={`category-title-icon ${
                      isHover === true ? "category-title-icon-isHover" : ""
                    }`}
                  >
                    <PlusCircleOutlined
                      className={"category-icon"}
                      onClick={(event) => {
                        props.ProductModal.setDefaultCategory(props.cat.id);
                        props.ProductModal.setVisible(true);
                        event.stopPropagation();
                      }}
                    />
                    {props.cat.id !== `nonCat${companyId}` && (
                      <EditOutlined
                        className={"category-icon"}
                        onClick={(event) => {
                          props.CategoryModal.setCategoryId(props.cat.id);
                          props.CategoryModal.setCategoryName(props.cat.name);
                          props.CategoryModal.setVisible(true);
                          event.stopPropagation();
                        }}
                      />
                    )}
                    {props.cat.id !== `nonCat${companyId}` && (
                      <Popconfirm
                        placement="top"
                        title={t("ProductsPage.deleteCategory.title")}
                        onConfirm={(event) => {
                          deleteCategory();
                          event.stopPropagation();
                        }}
                        onCancel={(event) => {
                          event.stopPropagation();
                        }}
                        okText={t("ProductsPage.deleteCategory.yes")}
                        cancelText={t("ProductsPage.deleteCategory.no")}
                      >
                        <DeleteOutlined
                          className={"category-icon red"}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      </Popconfirm>
                    )}
                  </div>
                </div>
                <div
                  ref={provided.innerRef}
                  className={`parent-list ${
                    collapsed === true ? "collapsed-list" : ""
                  }`}
                >
                  {props.cat.products.length !== 0 && (
                    <div
                      ref={provided.innerRef}
                      className={"card-list"}
                      style={{
                        height: snapshot.isDraggingOver ? "200px" : null,
                        width: props.cat.products.length * (250 + 24),
                      }}
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
                    <div ref={provided.innerRef} className={"empty-list"}>
                      <div
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          fontSize: "larger",
                        }}
                      >
                        <Empty
                          description={t("ProductsPage.noProductInCategory")}
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </Droppable>
      </div>
      <Divider />
    </>
  );
}

export default CategoryProducts;
