import React, { useCallback, useEffect, useState } from "react";
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
import TerradiaLoader from "../TerradiaLoader";
import _ from "lodash";
import moment from "moment";

interface Props {
  graphScope: string;
  data: any;
  fromDate: Date;
}

const UnitOption = {
  ADD: 1,
  BOUND: 2,
  DISPLAY: 3,
  NB: 4,
};

const StatisticGraph = (props: Props) => {
  const [init, setinit] = useState(false);
  const [weekOrder, setWeekOrders] = useState([]);
  const [monthsOrder, setMonthsOrder] = useState([]);
  const [yearOrders, setYearOrders] = useState([]);

  const getUnitOfTime = (formatFilter, option = undefined) => {
    switch (formatFilter) {
      case "D":
        switch (option) {
          case UnitOption.ADD:
            return "d";
          case UnitOption.BOUND:
            return "d";
          case UnitOption.DISPLAY:
            return "D";
          case UnitOption.NB:
            return 7;
          default:
            return "YYYY-MM-DD";
        }
      case "MMM":
        switch (option) {
          case UnitOption.ADD:
            return "d";
          case UnitOption.BOUND:
            return "d";
          case UnitOption.DISPLAY:
            return "DD";
          case UnitOption.NB:
            return moment().daysInMonth();
          default:
            return "YYYY-MM-DD";
        }
      case "YYYY":
        switch (option) {
          case UnitOption.ADD:
            return "M";
          case UnitOption.BOUND:
            return "M";
          case UnitOption.DISPLAY:
            return "MMM";
          case UnitOption.NB:
            return 12;
          default:
            return "YYYY-MM";
        }
    }
    return formatFilter;
  };

  const formatGraphData = useCallback(
    (formatFilter) => {
      const startDate = moment().subtract(
        getUnitOfTime(formatFilter, UnitOption.NB),
        getUnitOfTime(formatFilter, UnitOption.BOUND)
      );
      const endDate = moment();
      const filters = (item) =>
        moment(item.updatedAt, "YYYY-MM-DD").format(
          getUnitOfTime(formatFilter)
        );
      let data = _.groupBy(props.data, filters);
      data = _.map(data, (group, key) => {
        return {
          date: key,
          displayDate: moment(key).format(
            getUnitOfTime(formatFilter, UnitOption.DISPLAY)
          ),
          nb: group.length,
        };
      });
      for (
        let day = startDate;
        day <= endDate;
        day = day.clone().add(1, getUnitOfTime(formatFilter, UnitOption.ADD))
      ) {
        if (
          !_.some(
            data,
            (item) => item.date === day.format(getUnitOfTime(formatFilter))
          )
        ) {
          data.push({
            date: day.format(getUnitOfTime(formatFilter)),
            displayDate: day.format(
              getUnitOfTime(formatFilter, UnitOption.DISPLAY)
            ),
            nb: undefined,
          });
        }
      }
      data = _.filter(data, (item) => {
        return moment(item.date).isBetween(startDate, endDate, undefined, "[]");
      });
      return _.sortBy(data, (item) => item.date);
    },
    [props.data]
  );

  useEffect(() => {
    setWeekOrders(formatGraphData("D"));
    setMonthsOrder(formatGraphData("MMM"));
    setYearOrders(formatGraphData("YYYY"));
    setinit(true);
  }, [formatGraphData]);

  if (init === false) {
    return <TerradiaLoader />;
  }

  return (
    <>
      {props.graphScope === "D" && (
        <BarChart width={700} height={400} data={weekOrder}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayDate" />
          <YAxis />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )}
      {props.graphScope === "MMM" && (
        <BarChart width={700} height={400} data={monthsOrder}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayDate" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )}
      {props.graphScope === "YYYY" && (
        <BarChart width={700} height={400} data={yearOrders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="displayDate" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nb" fill="#52c41a">
            <LabelList dataKey="nb" position="center" />
          </Bar>
        </BarChart>
      )}
    </>
  );
};

export default StatisticGraph;
