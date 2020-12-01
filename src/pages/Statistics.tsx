import React, { useState } from "react";
import { Card, Radio } from "antd";
import { loader as graphqlLoader } from "graphql.macro";
import "../assets/Style/Statistics/Statistics.less";
import StatisticCard from "../components/Statistics/StatisticCard";
import { useTranslation } from "react-i18next";
import TerradiaLoader from "../components/TerradiaLoader";
import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import StarReview from "../components/Review/StarReview";
import StatisticGraph from "../components/Statistics/StatisticGraph";

const getCompanyById = graphqlLoader("../graphql/query/getCompanyById.graphql");

const getCurrentOrders = graphqlLoader(
  "../graphql/query/orders/getCurrentOrders.graphql"
);

const getCompanyOrderHistories = graphqlLoader(
  "../graphql/query/orders/getCompanyOrderHistories.graphql"
);

const Statistics = () => {
  const { t } = useTranslation("common");
  const companyId = localStorage.getItem("selectedCompany");
  const { loading: loadingGetCompanyById, data: dataCompany } = useQuery(
    getCompanyById,
    {
      variables: { companyId },
      fetchPolicy: "cache-first",
    }
  );

  const { loading: loadingOrders, data: orders } = useQuery(getCurrentOrders, {
    variables: {
      companyId,
      fromDate: moment().subtract(31, "days").unix(),
      toDate: moment().unix(),
      limit: 100,
    },
  });

  const { loading: loadingOrderHistories, data: orderHistoriesData } = useQuery(
    getCompanyOrderHistories,
    {
      variables: { companyId },
    }
  );
  const [graphScope, setGraphScope] = useState("D");

  const onChange = (event) => {
    setGraphScope(event.target.value);
  };

  const getCurrentOrdersNumber = () => {
    return orders
      ? orders.getCurrentOrders
        ? orders.getCurrentOrders.length
        : 0
      : 0;
  };

  const getUniqueCustomer = () => {
    const uniqueCustomer = new Set(
      orders.getCurrentOrders.map((order) => order.customer.id)
    ).size;

    return uniqueCustomer;
  };

  const getAveragePrice = () => {
    let tmpTotalPrice = 0;
    let nbOrders = 0;
    let averagePrice = 0;

    if (orderHistoriesData)
      orderHistoriesData.getCompanyOrderHistories.forEach((order) => {
        tmpTotalPrice += order.price;
        nbOrders++;
      });
    else return;
    if (tmpTotalPrice && nbOrders !== 0)
      averagePrice = tmpTotalPrice / nbOrders;
    return Math.round((averagePrice + Number.EPSILON) * 100) / 100;
  };

  const getAverageProductsPerOrder = () => {
    let tmpNbProducts = 0;
    let nbOrders = 0;
    let averagePrice = 0;

    if (orderHistoriesData)
      orderHistoriesData.getCompanyOrderHistories.forEach((order) => {
        tmpNbProducts += order.numberProducts;
        nbOrders++;
      });
    if (tmpNbProducts || nbOrders !== 0)
      averagePrice = tmpNbProducts / nbOrders;
    return Math.round((averagePrice + Number.EPSILON) * 100) / 100;
  };

  if (loadingOrders || loadingGetCompanyById || loadingOrderHistories) {
    return <TerradiaLoader />;
  }
  return (
    <>
      <div className={"statistic-page"}>
        <div className={"head-statistics"}>
          <StatisticCard
            title={t("StatisticsPage.currentOrders")}
            number={getCurrentOrdersNumber()}
            description={t("StatisticsPage.currentOrdersDefinition")}
          />
          <StatisticCard
            title={t("StatisticsPage.uniqueClients")}
            number={getUniqueCustomer()}
            description={t("StatisticsPage.uniqueClientsDescription")}
          />
          {dataCompany && (
            <StarReview
              averageMark={dataCompany.getCompany.averageMark}
              numberOfMarks={dataCompany.getCompany.numberOfMarks}
            />
          )}
        </div>
        <Card
          title={t("StatisticsPage.completedOrders")}
          extra={
            <Radio.Group
              defaultValue="D"
              onChange={onChange}
              buttonStyle="solid"
            >
              <Radio.Button value="D">{t("StatisticsPage.week")}</Radio.Button>
              <Radio.Button value="MMM">
                {t("StatisticsPage.month")}
              </Radio.Button>
              {/*<Radio.Button value="YYYY">
                {t("StatisticsPage.year")}
              </Radio.Button>*/}
            </Radio.Group>
          }
          className={"statistic-card"}
        >
          <div className={"statistic-graph"}>
            {orderHistoriesData && (
              <StatisticGraph
                graphScope={graphScope}
                data={orderHistoriesData.getCompanyOrderHistories}
                fromDate={moment().subtract(1, "week").toDate()}
              />
            )}
          </div>
        </Card>
        <div className={"body-statistics"}>
          <StatisticCard
            title={t("StatisticsPage.averagePrice")}
            number={getAveragePrice()}
            description={t("StatisticsPage.averagePriceDefinition")}
          />
          <StatisticCard
            title={t("StatisticsPage.averageProductsInOrder")}
            number={getAverageProductsPerOrder()}
            description={t("StatisticsPage.averageProductsInOrderDescription")}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
