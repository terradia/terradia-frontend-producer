import React, { useEffect, useState } from "react";
import { List, Rate, Comment, Button } from "antd";

declare interface Test {
  id: string;
  title: string;
  description: string;
  customerMark: number;
}

declare interface ProductsReviewsProps {
  updateProduct: any; // if you want to update a products or create one
  reviews: [
    {
      id: string;
      title: string;
      description: string;
      customerMark: number;
    }
  ];
  fetchMore: any;
  reload: any;
}

function ProductsReviews(props: ProductsReviewsProps) {
  const [offsetReviews, setOffsetReviews] = useState(2);
  const [noMoreReviews, setNoMoreReviews] = useState(false);
  const [copyReviews, setCopyReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCopyReviews(props.reviews);
  }, []);

  function handleFetchMore() {
    setLoading(true);
    props.fetchMore({
      variables: {
        id: props.updateProduct.id,
        limit: 2,
        offset: offsetReviews,
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (
          fetchMoreResult.getProductReviews &&
          fetchMoreResult.getProductReviews.length === 0
        ) {
          setNoMoreReviews(true);
        }
        fetchMoreResult.getProductReviews.map((review) => {
          prev.getProductReviews.push(review);
        });
        setCopyReviews(prev.getProductReviews);
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
    setOffsetReviews(offsetReviews + 2);
  }

  return (
    copyReviews !== null && (
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={copyReviews}
        loadMore={
          !noMoreReviews ? (
            <Button onClick={handleFetchMore}>Charger plus</Button>
          ) : null
        }
        loading={loading}
        renderItem={(item: Test) => {
          return (
            <li>
              <Comment author={item.title} content={item.description} />
              <Rate disabled defaultValue={item.customerMark} />
            </li>
          );
        }}
      />
    )
  );
}

export default ProductsReviews;
