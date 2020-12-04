import React from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { Card, Table, Tag } from "antd";
import "../../assets/Style/Orders/Orders.less";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/react-hooks";
import TerradiaLoader from "../TerradiaLoader";
import moment from "moment";

const getCompanyOrderHistories = graphqlLoader(
  "../../graphql/query/orders/getCompanyOrderHistories.graphql"
);

const OrdersHistory = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const { t } = useTranslation("common");

  const {
    loading: loadingOrders,
    error: errorOrders,
    data: ordersData,
  } = useQuery(getCompanyOrderHistories, {
    variables: { companyId, limit: 100 },
  });

  const statusRenderer = (status) => {
    let translateStatus = status;
    let color = "blue";
    switch (status) {
      case "FINISHED":
        translateStatus = t("OrderPage.table.status.finished");
        color = "blue";
        break;
      case "DECLINED":
        translateStatus = t("OrderPage.table.status.declined");
        color = "volcano";
        break;
      case "CANCELED":
        translateStatus = t("OrderPage.table.status.canceled");
        color = "red";
        break;
      default:
        color = "blue";
        break;
    }
    return <Tag color={color}>{translateStatus}</Tag>;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "code",
      key: "#",
    },
    {
      title: t("OrderPage.table.date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt ? moment(createdAt).format("DD MMM YYYY - HH:mm") : null,
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: t("OrderPage.table.statut"),
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: t("OrderPage.table.status.finished"),
          value: "FINISHED",
        },
        {
          text: t("OrderPage.table.status.declined"),
          value: "DECLINED",
        },
        {
          text: t("OrderPage.table.status.canceled"),
          value: "CANCELED",
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: statusRenderer,
    },
    {
      title: t("OrderPage.table.itemNb"),
      dataIndex: "numberProducts",
      key: "numberProducts",
      sorter: (a, b) => a.numberProducts - b.numberProducts,
    },
    {
      title: t("OrderPage.table.price"),
      key: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => Math.round((price + Number.EPSILON) * 100) / 100,
    },
  ];

  const columnsOrder = [
    {
      title: t("OrderPage.drawer.table.item"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("OrderPage.drawer.table.quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("OrderPage.drawer.table.quantityForUnit"),
      dataIndex: "product",
      key: "product",
      render: (text, product) =>
        `${product.quantityForUnit} €/${
          product.unit.notation ? product.unit.notation : "Pièce"
        }`,
    },
    {
      title: t("OrderPage.drawer.table.price"),
      dataIndex: "price",
      key: "price",
    },
  ];

  const expandedDetails = (record) => {
    return (
      <>
        <Table
          dataSource={record ? record.products : console.log(errorOrders)}
          columns={columnsOrder}
          pagination={false}
          rowKey={"id"}
        />
      </>
    );
  };

  if (loadingOrders) return <TerradiaLoader />;
  return (
    <Card
      className={"card"}
      title={<h2 className={"card-title"}>{t("OrderPage.historyTitle")}</h2>}
    >
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={
          ordersData
            ? ordersData.getCompanyOrderHistories
            : console.log(errorOrders)
        }
        expandable={{
          defaultExpandAllRows: false,
          expandedRowRender: (record) => expandedDetails(record),
        }}
      />
    </Card>
  );
};

export default OrdersHistory;
