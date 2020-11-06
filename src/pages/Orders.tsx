import React from "react";
import "../assets/Style/Orders/Orders.less";
import { Tabs } from "antd";
import OrdersValidation from "../components/Orders/OrdersValidation";
import OrdersHistory from "../components/Orders/OrdersHistory";

const { TabPane } = Tabs;

const Orders = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          <OrdersValidation />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <OrdersHistory />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Orders;
