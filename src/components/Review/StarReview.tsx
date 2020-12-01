import React from "react";
import { Card, Rate } from "antd";
import "../../assets/Style/Review/StarReview.less";

declare interface StarReviewProps {
  averageMark: number;
  numberOfMarks: number;
}

function StarReview(props: StarReviewProps) {
  // TODO : translate
  return (
    <Card title={"Avis des clients"} bordered={false} className={"star-card"}>
      {props.averageMark && props.numberOfMarks && (
        <div>
          <div className={"mark-informations"}>
            <div className={"average-mark"}>
              <span>Note moyenne</span>
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
            {`${props.numberOfMarks} ${
              props.numberOfMarks > 1 ? "commentaires" : "commentaire"
            }`}
          </span>
        </div>
      )}
    </Card>
  );
}

export default StarReview;
