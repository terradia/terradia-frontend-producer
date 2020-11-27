import { Avatar, Comment, List, message, Popconfirm, Rate } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import EditReply from "./EditReply";
import React, { useState } from "react";
import { Review } from "../../interfaces/Review";
import { useTranslation } from "react-i18next";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/react-hooks";

const mutationDeleteReplyProductReview = graphqlLoader(
  "../../graphql/mutation/products/deleteReplyToProductReview.graphql"
);
const mutationDeleteReplyCompanyReview = graphqlLoader(
  "../../graphql/mutation/deleteReplyToCompanyReview.graphql"
);
const queryGetCompanyInfoById = graphqlLoader(
  "../../graphql/query/getCompanyInfoById.graphql"
);

declare interface ReviewItemProps {
  item: Review;
  isCompany: boolean;
}

function ReviewItem(props: ReviewItemProps) {
  const companyId = localStorage.getItem("selectedCompany");
  const { t } = useTranslation("common");
  const [editingReply, setEditingReply] = useState(false);
  const [deleteReplyReview] = useMutation(
    props.isCompany
      ? mutationDeleteReplyCompanyReview
      : mutationDeleteReplyProductReview
  );

  const {
    loading: loadingCompany,
    error: errorCompany,
    data: dataCompany,
  } = useQuery(queryGetCompanyInfoById, {
    variables: { companyId: companyId },
    fetchPolicy: "cache-first",
  });

  function handleDeleteReply() {
    deleteReplyReview({
      variables: {
        reviewId: props.item.id,
      },
    }).then(message.success(t("Reviews.replyDeleted")));
  }

  return (
    <List.Item className={"item-list-review"}>
      <span className={"comment-item"}>
        <Comment
          author={`${props.item.customer.user.firstName} ${props.item.customer.user.lastName}`}
          datetime={
            <span>
              {moment(props.item.createdAt).format("DD MMM YYYY - HH:mm")}
            </span>
          }
          avatar={
            props.item.customer !== null && props.item.customer.user.avatar ? (
              <Avatar
                size={50}
                src={`https://media.terradia.eu/${props.item.customer.user.avatar}`}
                alt={props.item.customer.user.firstName}
                className={"user-image"}
              />
            ) : (
              <Avatar size={50} icon={<UserOutlined />} />
            )
          }
          content={
            <>
              <div className={"comment-title"}>
                <Rate
                  disabled
                  allowHalf
                  value={props.item.customerMark}
                  className={"rate-review-item"}
                />
                {props.item.title}
              </div>
              <div>{props.item.description}</div>
            </>
          }
          actions={
            props.item.reply === null
              ? [
                  <span
                    key="reply-to-review"
                    onClick={() => setEditingReply(true)}
                  >
                    {t("Reviews.reply")}
                  </span>,
                ]
              : null
          }
        >
          {props.item.reply !== null &&
            !loadingCompany &&
            dataCompany &&
            !errorCompany && (
              // Reply of review
              <div>
                <Comment
                  author={dataCompany.getCompany.name}
                  avatar={
                    dataCompany.getCompany.logo ? (
                      <Avatar
                        size={50}
                        src={`https://media.terradia.eu/${dataCompany.getCompany.logo.filename}`}
                        alt={dataCompany.getCompany.name}
                        className={"user-image"}
                      />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )
                  }
                  content={<div>{props.item.reply}</div>}
                  actions={[
                    <EditOutlined
                      key={props.item.id}
                      onClick={() => setEditingReply(true)}
                    />,
                    <Popconfirm
                      key={props.item.id}
                      placement="top"
                      title={t("Reviews.deleteReply")}
                      onConfirm={() => {
                        handleDeleteReply();
                      }}
                      okText={t("common.yes")}
                      cancelText={t("common.no")}
                    >
                      <DeleteOutlined
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    </Popconfirm>,
                  ]}
                />
              </div>
            )}
        </Comment>
      </span>
      {editingReply && (
        <EditReply
          reviewId={props.item.id}
          editing={props.item.reply}
          setEditing={setEditingReply}
          isCompany={props.isCompany}
        />
      )}
    </List.Item>
  );
}

export default ReviewItem;
