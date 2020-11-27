import React from "react";
import { Review } from "../../interfaces/Review";
import { Divider, List, Rate } from "antd";
import "../../assets/Style/Review/ListReview.less";
import { useTranslation } from "react-i18next";
import ReviewItem from "./ReviewItem";
import Button from "../Ui/Button";

declare interface ListReviewProps {
  loadingList: boolean;
  reviewsList: [Review] | [];
  averageMark: number;
  numberOfMarks: number;
  isfetchMore?: boolean;
  handleFetchMore?: () => void;
  pagination?: any;
  isCompany: boolean;
}

function ListReview(props: ListReviewProps) {
  const { t } = useTranslation("common");

  return (
    <div className={"list-review"}>
      <div className={"mark-informations"}>
        <span className={"average-mark"}>
          <span className={"average-mark-text"}>
            {t("Reviews.averageMark")}
          </span>
          <span className={"average-mark-stars"}>
            {`${Math.round(props.averageMark * 2) / 2} / 5`}
            <Rate
              disabled
              allowHalf
              value={Math.round(props.averageMark * 2) / 2}
            />
          </span>
        </span>
        <span className={"number-of-reviews"}>
          {`${props.numberOfMarks} ${t("Reviews.comments")}`}
        </span>
      </div>
      <Divider />
      <div className={"review-tab"}>
        <List
          locale={{ emptyText: t("common.noData") }}
          className="comment-list"
          itemLayout="horizontal"
          dataSource={props.reviewsList}
          pagination={props.pagination ? props.pagination : false}
          loading={props.loadingList}
          loadMore={
            props.isfetchMore ? (
              <div className={"button-show-more"}>
                <Button onClick={props.handleFetchMore} type={"link"}>
                  {t("Reviews.showMore")}
                </Button>
              </div>
            ) : null
          }
          renderItem={(item: Review) => {
            return <ReviewItem item={item} isCompany={props.isCompany} />;
          }}
        />
      </div>
    </div>
  );
}

export default ListReview;
