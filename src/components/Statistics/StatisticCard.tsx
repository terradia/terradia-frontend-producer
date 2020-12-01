import React from "react";
import { Card } from "antd";
import "../../assets/Style/Statistics/Statistics.less";

interface Props {
  title: string;
  number: number;
  description?: string;
}

const StatisticCard = (props: Props) => {
  return (
    <Card title={props.title} className={"statistic-card"}>
      <div className={"description-card"}>
        <p className={"green-stats"}>{props.number}</p>
        <p>{props.description ? props.description : null}</p>
      </div>
    </Card>
  );
};

export default StatisticCard;
