import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import CategoryColumn from "./CategoryColumn";

import "../../../../assets/Style/Products/Board.less";
import { useMutation } from "@apollo/client";
import { loader as graphqlLoader } from "graphql.macro";

declare interface BoardProps {
  data: any; // to modifiy
  setAddProductVisible: (e) => void;
  setDefaultCategory: (e) => void;
  setUpdateProduct: (e) => void;
  setCategoryVisible: (e) => void;
  setCategoryToUpdate: (e) => void;
  setCategoryName: (e) => void;
  indexNullCat: number;
}

const mutationUpdateProductsPosition = graphqlLoader(
  "../../../../graphql/mutation/products/updateProductsPositions.graphql"
);

const queryAllCompanyProductsCategories = graphqlLoader(
  "../../../../graphql/query/getAllCompanyProductsCategories.graphql"
);

function Board(props: BoardProps) {
  const companyId = localStorage.getItem("selectedCompany");

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

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function updatePosition( // update position of products
    sameCategory: boolean,
    source: { indexCat: number; indexCard: number; categoryId?: string },
    destination?: { indexCat: number; indexCard: number; categoryId: string }
  ) {
    const idCardMoved =
      props.data.getAllCompanyProductsCategories[destination.indexCat].products[
        destination.indexCard
      ].id;
    const modifiedList = []; // List to send to back
    for (
      let i = source.indexCard;
      i <
      props.data.getAllCompanyProductsCategories[source.indexCat].products
        .length;
      i++
    ) {
      props.data.getAllCompanyProductsCategories[source.indexCat].products[
        i
      ].position = i;

      modifiedList.push({
        productId:
          props.data.getAllCompanyProductsCategories[source.indexCat].products[
            i
          ].id,
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
        props.data.getAllCompanyProductsCategories[destination.indexCat]
          .products.length;
        i++
      ) {
        type = null;
        props.data.getAllCompanyProductsCategories[
          destination.indexCat
        ].products[i].position = i;
        if (
          props.data.getAllCompanyProductsCategories[destination.indexCat]
            .products[i].id === idCardMoved
        ) {
          if (source.categoryId === `nonCat${companyId}`) {
            type = "addCategory";
            categoryId = destination.categoryId;
          } else if (destination.categoryId === `nonCat${companyId}`) {
            type = "deleteCategory";
          } else {
            type = "moveCategory";
            categoryId = destination.categoryId;
          }
        }
        modifiedList.push({
          productId:
            props.data.getAllCompanyProductsCategories[destination.indexCat]
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
      const index = props.data.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === source.droppableId
      );

      props.data.getAllCompanyProductsCategories[index].products = reorder(
        props.data.getAllCompanyProductsCategories[index].products,
        source.index,
        destination.index
      );
      updatePosition(true, { indexCat: index, indexCard: source.index });
    } else {
      // move in different category
      const indexSrc = props.data.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === source.droppableId
      );
      const indexDest = props.data.getAllCompanyProductsCategories.findIndex(
        (cat) => cat.id === destination.droppableId
      );
      const result = move(
        props.data.getAllCompanyProductsCategories[indexSrc].products,
        props.data.getAllCompanyProductsCategories[indexDest].products,
        source,
        destination
      );

      props.data.getAllCompanyProductsCategories[indexSrc].products = result[0];
      props.data.getAllCompanyProductsCategories[indexDest].products =
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
    <DragDropContext onDragEnd={onDragEnd}>
      {props.indexNullCat !== -1 && (
        <CategoryColumn
          cat={{
            id:
              props.data.getAllCompanyProductsCategories[props.indexNullCat].id,
            name: "Produits non catégorisés",
            products:
              props.data.getAllCompanyProductsCategories[props.indexNullCat]
                .products,
          }}
          ProductModal={{
            setVisible: props.setAddProductVisible,
            setDefaultCategory: props.setDefaultCategory,
            setUpdateProduct: props.setUpdateProduct,
          }}
          CategoryModal={{
            setVisible: props.setCategoryVisible,
            setCategoryId: props.setCategoryToUpdate,
            setCategoryName: props.setCategoryName,
          }}
        />
      )}
      {props.data.getAllCompanyProductsCategories.map((cat) => {
        if (cat.id !== `nonCat${companyId}`) {
          return (
            <CategoryColumn
              key={cat.id}
              cat={cat}
              ProductModal={{
                setVisible: props.setAddProductVisible,
                setDefaultCategory: props.setDefaultCategory,
                setUpdateProduct: props.setUpdateProduct,
              }}
              CategoryModal={{
                setVisible: props.setCategoryVisible,
                setCategoryId: props.setCategoryToUpdate,
                setCategoryName: props.setCategoryName,
              }}
            />
          );
        }
        return null;
      })}
    </DragDropContext>
  );
}

export default Board;
