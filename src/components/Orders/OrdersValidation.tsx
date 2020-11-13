import React from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { Button, Card, Row, Table, Tag, Modal } from "antd";
import "../../assets/Style/Orders/Orders.less";
import { useTranslation } from "react-i18next";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";
import Popconfirm from "antd/es/popconfirm";
import { useMutation, useQuery } from "@apollo/react-hooks";
import TerradiaLoader from "../TerradiaLoader";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const getCurrentOrders = graphqlLoader(
  "../../graphql/query/orders/getCurrentOrders.graphql"
);

const mutationAcceptOrder = graphqlLoader(
  "../../graphql/mutation/orders/acceptOrder.graphql"
);
const mutationDeclineOrder = graphqlLoader(
  "../../graphql/mutation/orders/declineOrder.graphql"
);

const OrdersValidation = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const { t } = useTranslation("common");

  const { loading: loadingOrders, error: errorOrders, data: orders } = useQuery(
    getCurrentOrders,
    {
      variables: { companyId },
    }
  );

  const [acceptOrder, { loading: acceptOrderLoading }] = useMutation(
    mutationAcceptOrder,
    {
      refetchQueries: [
        {
          query: getCurrentOrders,
          variables: { companyId },
        },
      ],
    }
  );

  const [declineOrder, { loading: declineLoading }] = useMutation(
    mutationDeclineOrder,
    {
      refetchQueries: [
        {
          query: getCurrentOrders,
          variables: { companyId },
        },
      ],
    }
  );

  const onAccept = (record) => {
    if (record)
      acceptOrder({
        variables: {
          id: record.id,
        },
      }).catch((error) => {
        console.log(error);
      });
  };

  const [openDeclineReason, setOpenDeclineReason] = React.useState(false);
  const [declineOrderId, setDeclineOrderId] = React.useState("");
  const [declineReason, setDeclineReason] = React.useState("");

  const handleDeclineOrder = () => {
    if (declineOrderId)
      declineOrder({
        variables: {
          id: declineOrderId,
          reason: declineReason,
        },
      }).catch((error) => {
        console.log(error);
      });
    setDeclineReason("");
    setOpenDeclineReason(false);
  };

  const handleDeclineOrderCancel = () => {
    setOpenDeclineReason(false);
  };

  function handleChange(e) {
    setDeclineReason(e.target.value);
  }

  const handleTextDecline = () => {
    return (
      <div>
        <TextArea
          rows={4}
          value={declineReason}
          onChange={handleChange}
          onPressEnter={handleChange}
        />
      </div>
    );
  };

  const actions = (read, record) => {
    return (
      <Row>
        <Tooltip placement="top" title={t("OrderPage.newOrder.acceptOrder")}>
          <Button
            type={"link"}
            onClick={() => onAccept(record)}
            icon={<CheckCircleOutlined />}
          />
        </Tooltip>
        <Tooltip placement="top" title={t("OrderPage.newOrder.declineOrder")}>
          <Popconfirm
            placement="bottom"
            title={t("OrderPage.newOrder.areYouSure")}
            onConfirm={(event) => {
              setDeclineOrderId(record ? record.id : null);
              setOpenDeclineReason(true);
              event.stopPropagation();
            }}
            onCancel={(event) => {
              event.stopPropagation();
            }}
            okText="Oui"
            cancelText="Non"
          >
            <Button
              type={"link"}
              danger
              icon={<CloseCircleOutlined style={{ color: "#FF0000" }} />}
            />
          </Popconfirm>
        </Tooltip>
      </Row>
    );
  };

  const statusRenderer = (status) => {
    let color = "green";
    switch (status) {
      case "PENDING":
        color = "blue";
        break;
      case "ACCEPTED":
        color = "green";
        break;
      case "AVAILABLE":
        color = "lime";
        break;
      case "CANCELED":
        color = "red";
        break;
      case "DECLINED":
        color = "volcano";
        break;
      default:
        color = "green";
        break;
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "code",
      key: "#",
    },
    {
      title: "Date",
      dataIndex: "createdAt ",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY h:mm"),
    },
    {
      title: t("OrderPage.table.statut"),
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "PENDING",
          value: "PENDING",
        },
        {
          text: "ACCEPTED",
          value: "ACCEPTED",
        },
        {
          text: "AVAILABLE",
          value: "AVAILABLE",
        },
        {
          text: "DECLINED",
          value: "DECLINED",
        },
        {
          text: "CANCELED",
          value: "CANCELED",
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: statusRenderer,
    },
    {
      title: t("OrderPage.table.itemNb"),
      dataIndex: "numberProducts",
      key: "nbItems",
      sorter: (a, b) => a.nbItems - b.nbItems,
    },
    {
      title: t("OrderPage.table.price"),
      key: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => Math.round((price + Number.EPSILON) * 100) / 100,
    },
    {
      title: t("OrderPage.table.operations"),
      dataIndex: "operation",
      render: actions,
    },
  ];

  const columnsOrder = [
    {
      title: t("OrderPage.drawer.table.item"),
      dataIndex: "product",
      key: "product",
      render: (product) => `${product.name}`,
    },
    {
      title: t("OrderPage.drawer.table.quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("OrderPage.drawer.table.price"),
      dataIndex: "price",
      key: "price",
    },
  ];

  if (loadingOrders || acceptOrderLoading || declineLoading)
    return <TerradiaLoader />;

  const expandedDetails = (record) => {
    return (
      <>
        <Table
          dataSource={record ? record.products : console.log(errorOrders)}
          columns={columnsOrder}
          pagination={false}
          rowKey={"id"}
        />
      </>
    );
  };

  return (
    <>
      <Card
        className={"card"}
        title={<h2 className={"card-title"}>{t("OrderPage.newOrderTitle")}</h2>}
      >
        <Table
          columns={columns}
          rowKey={"id"}
          expandable={{
            defaultExpandAllRows: false,
            expandedRowRender: (record) => expandedDetails(record),
          }}
          dataSource={
            orders ? orders.getCurrentOrders : console.log(errorOrders)
          }
        />
      </Card>
      <Modal
        title="Decline order reason"
        centered
        visible={openDeclineReason}
        onOk={() => handleDeclineOrder()}
        onCancel={() => handleDeclineOrderCancel()}
      >
        <> {handleTextDecline()}</>
      </Modal>
    </>
  );
};

export default OrdersValidation;
