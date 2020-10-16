import React from "react";
import "../assets/Style/Orders/Orders.less";
import { Table, Radio, Drawer, notification, Card } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { date } from "yup";
import { useTranslation } from "react-i18next";
import Tag from "antd/es/tag";

const myArray = [
  {
    id: "0102030405",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 1,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 46,
  },
  {
    id: "101020344457",
    date: new Date("May 12, 08 04:20"),
    status: "payed",
    nbItems: 12,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 16,
  },
  {
    id: "01020306545",
    date: new Date("March 03, 12 04:20"),
    status: "delivered",
    nbItems: 2,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 146,
  },
  {
    id: "0102030407",
    date: new Date("March 13, 08 04:20"),
    status: "approuved",
    nbItems: 1,
    deliveryMode: "Pick up only", //"Stuart fourguon",
    totalPrice: 460,
  },
  {
    id: "0102030408",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 7,
    deliveryMode: "Pick up only", //"Stuart scooter",
    totalPrice: 46,
  },
  {
    id: "0102030409",
    date: new Date("March 21, 20 04:20"),
    status: "canceled",
    nbItems: 5,
    deliveryMode: "Pick up only", //"Stuart voiture",
    totalPrice: 45,
  },
  {
    id: "0102030410",
    date: new Date("March 31, 18 04:20"),
    status: "payed",
    nbItems: 12,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 6,
  },
];

const Orders = () => {
  const [statusOrder, setStatusOrder] = React.useState("");
  const [statusOrderId, setStatusOrderId] = React.useState("");
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({
    id: "",
    date: date,
    status: "",
    nbItems: 0,
  });
  let tmpRecord = [];

  const { t } = useTranslation("common");

  const onChange = (e) => {
    setStatusOrder(e.target.value);
  };

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

  const statusRenderer = (status) => {
    let color = "green";
    switch (status) {
      case "payed":
        color = "blue";
        break;
      case "delivered":
        color = "green";
        break;
      case "approuved":
        color = "lime";
        break;
      case "canceled":
        color = "red";
        break;
      default:
        color = "green";
        break;
    }
    return <Tag color={color}>{status}</Tag>;
  };

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

  //should give orderId to sum up the total
  const totalPriceOrder = () => {
    let totalPrice = 0;
    myItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });

    totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
    return totalPrice;
  };

  const orderDetailDrawer = () => {
    return (
      <div className={"order-page"}>
        <div>
          {tmpRecord && (
            <Radio.Group
              onChange={onChange}
              value={statusOrder}
              className={"order-detail-card"}
            >
              <Radio.Button className={"order-detail-card"} value={"approuved"}>
                {t("OrderPage.approuved")}
              </Radio.Button>
              <Radio.Button className={"order-detail-card"} value={"payed"}>
                {t("OrderPage.payed")}
              </Radio.Button>
              <Radio.Button className={"order-detail-card"} value={"delivered"}>
                {t("OrderPage.delivered")}
              </Radio.Button>
              <Radio.Button className={"order-detail-card"} value={"cancel"}>
                {t("OrderPage.cancel")}
              </Radio.Button>
            </Radio.Group>
          )}
        </div>
        <Table
          dataSource={myItems}
          columns={columnsOrder}
          pagination={false}
          rowKey={"id"}
        />
        <div className={"order-detail-total"}>
          <div className={"order-detail-total-left"}>
            <h2>Total</h2>
            <h2>{t("OrderPage.drawer.balanceDue")}</h2>
          </div>
          <div className={"order-detail-total-right"}>
            <p>{totalPriceOrder()}</p>
            <p>{totalPriceOrder()}</p>
          </div>
        </div>
      </div>
    );
  };

  const onCloseDrawer = (order) => {
    setStatusOrderId(order.id);
    myArray.forEach((order) => {
      if (order.id === statusOrderId) {
        if (order.status !== statusOrder && statusOrder !== "") {
          order.status = statusOrder;
          notification.open({
            message: t("OrderPage.notification.title"),
            description: `${t("OrderPage.notification.title")} ${statusOrder}.`,
            duration: 3,
          });
        }
      }
    });
    setOrderDetail(order);
    return visibleDrawer === true
      ? setVisibleDrawer(false)
      : setVisibleDrawer(true);
  };

  const moreDetails = (text, record) => {
    tmpRecord = record;
    return (
      <div>
        <MoreOutlined rotate={90} onClick={() => onCloseDrawer(record)} />
      </div>
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
      title: t("OrderPage.table.statut"),
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approuved",
          value: "approuved",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Payed",
          value: "payed",
        },
        {
          text: "Canceled",
          value: "canceled",
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: statusRenderer,
    },
    {
      title: t("OrderPage.table.itemNb"),
      dataIndex: "nbItems",
      key: "nbItems",
      sorter: (a, b) => a.nbItems - b.nbItems,
    },
    {
      title: t("OrderPage.table.deliveryMode"),
      dataIndex: "deliveryMode",
      key: "deliveryMode",
      sorter: (a, b) => a.deliveryMode - b.deliveryMode,
    },
    {
      title: t("OrderPage.table.price"),
      key: "price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: t("OrderPage.table.details"),
      dataIndex: "operation",
      render: moreDetails,
    },
  ];

  return (
    <>
      <Card
        className={"card"}
        title={<h2 className={"card-title"}>{t("OrderPage.historyTitle")}</h2>}
      >
        <Table columns={columns} rowKey={"id"} dataSource={myArray} />
        <Drawer
          title={`${t("OrderPage.drawer.title")} ${
            orderDetail ? (orderDetail.id ? orderDetail.id : null) : null
          }`}
          placement="right"
          onClose={onCloseDrawer}
          visible={visibleDrawer}
          width={1080}
        >
          <div>{orderDetailDrawer()}</div>
        </Drawer>
      </Card>
    </>
  );
};

export default Orders;
