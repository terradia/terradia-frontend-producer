import React from "react";
import "../assets/Style/Orders/Orders.less";
import { Tabs } from "antd";
import OrdersValidation from "../components/Orders/OrdersValidation";
import OrdersHistory from "../components/Orders/OrdersHistory";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const Orders = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab={t("OrderPage.newOrderTitle")} key="1">
          <OrdersValidation />
        </TabPane>
        <TabPane tab={t("OrderPage.historyTitle")} key="2">
          <OrdersHistory />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Orders;
