import React, { useEffect, useState } from "react";
import { Review } from "../../interfaces/Review";
import { Card } from "antd";
import "../../assets/Style/CompanyPage/CompanyReviewsCard.less";
import ListReview from "../Review/ListReview";
import { useTranslation } from "react-i18next";

declare interface CompanyReviewsCardProps {
  averageMark: number;
  numberOfMarks: number;
  reviews: [Review] | [];
  fetchMoreReviews: any;
  companyId: string;
  loading: boolean;
}

function CompanyReviewsCard(props: CompanyReviewsCardProps) {
  const limitReviews = 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.loading]);

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
        const list = document.querySelector(".ant-layout-content");
        list.scrollTo(0, 0);
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
  }

  const { t } = useTranslation("common");

  return (
    <Card
      title={t("CompanyPage.customersReviews.name")}
      bordered={false}
      className={"company-reviews-card"}
    >
      {props.averageMark && props.numberOfMarks && (
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
          isCompany={true}
        />
      )}
    </Card>
  );
}

export default CompanyReviewsCard;
