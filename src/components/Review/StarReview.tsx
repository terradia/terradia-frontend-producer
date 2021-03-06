import React from "react";
import { Card, Rate } from "antd";
import "../../assets/Style/Review/StarReview.less";
import { useTranslation } from "react-i18next";

declare interface StarReviewProps {
  averageMark: number;
  numberOfMarks: number;
}

function StarReview(props: StarReviewProps) {
  const { t } = useTranslation("common");

  return (
    <Card title={t("Reviews.starReview.clientReview")} bordered={false} className={"star-card"}>
      {props.averageMark && props.numberOfMarks && (
        <div>
          <div className={"mark-informations"}>
            <div className={"average-mark"}>
              <span>{t("Reviews.averageMark")}</span>
            </div>
            <span className={"average-mark-stars"}>
              <Rate
                disabled
                allowHalf
                value={Math.round(props.averageMark * 2) / 2}
              />
              <span>{`${Math.round(props.averageMark * 2) / 2} / 5`}</span>
            </span>
          </div>
          <span className={"number-of-reviews"}>
            {`${props.numberOfMarks} ${t("Reviews.starReview.comment", {
              plural: props.numberOfMarks > 1 ? "s" : "",
            })}`}
          </span>
        </div>
      )}
    </Card>
  );
}

export default StarReview;
