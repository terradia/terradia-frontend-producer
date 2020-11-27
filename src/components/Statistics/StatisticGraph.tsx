import React, { useState } from "react";
import "../../assets/Style/Statistics/Statistics.less";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
} from "recharts";
import moment from "moment";
import TerradiaLoader from "../TerradiaLoader";

interface Props {
  graphScope: string;
  data: any;
  fromDate: Date;
}

const StatisticGraph = (props: Props) => {
  const [init, setinit] = useState(true);
  const [weekOrder, setWeekOrders] = useState([]);
  const [monthsOrder, setMonthsOrder] = useState([]);
  // const [yearOrder, setYearOrder] = useState([]);
  // let yearMonth = moment().subtract(12, "months");
  const today = moment().format("DD MMM");

  const getOrdersInWeek = (data) => {
    setinit(false);
    let tmpListOrder = [];

    let isCreated = false;
    if (isCreated === false) {
      for (
        let weekDay = moment().subtract(7, "days").format("DD MMM");
        weekDay !== today;
        weekDay = moment(new Date(weekDay)).add(1, "days").format("DD MMM")
      ) {
        tmpListOrder = [
          ...tmpListOrder,
          {
            nb: 0,
            date: moment(new Date(weekDay)).format("DD MMM"),
          },
        ];
      }
      isCreated = true;
    }

    data.forEach((order) => {
      tmpListOrder.forEach((tmpOrder) => {
        if (
          moment(new Date(tmpOrder.date)).format("DD MMM") ===
          moment(new Date(order.createdAt)).format("DD MMM")
        ) {
          tmpOrder.nb = tmpOrder.nb + 1;
          tmpOrder.date = moment(new Date(order.createdAt)).format("DD MMM");
        }
      });
    });

    setWeekOrders(tmpListOrder);
  };

  const getOrdersInMonth = (data) => {
    setinit(false);
    let tmpListOrder = [];

    let isCreated = false;
    if (isCreated === false) {
      for (
        let monthDay = moment().subtract(31, "days").format("DD MMM");
        monthDay !== today;
        monthDay = moment(new Date(monthDay)).add(1, "days").format("DD MMM")
      ) {
        tmpListOrder = [
          ...tmpListOrder,
          {
            nb: 0,
            date: moment(new Date(monthDay)).format("DD MMM"),
          },
        ];
      }
      isCreated = true;
    }

    data.forEach((order) => {
      tmpListOrder.forEach((tmpOrder) => {
        if (
          moment(new Date(tmpOrder.date)).format("DD MMM") ===
          moment(new Date(order.createdAt)).format("DD MMM")
        ) {
          tmpOrder.nb = tmpOrder.nb + 1;
          tmpOrder.date = moment(new Date(order.createdAt)).format("DD MMM");
        }
      });
    });
    setMonthsOrder(tmpListOrder);
  };

  // const getOrdersInYear = (data) => {
  //   setinit(false);
  //   let tmpListOrder = [];

  //   let isCreated = false;
  //   if (isCreated === false) {
  //     console.log("yearMonth", yearMonth, today);
  //   }
  //   while (yearMonth !== todayMonth) {
  //     tmpListOrder = [
  //       ...tmpListOrder,
  //       {
  //         nb: 0,
  //         date: moment(new Date(yearMonth)).format("DD MMM"),
  //       },
  //     ];
  //     yearMonth = moment(new Date(yearMonth))
  //       .add(1, "months")
  //       .format("DD MMM");
  //     console.log("yearMonth YEAR:", yearMonth);
  //   }
  //   isCreated = true;
  // }
  // data.forEach((order) => {
  //   tmpListOrder.forEach((tmpOrder) => {
  //     let tmpNb = 0;
  //     if (
  //       moment(new Date(tmpOrder.date)).format("DD MMM") ===
  //       moment(new Date(order.createdAt)).format("DD MMM")
  //     ) {
  //       tmpNb = tmpOrder.nb + 1;

  //       tmpOrder.nb = tmpNb;
  //       tmpOrder.date = moment(new Date(order.createdAt)).format("DD MMM");
  //     }
  //   });
  // });
  // console.log("tmpListOrder:", tmpListOrder);
  //   setYearOrder(tmpListOrder);
  // };

  if (init === true) {
    getOrdersInWeek(props.data);
    getOrdersInMonth(props.data);
    // getOrdersInYear(props.data);
    return <TerradiaLoader />;
  }

  return (
    <>
      {props.graphScope === "week" && (
        <BarChart width={700} height={400} data={weekOrder}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )}
      {props.graphScope === "months" && (
        <BarChart width={700} height={400} data={monthsOrder}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )}
      {/* {props.graphScope === "year" && (
        <BarChart width={600} height={400} data={yearOrder}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )} */}
    </>
  );
};

export default StatisticGraph;
