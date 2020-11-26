import React, { useState } from "react";
import { Card, Radio } from "antd";
import { loader as graphqlLoader } from "graphql.macro";

import "../assets/Style/Statistics/Statistics.less";
import StatisticCard from "../components/Statistics/StatisticCard";
import { useTranslation } from "react-i18next";
import TerradiaLoader from "../components/TerradiaLoader";
import moment from "moment";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
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

  const {
    loading: loadingGetCompanyById,
    error: errorGetCompanyById,
    data: dataCompany,
  } = useQuery(getCompanyById, {
    variables: { companyId },
    fetchPolicy: "cache-first",
  });

  const { loading: loadingOrders, error: errorOrders, data: orders } = useQuery(
    getCurrentOrders,
    {
      variables: { companyId },
    }
  );

  const [
    loadOrderHistories,
    {
      loading: loadingOrderHistories,
      data: orderHistoriesData,
      // fetchMore: fetchMoreOrderHistories,
    },
  ] = useLazyQuery(getCompanyOrderHistories);

  const [graphScope, setGraphScope] = useState("week");

  const today = moment();

  const onChange = (event) => {
    // if (event === "year") {
    //   loadOrderHistories({
    //     variables: {
    //       companyId,
    //       fromDate: moment().subtract(1, "year").toDate(),
    //       toDate: today,
    //     },
    //   });
    // }
    setGraphScope(event.target.value);
  };

  const getCurrentOrdersNumber = () => {
    return orders
      ? orders.getCurrentOrders
        ? orders.getCurrentOrders.length
        : console.log(errorOrders)
      : console.log(errorOrders);
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

  if (loadingOrders || loadingGetCompanyById || loadingOrderHistories)
    return <TerradiaLoader />;
  return (
    <>
      {orderHistoriesData
        ? null
        : loadOrderHistories({
            variables: {
              companyId,
              fromDate: moment().subtract(31, "days").toDate(),
              toDate: today,
            },
          })}
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
          <StarReview
            averageMark={
              dataCompany
                ? dataCompany.getCompany.averageMark
                : console.log(errorGetCompanyById)
            }
            numberOfMarks={dataCompany.getCompany.numberOfMarks}
          />
        </div>
        <Card
          title={t("StatisticsPage.completedOrders")}
          extra={
            <Radio.Group
              defaultValue="week"
              onChange={onChange}
              buttonStyle="solid"
            >
              {/* <Radio.Button value="year">Année</Radio.Button> */}
              <Radio.Button value="months">
                {t("StatisticsPage.month")}
              </Radio.Button>
              <Radio.Button value="week">
                {t("StatisticsPage.week")}
              </Radio.Button>
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
