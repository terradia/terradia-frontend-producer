import React from "react";
import "../assets/Style/Orders/Orders.less";
import { Table, Radio, Drawer, notification } from "antd";
import Title from "../components/Ui/Title";
import { MoreOutlined } from "@ant-design/icons";
import { date } from "yup";
import { useTranslation } from "react-i18next";

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
      price: 3.5,
    },
    {
      id: "02",
      name: "haricot",
      quantity: 4,
      price: 2.5,
    },
    {
      id: "03",
      name: "champignon",
      quantity: 4,
      price: 2.5,
    },
    {
      id: "04",
      name: "courgette",
      quantity: 4,
      price: 2.5,
    },
    {
      id: "05",
      name: "tomate-cerise",
      quantity: 14,
      price: 1.75,
    },
  ];

  const totalPrice = () => {
    let tmpTotalPrice = 0;
    return (
      <div>
        {myItems
          ? myItems.map((element) => {
              tmpTotalPrice = tmpTotalPrice + element.quantity * element.price;
              return (
                Math.round(
                  (element.quantity * element.price + Number.EPSILON) * 100
                ) / 100
              );
            })
          : null}
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
            <p>65.5 €</p>
            <p>65.5 €</p>
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
    <div className={"order-page"}>
      <Title title={t("OrderPage.title")} />
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
    </div>
  );
};

export default Orders;
