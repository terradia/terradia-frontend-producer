import React, { useState } from "react";
import { Popconfirm, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons/lib";

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
    width: "20%",
    filterMultiple: false,
    sorter: (a, b) => {
      const atest = a.name.toLowerCase();
      const btest = b.name.toLowerCase();
      return atest.localeCompare(btest);
    },
  },
  {
    title: "Prix (en €)",
    dataIndex: "price",
    width: "20%",
    filterMultiple: false,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "20%",
    // eslint-disable-next-line react/display-name
    render: (text) => (
      <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
        {text}
      </div>
    ),
  },
  {
    title: "Portion",
    width: "20%",
    // eslint-disable-next-line react/display-name
    render: (product: any) => {
      return (
        <div>
          {product.quantityForUnit}{" "}
          {product.unit !== null ? product.unit.notation : "Pièce(s)"}
        </div>
      );
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
            style={{ height: "50px", width: "50px" }}
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
                    className={"category-icon"}
                    style={{ color: "red" }}
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
