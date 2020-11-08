import React, { useEffect, useState } from "react";
import { Popconfirm, Rate, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons/lib";
import { useTranslation } from "react-i18next";
import { Product } from "../../../../interfaces/Product";

declare interface CategoryTableProps {
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

const columns = [
  {
    title: "Nom",
    dataIndex: "name",
    width: "15%",
    filterMultiple: false,
    sorter: (a, b) => {
      const atest = a.name.toLowerCase();
      const btest = b.name.toLowerCase();
      return atest.localeCompare(btest);
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "20%",
    // eslint-disable-next-line react/display-name
    render: (text) => (
      <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        {text.length > 50 ? text.substr(0, 50) + "..." : text}
      </div>
    ),
  },
  {
    title: "Prix",
    dataIndex: "price",
    filterMultiple: false,
    sorter: (a, b) => a.price - b.price,
    render: (price) => {
      return `${Math.round(price * 100) / 100}€`;
    },
  },
  {
    title: "Portion",
    // eslint-disable-next-line react/display-name
    render: (product: Product) => {
      return (
        <div>
          {product.quantityForUnit}
          {product.unit !== null ? product.unit.notation : "Pièce(s)"}
        </div>
      );
    },
  },
  {
    title: "Note moyenne",
    // eslint-disable-next-line react/display-name
    render: (product: Product) => {
      return <Rate disabled allowHalf value={product.averageMark} />;
    },
  },
  {
    title: "Image",
    dataIndex: "cover",
    // eslint-disable-next-line react/display-name
    render: (cover: any) => {
      if (cover) {
        return (
          <img
            alt={
              "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
              cover.companyImage.filename
            }
            src={
              "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
              cover.companyImage.filename
            }
            style={{ height: "100px", width: "100px", objectFit: "contain" }}
          />
        );
      }
      return null;
    },
  },
];

function CategoryTable(props: CategoryTableProps) {
  const companyId = localStorage.getItem("selectedCompany");

  const [isHover, setIsHover] = useState(false);

  const displayScroll = props.cat.products.length > 5 ? 240 : undefined;

  const { t } = useTranslation("common");

  return (
    <div
      key={props.cat.id}
      className={"table-product"}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Table
        sortDirections={["descend", "ascend"]}
        rowKey={"id"}
        columns={columns}
        dataSource={props.cat.products}
        scroll={{ y: displayScroll, scrollToFirstRowOnChange: true }}
        className={"product-table"}
        locale={{
          emptyText: t("ProductsPage.noProductInCategory"),
        }}
        title={() => (
          <div className={"category-title"}>
            {props.cat.name}
            <div
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
                    alert("modify");
                    // props.CategoryModal.setCategoryId(props.props.cat.id);
                    // props.CategoryModal.setCategoryName(props.props.cat.name);
                    // props.CategoryModal.setVisible(true);
                    event.stopPropagation();
                  }}
                />
              )}
              {props.cat.id !== `nonCat${companyId}` && (
                <Popconfirm
                  placement="top"
                  title={"Voulez-vous vraiment supprimer cette catégorie?"}
                  onConfirm={(event) => {
                    alert("Oui");
                    // deleteCategory();
                    event.stopPropagation();
                  }}
                  onCancel={(event) => {
                    event.stopPropagation();
                  }}
                  okText="Oui"
                  cancelText="Non"
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
        )}
        key={props.cat.id}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              record.category = props.cat.name;
              props.ProductModal.setUpdateProduct(record);
              props.ProductModal.setVisible(true);
            },
          };
        }}
      />
    </div>
  );
}

export default CategoryTable;
