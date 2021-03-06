import React, { useEffect, useState } from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";

import { Empty, Select, Radio, Card, Row, Col, Divider, Tooltip } from "antd";
import Button from "../components/Ui/Button";
import ProductsModal from "../components/Products/Modal/Product/ProductsModal";
import CategoryModal from "../components/Products/Modal/Category/CategoryModal";

import "../assets/Style/Products/ProductsPage.less";
import { ReactComponent as BoardIcon } from "../assets/Icon/ui/board.svg";
import { ReactComponent as GridIcon } from "../assets/Icon/ui/grid.svg";
import { ReactComponent as ListIcon } from "../assets/Icon/ui/list.svg";

import { PlusOutlined } from "@ant-design/icons/lib";
import { useTranslation } from "react-i18next";
import Grid from "../components/Products/Layout/Grid/Grid";
import Board from "../components/Products/Layout/Board/Board";
import List from "../components/Products/Layout/List/List";
import { MobileContext } from "../components/Layout/Layout";

const { Option } = Select;

const queryAllCompanyProductsCategories = graphqlLoader(
  "../graphql/query/getAllCompanyProductsCategories.graphql"
);
const queryAllUnits = graphqlLoader("../graphql/query/getAllUnits.graphql");

const Products = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const layoutProduct = localStorage.getItem("layoutProduct"); // 0 = Board | 1 = Grid | 2 = List
  const collaspedCategory = JSON.parse(
    localStorage.getItem("collapsedCategory")
  );

  useEffect(() => {
    if (!collaspedCategory) {
      localStorage.setItem("collapsedCategory", JSON.stringify([]));
    }
  }, [collaspedCategory]);

  const { t } = useTranslation("common");

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

  const [productVisible, setAddProductVisible] = useState(false); // visible for products modal
  const [categoryVisible, setCategoryVisible] = useState(false); // visible for new category modal
  const [updateProduct, setUpdateProduct] = useState(null); // products to update for the modal
  const [defaultCategory, setDefaultCategory] = useState(null); // default category when you open the products modal
  const [categoryToUpdate, setCategoryToUpdate] = useState(null); // categoryId to update
  const [categoryName, setCategoryName] = useState(null); // category.name to update
  const [productLayout, setProductLayout] = useState("grid");

  const categoryList = [];
  let indexNullCat = -1;

  if (dataCategories) {
    dataCategories.getAllCompanyProductsCategories.forEach((cat) => {
      categoryList.push(
        <Option key={cat.id} value={cat.id}>
          {cat.id !== `nonCat${companyId}`
            ? cat.name
            : "Produits non catégorisés"}
        </Option>
      );
    });
  }

  if (dataCategories) {
    indexNullCat = dataCategories.getAllCompanyProductsCategories.findIndex(
      (cat) => cat.id === `nonCat${companyId}`
    );
  }

  function handleChangeLayout(value) {
    setProductLayout(value);
    localStorage.setItem("layoutProduct", value);
  }

  useEffect(() => {
    if (
      layoutProduct &&
      (layoutProduct === "0" || layoutProduct === "1" || layoutProduct === "2")
    ) {
      setProductLayout(layoutProduct);
    } else {
      localStorage.setItem("layoutProduct", "1");
    }
  }, [layoutProduct]);

  return (
    <MobileContext.Consumer>
      {(isMobile) => {
        return (
          <div className={"product-page"}>
            <div className={"sub-header"}>
              <Row>
                <Col xs={24} md={12} className={"products-button"}>
                  <Button
                    className={"button"}
                    text={t("ProductsPage.buttons.createCategory")}
                    icon={<PlusOutlined />}
                    onClick={() => setCategoryVisible(true)}
                  />
                  <Button
                    className={"button"}
                    text={t("ProductsPage.buttons.createProduct")}
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setDefaultCategory(undefined);
                      setAddProductVisible(true);
                    }}
                  />
                </Col>
                {!isMobile && (
                  <Col xs={24} md={12} className={"product-layout"}>
                    <Radio.Group
                      value={productLayout}
                      onChange={(e) => {
                        handleChangeLayout(e.target.value);
                      }}
                      buttonStyle={"solid"}
                      style={{
                        background: "transparent",
                      }}
                    >
                      <Radio.Button value="0">
                        <Tooltip title={t("ProductsPage.View.board")}>
                          <BoardIcon
                            style={{
                              height: "20px",
                              width: "20px",
                              marginTop: "9px",
                            }}
                          />
                        </Tooltip>
                      </Radio.Button>
                      <Radio.Button value="1">
                        <Tooltip title={t("ProductsPage.View.grid")}>
                          <GridIcon
                            style={{
                              height: "20px",
                              width: "20px",
                              marginTop: "9px",
                            }}
                          />
                        </Tooltip>
                      </Radio.Button>
                      <Radio.Button value="2">
                        <Tooltip title={t("ProductsPage.View.list")}>
                          <ListIcon
                            style={{
                              height: "20px",
                              width: "20px",
                              marginTop: "9px",
                            }}
                          />
                        </Tooltip>
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                )}
              </Row>
            </div>
            <div
              className={`categories-list ${
                productLayout === "0" ? "board" : ""
              }`}
            >
              {!isMobile &&
                !loadingCategories &&
                dataCategories !== undefined &&
                !errorCategories &&
                dataCategories.getAllCompanyProductsCategories.length === 0 && (
                  <div className={"empty-card"}>
                    <Empty
                      description={t("ProductsPage.noProducts")}
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </div>
                )}
              {dataCategories !== undefined &&
                !errorCategories &&
                (isMobile || (!loadingCategories && productLayout === "0")) && (
                  <Board
                    data={dataCategories}
                    setAddProductVisible={setAddProductVisible}
                    setDefaultCategory={setDefaultCategory}
                    setUpdateProduct={setUpdateProduct}
                    setCategoryName={setCategoryName}
                    setCategoryToUpdate={setCategoryToUpdate}
                    setCategoryVisible={setCategoryVisible}
                    indexNullCat={indexNullCat}
                  />
                )}
              {!isMobile &&
                !loadingCategories &&
                dataCategories !== undefined &&
                !errorCategories &&
                productLayout === "1" && (
                  <Card>
                    <Grid
                      data={dataCategories}
                      setAddProductVisible={setAddProductVisible}
                      setDefaultCategory={setDefaultCategory}
                      setUpdateProduct={setUpdateProduct}
                      setCategoryName={setCategoryName}
                      setCategoryToUpdate={setCategoryToUpdate}
                      setCategoryVisible={setCategoryVisible}
                      indexNullCat={indexNullCat}
                    />
                  </Card>
                )}
              {!loadingCategories &&
                dataCategories !== undefined &&
                !errorCategories &&
                productLayout === "2" && (
                  <List
                    data={dataCategories}
                    indexNullCat={indexNullCat}
                    ProductModal={{
                      setVisible: setAddProductVisible,
                      setDefaultCategory: setDefaultCategory,
                      setUpdateProduct: setUpdateProduct,
                    }}
                    CategoryModal={{
                      setCategoryId: setCategoryToUpdate,
                      setCategoryName: setCategoryName,
                      setVisible: setCategoryVisible,
                    }}
                  />
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
            <Divider className={"invisible-divider padding-size"} />
          </div>
        );
      }}
    </MobileContext.Consumer>
  );
};

export default Products;
