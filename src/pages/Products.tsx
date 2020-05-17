import React, { useState } from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { Empty, Select } from "antd";
import Button from "../components/Ui/Button";
import CategoryProducts from "../components/Products/CategoryProducts";
import ProductsModal from "../components/Products/Modal/Product/ProductsModal";
import CategoryModal from "../components/Products/Modal/Category/CategoryModal";

import "../assets/Style/Products/ProductsPage.less";
import { DragDropContext } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons/lib";

const { Option } = Select;

const queryAllCompanyProductsCategories = graphqlLoader(
  "../graphql/query/getAllCompanyProductsCategories.graphql"
);
const queryAllUnits = graphqlLoader("../graphql/query/getAllUnits.graphql");
const mutationUpdateProductsPosition = graphqlLoader(
  "../graphql/mutation/products/updateProductsPositions.graphql"
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[0] = sourceClone;
  result[1] = destClone;

  return result;
};

const Products = () => {
  const companyId = localStorage.getItem("selectedCompany");

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(queryAllCompanyProductsCategories, {
    variables: { companyId: companyId },
  });

  const {
    loading: loadingUnits,
    error: errorUnits,
    data: dataUnits,
  } = useQuery(queryAllUnits, {
    variables: { ref: false },
  });

  const [updateProductsPositions] = useMutation(
    mutationUpdateProductsPosition,
    {
      refetchQueries: [
        {
          query: queryAllCompanyProductsCategories,
          variables: { companyId: companyId },
        },
      ],
    }
  );

  const [productVisible, setAddProductVisible] = useState(false); // visible for products modal
  const [categoryVisible, setCategoryVisible] = useState(false); // visible for new category modal
  const [updateProduct, setUpdateProduct] = useState(null); // products to update for the modal
  const [defaultCategory, setDefaultCategory] = useState(null); // default category when you open the products modal
  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // categoryId to update
  const [categoryName, setCategoryName] = useState(null); // category.name to update

  const categoryList = [];
  let indexNullCat = -1;

  if (!loadingCategories && dataCategories) {
    // TODO a supprimer et a faire en back
    dataCategories.getAllCompanyProductsCategories.forEach((cat, index) => {
      dataCategories.getAllCompanyProductsCategories[index].products.sort(
        (a: any, b: any) => {
          if (a.position > b.position) {
            return 1;
          } else if (a.position === b.position) {
            return 0;
          } else {
            return -1;
          }
        }
      );
      categoryList.push(
        <Option key={cat.id} value={cat.id}>
          {cat.name}
        </Option>
      );
    });
    indexNullCat = dataCategories.getAllCompanyProductsCategories.findIndex(
      (cat) => cat.id === `nonCat${companyId}`
    );
  }

  function updatePosition( // update position of products
    sameCategory: boolean,
    source: { indexCat: number; indexCard: number; categoryId?: string },
    destination?: { indexCat: number; indexCard: number; categoryId: string }
  ) {
    const modifiedList = []; // List to send to back
    for (
      let i = source.indexCard;
      i <
      dataCategories.getAllCompanyProductsCategories[source.indexCat].products
        .length;
      i++
    ) {
      dataCategories.getAllCompanyProductsCategories[source.indexCat].products[
        i
      ].position = i;

      modifiedList.push({
        productId:
          dataCategories.getAllCompanyProductsCategories[source.indexCat]
            .products[i].id,
        position: i,
        type: null,
        categoryId: null,
      });
    }

    if (!sameCategory) {
      let type = null;
      let categoryId = null;
      for (
        let i = destination.indexCard;
        i <
        dataCategories.getAllCompanyProductsCategories[destination.indexCat]
          .products.length;
        i++
      ) {
        dataCategories.getAllCompanyProductsCategories[
          destination.indexCat
        ].products[i].position = i;
        if (source.categoryId === `nonCat${companyId}`) {
          type = "addCategory";
          categoryId = destination.categoryId;
        } else if (destination.categoryId === `nonCat${companyId}`) {
          type = "deleteCategory";
        } else {
          type = "moveCategory";
          categoryId = destination.categoryId;
        }
        modifiedList.push({
          productId:
            dataCategories.getAllCompanyProductsCategories[destination.indexCat]
              .products[i].id,
          position: i,
          type: type,
          categoryId: categoryId,
        });
      }
    }
    updateProductsPositions({
      variables: {
        productsPositions: modifiedList,
      },
    }).catch((error) => {
      console.log(error);
    });
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // move in same category
      const index = dataCategories.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === source.droppableId
      );

      dataCategories.getAllCompanyProductsCategories[index].products = reorder(
        dataCategories.getAllCompanyProductsCategories[index].products,
        source.index,
        destination.index
      );
      updatePosition(true, { indexCat: index, indexCard: source.index });
    } else {
      // move in different category
      const indexSrc = dataCategories.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === source.droppableId
      );
      const indexDest = dataCategories.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === destination.droppableId
      );
      const result = move(
        dataCategories.getAllCompanyProductsCategories[indexSrc].products,
        dataCategories.getAllCompanyProductsCategories[indexDest].products,
        source,
        destination
      );

      dataCategories.getAllCompanyProductsCategories[indexSrc].products =
        result[0];
      dataCategories.getAllCompanyProductsCategories[indexDest].products =
        result[1];
      updatePosition(
        false,
        {
          indexCat: indexSrc,
          indexCard: source.index,
          categoryId: source.droppableId,
        },
        {
          indexCat: indexDest,
          indexCard: destination.index,
          categoryId: destination.droppableId,
        }
      );
    }
  }

  return (
    <div className={"product-page"}>
      <div className={"sub-header"}>
        <Button
          className={"button"}
          text={"Créer une catégorie"}
          icon={<PlusOutlined />}
          onClick={() => setCategoryVisible(true)}
        />
        <Button
          className={"button"}
          text={"Créer un produit"}
          icon={<PlusOutlined />}
          onClick={() => {
            setDefaultCategory(undefined);
            setAddProductVisible(true);
          }}
        />
      </div>
      <div className={"categories-list"}>
        {(!dataCategories ||
          dataCategories.getAllCompanyProductsCategories.length === 0) && (
          <div className={"empty-card"}>
            <Empty
              description={"Pour le moment, il n'y a aucun produit à lister"} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
        {!loadingCategories &&
          dataCategories !== undefined &&
          !errorCategories && (
            <DragDropContext onDragEnd={onDragEnd}>
              {indexNullCat !== -1 && (
                <CategoryProducts
                  cat={{
                    id:
                      dataCategories.getAllCompanyProductsCategories[
                        indexNullCat
                      ].id,
                    name: "Produits non catégorisés",
                    products:
                      dataCategories.getAllCompanyProductsCategories[
                        indexNullCat
                      ].products,
                  }}
                  ProductModal={{
                    setVisible: setAddProductVisible,
                    setDefaultCategory,
                    setUpdateProduct: setUpdateProduct,
                  }}
                />
              )}
              {dataCategories.getAllCompanyProductsCategories.map((cat) => {
                if (cat.id !== `nonCat${companyId}`) {
                  return (
                    <CategoryProducts
                      key={cat.id}
                      cat={cat}
                      ProductModal={{
                        setVisible: setAddProductVisible,
                        setDefaultCategory,
                        setUpdateProduct: setUpdateProduct,
                      }}
                      CategoryModal={{
                        setVisible: setCategoryVisible,
                        setCategoryId: setCategoryToUpdate,
                        setCategoryName: setCategoryName,
                      }}
                    />
                  );
                }
                return null;
              })}
            </DragDropContext>
          )}
      </div>
      {!loadingUnits && !errorUnits && (
        <ProductsModal
          visible={productVisible}
          category={defaultCategory}
          setVisible={setAddProductVisible}
          setDefaultCategory={setDefaultCategory}
          categoryList={categoryList}
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
          units={dataUnits.getAllUnits}
        />
      )}
      <CategoryModal
        visible={categoryVisible}
        setVisible={setCategoryVisible}
        categoryId={categoryToUpdate}
        categoryName={categoryName}
      />
    </div>
  );
};

export default Products;
