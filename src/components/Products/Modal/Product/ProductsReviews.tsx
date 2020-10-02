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

const limitReviews = 5;

function ProductsReviews(props: ProductsReviewsProps) {
  const [offsetReviews, setOffsetReviews] = useState(limitReviews);
  const [noMoreReviews, setNoMoreReviews] = useState(false);
  const [copyReviews, setCopyReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCopyReviews(props.reviews);
  }, [props.reviews]);

  function handleFetchMore() {
    setLoading(true);
    props.fetchMore({
      variables: {
        id: props.updateProduct.id,
        limit: limitReviews,
        offset: offsetReviews,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
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
          return true;
        });
        setCopyReviews(prev.getProductReviews);
        setLoading(false);
        return {
          ...prev,
        };
      },
    });
    setOffsetReviews(offsetReviews + limitReviews);
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
            <List.Item>
              <Comment
                author={item.title}
                content={item.description}
                style={{ width: "80%" }}
              />
              <Rate disabled defaultValue={item.customerMark} />
            </List.Item>
          );
        }}
      />
    )
  );
}

export default ProductsReviews;
