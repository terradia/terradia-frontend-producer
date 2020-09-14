import React from "react";
import "../../../../assets/Style/Products/List.less";

import { Alert } from "antd";
import CategoryTable from "./CategoryTable";

declare interface ListProps {
  data: any; // to modify
  indexNullCat: number;
  ProductModal: {
    setVisible: (e) => void;
    setDefaultCategory: (e) => void;
    setUpdateProduct: (e) => void;
  };
}

// TODO: mettre les Table dans un composant enfant!

function List(props: ListProps) {
  const companyId = localStorage.getItem("selectedCompany");

  return (
    <div>
      <Alert
        message="Dans l'affichage sous forme de liste, l'ordre des produits n'est pas l'ordre affiché pour les clients"
        type="info"
        closable={true}
        style={{ marginBottom: "20px" }}
      />
      {props.indexNullCat !== -1 && (
        <CategoryTable
          key={
            props.data.getAllCompanyProductsCategories[props.indexNullCat].id
          }
          cat={{
            id:
              props.data.getAllCompanyProductsCategories[props.indexNullCat].id,
            name: "Produits non catégorisés",
            products:
              props.data.getAllCompanyProductsCategories[props.indexNullCat]
                .products,
          }}
          ProductModal={{
            setVisible: props.ProductModal.setVisible,
            setDefaultCategory: props.ProductModal.setDefaultCategory,
            setUpdateProduct: props.ProductModal.setUpdateProduct,
          }}
        />
      )}
      {props.data.getAllCompanyProductsCategories.map((cat) => {
        if (cat.id !== `nonCat${companyId}`) {
          return (
            <CategoryTable
              key={cat.id}
              cat={cat}
              ProductModal={props.ProductModal}
            />
          );
        }
      })}
    </div>
  );
}

export default List;
