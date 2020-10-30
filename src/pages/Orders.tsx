import React from "react";
import "../assets/Style/Orders/Orders.less";
import { Tabs } from "antd";
import OrdersValidation from "../components/Orders/OrdersValidation";
import OrdersHistory from "../components/Orders/OrdersHistory";

const myArray = [
  {
    id: "0102030405",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 1,
    totalPrice: 46,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "101020344457",
    date: new Date("May 12, 08 04:20"),
    status: "payed",
    nbItems: 12,
    totalPrice: 16,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "01020306545",
    date: new Date("March 03, 12 04:20"),
    status: "delivered",
    nbItems: 2,
    totalPrice: 146,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "0102030407",
    date: new Date("March 13, 08 04:20"),
    status: "approuved",
    nbItems: 1,
    totalPrice: 460,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "0102030408",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 7,
    totalPrice: 46,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "0102030409",
    date: new Date("March 21, 20 04:20"),
    status: "canceled",
    nbItems: 5,
    totalPrice: 45,
    products: [
      {
        id: "01",
        name: "Tomates grappes",
        quantity: 3,
        price: 2,
      },
    ],
  },
  {
    id: "0102030410",
    date: new Date("March 31, 18 04:20"),
    status: "refused",
    nbItems: 12,
    products: [
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
    ],
    totalPrice: 6,
  },
];

const { TabPane } = Tabs;

const Orders = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          <OrdersHistory dataTable={myArray} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <OrdersValidation dataTable={myArray} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Orders;
