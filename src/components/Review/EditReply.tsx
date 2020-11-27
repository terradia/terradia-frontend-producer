import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "../../assets/Style/Review/EditReply.less";
import { useTranslation } from "react-i18next";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";

declare interface EditReplyProps {
  reviewId: string;
  editing: string | null;
  setEditing: (e) => void;
  isCompany: boolean;
}

const mutationCreateReplyProductReview = graphqlLoader(
  "../../graphql/mutation/products/addReplyToProductReview.graphql"
);
const mutationCreateReplyCompanyReview = graphqlLoader(
  "../../graphql/mutation/addReplyToCompanyReview.graphql"
);

function EditReply(props: EditReplyProps) {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation("common");

  const [createReplyReview] = useMutation(
    props.isCompany
      ? mutationCreateReplyCompanyReview
      : mutationCreateReplyProductReview
  );

  const initialValues = {
    reply: props.editing !== null ? props.editing : "",
  };

  function handleEdit(values) {
    setSubmitting(true);
    createReplyReview({
      variables: {
        reply: values.reply,
        reviewId: props.reviewId,
      },
    }).then(() => {
      setSubmitting(false);
      props.setEditing(false);
    });
  }

  return (
    <Form
      className={"add-reply-form"}
      form={form}
      initialValues={initialValues}
      name="replyReviewForm"
      onFinish={handleEdit}
    >
      <Form.Item
        name={"reply"}
        className={"textarea-reply-item"}
        rules={[{ required: true, message: "Please input your reply!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item className={"button-reply-item"}>
        <Button
          type="ghost"
          onClick={() => props.setEditing(false)}
          className={"button-item"}
        >
          {t("common.cancel")}
        </Button>
        <Button
          htmlType="submit"
          loading={submitting}
          type="primary"
          className={"button-item"}
        >
          {props.editing !== null ? t("common.edit") : t("Reviews.reply")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditReply;
