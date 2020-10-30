import React from "react";
import { Card, Drawer, Table, Tag } from "antd";
import "../../assets/Style/Orders/Orders.less";
import { useTranslation } from "react-i18next";
import { MoreOutlined } from "@ant-design/icons";
import { date } from "yup";

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

const OrdersHistory = (props: Props) => {
  const { t } = useTranslation("common");

  // const [statusOrder, setStatusOrder] = React.useState("");
  const [statusOrderId, setStatusOrderId] = React.useState("");
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({
    id: "",
    date: date,
    status: "",
    nbItems: 0,
  });

  const onCloseDrawer = (order) => {
    setStatusOrderId(order.id);
    // props.dataTable
    //   .filter((order) => order.status !== "approuved")
    //   .forEach((order) => {
    //     if (order.id === statusOrderId) {
    //       if (order.status !== statusOrder && statusOrder !== "") {
    //         order.status = statusOrder;
    //         notification.open({
    //           message: t("OrderPage.notification.title"),
    //           description: `${t(
    //             "OrderPage.notification.title"
    //           )} ${statusOrder}.`,
    //           duration: 3,
    //         });
    //       }
    //     }
    //   });
    console.log(statusOrderId);
    setOrderDetail(order);
    return visibleDrawer === true
      ? setVisibleDrawer(false)
      : setVisibleDrawer(true);
  };

  const moreDetails = (text, record) => {
    return (
      <div>
        <MoreOutlined rotate={90} onClick={() => onCloseDrawer(record)} />
      </div>
    );
  };

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
      case "refused":
        color = "volcano";
        break;
      default:
        color = "green";
        break;
    }
    return <Tag color={color}>{status}</Tag>;
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

  //Return price for one order
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

  //should give orderId to sum up the total
  const totalPriceOrder = () => {
    let totalPrice = 0;

    myItems.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
    return totalPrice;
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

  return (
    <Card
      className={"card"}
      title={<h2 className={"card-title"}>{t("OrderPage.historyTitle")}</h2>}
    >
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={props.dataTable.filter(
          (order) => order.status !== "approuved"
        )}
      />
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
  );
};

export default OrdersHistory;
