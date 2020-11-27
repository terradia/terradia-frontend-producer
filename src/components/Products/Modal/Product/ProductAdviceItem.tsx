import React, { useState } from "react";
import { Comment, List, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib";
import moment from "moment";
import { Advice } from "../../../../interfaces/Advice";
import { useTranslation } from "react-i18next";

interface ProductAdviceItemProps {
  item: Advice;
  deleteAdviceMutation: any;
  setEditingAdvice: (e) => void;
}

function ProductAdviceItem(props: ProductAdviceItemProps) {
  const { t } = useTranslation("common");
  const [isHover, setIsHover] = useState(false);

  function handleDeleteAdvice() {
    props.deleteAdviceMutation({
      variables: {
        adviceId: props.item.id,
      },
    });
  }

  return (
    <List.Item
      key={props.item.id}
      className={`advice-item ${isHover ? "advice-item-isHover" : ""}`}
      actions={[
        <EditOutlined
          key={props.item.id}
          onClick={() => props.setEditingAdvice(props.item)}
        />,
        <Popconfirm
          key={props.item.id}
          placement="top"
          title={t("ProductsPage.ProductAdvices.deleteAdvice")}
          onConfirm={() => {
            handleDeleteAdvice();
          }}
          okText={t("ProductsPage.deleteCategory.yes")}
          cancelText={t("ProductsPage.deleteCategory.no")}
        >
          <DeleteOutlined
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </Popconfirm>,
      ]}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <Comment
        author={props.item.title}
        content={props.item.content}
        datetime={
          <span>
            {moment(props.item.createdAt).format("DD MMM YYYY - HH:mm")}
          </span>
        }
      />
    </List.Item>
  );
}

export default ProductAdviceItem;
