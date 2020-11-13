import React from "react";
import { Review } from "../../interfaces/Review";
import { Avatar, Button, Comment, Divider, List, Rate } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Review/ListReview.less";

declare interface ListReviewProps {
  loadingList: boolean;
  reviewsList: [Review] | [];
  averageMark: number;
  numberOfMarks: number;
  isfetchMore?: boolean;
  handleFetchMore?: () => void;
  pagination?: any;
}

function ListReview(props: ListReviewProps) {
  // TODO : translate
  return (
    <div className={"list-review"}>
      <div className={"mark-informations"}>
        <span className={"average-mark"}>
          <span className={"average-mark-text"}>Note moyenne</span>
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
          {`${props.numberOfMarks} ${
            props.numberOfMarks > 1 ? "commentaires" : "commentaire"
          }`}
        </span>
      </div>
      <Divider />
      <div className={"review-tab"}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={props.reviewsList}
          pagination={props.pagination ? props.pagination : false}
          loading={props.loadingList}
          loadMore={
            props.isfetchMore ? (
              <div className={"button-show-more"}>
                <Button onClick={props.handleFetchMore} type={"link"}>
                  voir plus
                </Button>
              </div>
            ) : null
          }
          renderItem={(item: Review) => {
            return (
              <List.Item>
                <Comment
                  author={`${item.customer.user.firstName} ${item.customer.user.lastName}`}
                  datetime={
                    <span>
                      {moment(item.createdAt).format("DD MMM YYYY - HH:mm")}
                    </span>
                  }
                  avatar={
                    item.customer !== null && item.customer.user.avatar ? (
                      <Avatar
                        size={50}
                        src={`https://media.terradia.eu/${item.customer.user.avatar}`}
                        alt={item.customer.user.firstName}
                        className={"user-image"}
                      />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )
                  }
                  content={
                    <>
                      <div className={"comment-title"}>{item.title}</div>
                      <div>{item.description}</div>
                    </>
                  }
                  style={{ width: "80%" }}
                />
                <Rate disabled allowHalf value={item.customerMark} />
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}

export default ListReview;
