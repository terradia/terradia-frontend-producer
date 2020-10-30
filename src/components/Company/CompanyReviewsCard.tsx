import React, { useState } from "react";
import { Review } from "../../interfaces/Review";
import { Card } from "antd";
import "../../assets/Style/CompanyPage/CompanyReviewsCard.less";
import ListReview from "../Review/ListReview";

declare interface CompanyReviewsCardProps {
  averageMark: number;
  numberOfMarks: number;
  reviews: [Review];
  fetchMoreReviews: any;
  companyId: string;
}

function CompanyReviewsCard(props: CompanyReviewsCardProps) {
  const limitReviews = 10;
  const [loading, setLoading] = useState(false);

  function handleFetchMore(pageIndex) {
    if (
      props.reviews.length === props.numberOfMarks ||
      limitReviews * pageIndex <= props.reviews.length
    )
      return;
    setLoading(true);
    props.fetchMoreReviews({
      variables: {
        id: props.companyId,
        limit: limitReviews * pageIndex,
        offset: 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        fetchMoreResult.getCompanyReviews.map((newReview) => {
          if (
            prev.getCompanyReviews.findIndex(
              (oldReview) => oldReview.id === newReview.id
            ) === -1
          )
            prev.getCompanyReviews.push(newReview);
          return true;
        });
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
  }

  return (
    <Card
      title={"Avis des clients"}
      bordered={false}
      className={"company-reviews-card"}
    >
      <ListReview
        reviewsList={props.reviews}
        averageMark={props.averageMark}
        numberOfMarks={props.numberOfMarks}
        pagination={{
          onChange: handleFetchMore,
          pageSize: 10,
          total: props.numberOfMarks,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        loadingList={loading}
      />
    </Card>
  );
}

export default CompanyReviewsCard;
