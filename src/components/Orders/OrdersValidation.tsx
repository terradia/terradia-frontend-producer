import React from "react";
import { Button, Card, Row, Table } from "antd";
import "../../assets/Style/Orders/Orders.less";
import { useTranslation } from "react-i18next";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";
import Popconfirm from "antd/es/popconfirm";

interface ItemData {
  id: string;
  date: Date;
  status: string;
  nbItems: number;
  totalPrice: number;
}

interface Props {
  dataTable: ItemData[];
}

const myItems = [
  {
    id: "01",
    name: "Tomates grappes",
    quantity: 3,
    price: 2,
  },
  {
    id: "02",
    name: "haricot",
    quantity: 4,
    price: 1.03,
  },
  {
    id: "03",
    name: "champignon",
    quantity: 5,
    price: 2,
  },
  {
    id: "04",
    name: "courgette",
    quantity: 6,
    price: 3,
  },
  {
    id: "05",
    name: "tomate-cerise",
    quantity: 7,
    price: 1,
  },
];

const OrdersValidation = (props: Props) => {
  const { t } = useTranslation("common");

  const actions = () => {
    return (
      <Row>
        <Tooltip placement="top" title={t("OrderPage.newOrder.acceptOrder")}>
          <Button
            type={"link"}
            // onClick={() => onAccept()}
            icon={<CheckCircleOutlined />}
          />
        </Tooltip>
        <Tooltip placement="top" title={t("OrderPage.newOrder.declineOrder")}>
          <Popconfirm
            placement="bottom"
            title={t("OrderPage.newOrder.areYouSure")}
            // onConfirm={(event) => {
            //   handleRefuseOrder();
            //   event.stopPropagation();
            // // }}
            // onCancel={(event) => {
            //   event.stopPropagation();
            // }}
            okText="Oui"
            cancelText="Non"
          >
            <Button
              type={"link"}
              // onClick={() => onDecline()}
              danger
              icon={<CloseCircleOutlined />}
            />
          </Popconfirm>
        </Tooltip>
      </Row>
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "#",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.toDateString(),
    },
    {
      title: t("OrderPage.table.itemNb"),
      dataIndex: "nbItems",
      key: "nbItems",
      sorter: (a, b) => a.nbItems - b.nbItems,
    },
    {
      title: t("OrderPage.table.price"),
      key: "price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: t("OrderPage.table.operations"),
      dataIndex: "operation",
      render: actions,
    },
  ];

  const totalPrice = (weird, item) => {
    return (
      <div>
        <p>
          {Math.round((item.quantity * item.price + Number.EPSILON) * 100) /
            100}
        </p>
      </div>
    );
  };

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
      title: t("OrderPage.drawer.table.price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("OrderPage.drawer.table.total"),
      dataIndex: "total",
      key: "total",
      render: totalPrice,
    },
  ];
  return (
    <Card
      className={"card"}
      title={<h2 className={"card-title"}>{t("OrderPage.newOrderTitle")}</h2>}
    >
      {props.dataTable && (
        <Table
          columns={columns}
          rowKey={"id"}
          expandable={{
            defaultExpandAllRows: false,
            expandedRowRender: () => (
              <>
                <Table
                  dataSource={myItems}
                  columns={columnsOrder}
                  pagination={false}
                  rowKey={"id"}
                />
              </>
            ),
          }}
          dataSource={props.dataTable.filter(
            (order) => order.status === "approuved"
          )}
        />
      )}
    </Card>
  );
};

export default OrdersValidation;
