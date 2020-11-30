import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Review } from "../../../../interfaces/Review";
import ListReview from "../../../Review/ListReview";

interface ProductsReviewsProps {
  updateProduct: any; // if you want to update a products or create one
  reviews: [Review] | [];
  fetchMoreReviews: any;
  loading: boolean;
}

function ProductsReviews(props: ProductsReviewsProps) {
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
      props.reviews.length === props.updateProduct.numberOfMarks ||
      limitReviews * pageIndex <= props.reviews.length
    )
      return;
    setLoading(true);
    props.fetchMoreReviews({
      variables: {
        id: props.updateProduct.id,
        limit: limitReviews * pageIndex,
        offset: 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        fetchMoreResult.getProductReviews.map((newReview) => {
          if (
            prev.getProductReviews.findIndex(
              (oldReview) => oldReview.id === newReview.id
            ) === -1
          )
            prev.getProductReviews.push(newReview);
          return true;
        });
        const list = document.querySelector(".review-tab");
        list.scrollTo(0, 0);
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
  }

  return (
    props.updateProduct !== null &&
    props.updateProduct.averageMark !== null &&
    props.updateProduct.numberOfMarks !== null && (
      <ListReview
        reviewsList={props.reviews}
        averageMark={props.updateProduct.averageMark}
        numberOfMarks={props.updateProduct.numberOfMarks}
        pagination={{
          onChange: handleFetchMore,
          pageSize: 10,
          total: props.updateProduct.numberOfMarks,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        loadingList={loading}
        isCompany={false}
      />
    )
  );
}

export default ProductsReviews;
