import React from "react";
import "../assets/Style/Products/ProductsPage.less";
import { Table, Radio } from "antd";
import Title from "../components/Ui/Title";
import { MoreOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { useTranslation } from "react-i18next";

// const queryCompanyUsers = graphqlLoader(
//   "../graphql/query/getCompanyUsers.graphql"
// );
const myArray = [
  {
    id: "0102030405",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 1,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 46,
  },
  {
    id: "101020344457",
    date: new Date("May 12, 08 04:20"),
    status: "payed",
    nbItems: 12,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 16,
  },
  {
    id: "01020306545",
    date: new Date("March 03, 12 04:20"),
    status: "delivered",
    nbItems: 2,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 146,
  },
  {
    id: "0102030407",
    date: new Date("March 13, 08 04:20"),
    status: "approuved",
    nbItems: 1,
    deliveryMode: "Pick up only", //"Stuart fourguon",
    totalPrice: 460,
  },
  {
    id: "0102030408",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 7,
    deliveryMode: "Pick up only", //"Stuart scooter",
    totalPrice: 46,
  },
  {
    id: "0102030409",
    date: new Date("March 21, 20 04:20"),
    status: "canceled",
    nbItems: 5,
    deliveryMode: "Pick up only", //"Stuart voiture",
    totalPrice: 45,
  },
  {
    id: "0102030410",
    date: new Date("March 31, 18 04:20"),
    status: "payed",
    nbItems: 12,
    deliveryMode: "Pick up only", //"Stuart vélo",
    totalPrice: 6,
  },
];

const Orders = () => {
  // const companyId = localStorage.getItem("selectedCompany");

  // const tagRenderer = (roles: { slugName: string }[]) => {
  //   return (
  //     <span>
  //       {roles.map((tag: { slugName: string }, index: string | number) => {
  //         let color = "green";
  //         if (tag.slugName === "admin") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={index}>
  //             {tag.slugName.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   );
  // };

  /*
   id: "0102030405",
    date: "2019-05-13 08:49:44.713+00",
    status: "payed",
    nbItems: 5,
    deliveryMode: "Stuart vélo",
    totalPrice: 46,
  */

  //  const [openDetails, setOpenDetails] = React.useState(false);

  // const [orderStatus, setOrderStatus] = React.useState("");
  const [openMoreDetails, setOpenMoreDetails] = React.useState(false);
  const [statusOrder, setStatusOrder] = React.useState("");
  const [statusOrderId, setStatusOrderId] = React.useState("");
  let tmpRecord = [];
  const { t } = useTranslation("common");

  const handleModalDetails = () => {
    myArray.forEach((order) => {
      if (order.id === statusOrderId) {
        order.status = statusOrder;
      }
    });
    if (statusOrder) {
      openMoreDetails === true
        ? setOpenMoreDetails(false)
        : setOpenMoreDetails(true);
    }
  };

  const handleMoreDetails = (order) => {
    // console.log("Order:", order);
    setStatusOrderId(order.id);
    return openMoreDetails === true
      ? setOpenMoreDetails(false)
      : setOpenMoreDetails(true);
  };

  const onChange = (e) => {
    setStatusOrder(e.target.value);
  };

  const handleChangeOrder = () => {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    return (
      <div>
        {tmpRecord && (
          <Radio.Group onChange={onChange} value={statusOrder}>
            <Radio style={radioStyle} value={"approuved"}>
              {t("OrdersListPage.orderValues.approuved")}
            </Radio>
            <Radio style={radioStyle} value={"payed"}>
              {t("OrdersListPage.orderValues.payed")}
            </Radio>
            <Radio style={radioStyle} value={"delivered"}>
              {t("OrdersListPage.orderValues.delivered")}
            </Radio>
            <Radio style={radioStyle} value={"cancel"}>
              {t("OrdersListPage.orderValues.canceled")}
            </Radio>
          </Radio.Group>
        )}
      </div>
    );
  };

  const moreDetails = (text, record) => {
    tmpRecord = record;
    return (
      <div>
        <MoreOutlined rotate={90} onClick={() => handleMoreDetails(record)} />
      </div>
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "#",
    },
    {
      title: t("OrdersListPage.labels.date"),
      dataIndex: "date",
      key: "date",
      render: (date) => date.toDateString(),
    },
    {
      title: t("OrdersListPage.labels.status"),
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: t("OrdersListPage.orderValues.approuved"),
          value: "approuved",
        },
        {
          text: t("OrdersListPage.orderValues.delivered"),
          value: "delivered",
        },
        {
          text: t("OrdersListPage.orderValues.payed"),
          value: "payed",
        },
        {
          text: t("OrdersListPage.orderValues.canceled"),
          value: "canceled",
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: t("OrdersListPage.labels.ProductsNumber"),
      dataIndex: "nbItems",
      key: "nbItems",
      sorter: (a, b) => a.nbItems - b.nbItems,
    },
    {
      title: t("OrdersListPage.labels.deliveryType"),
      dataIndex: "deliveryMode",
      key: "deliveryMode",
    },
    {
      title: t("OrdersListPage.labels.price"),
      key: "price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    // {
    //   title: "Details",
    //   dataIndex: "operation",
    //   render: (order) => `${order.status}`,
    // },
    {
      title: t("OrdersListPage.labels.actions"),
      dataIndex: "operation",
      render: moreDetails,
    },
  ];

  // if (loading) return <div>loading</div>;

  return (
    <div className={"order-page"}>
      <Modal
        title={t("OrdersListPage.ordersListPageModal.name")}
        centered
        visible={openMoreDetails}
        onOk={() => handleModalDetails()}
        onCancel={() => setOpenMoreDetails(false)}
      >
        <div>{handleChangeOrder()}</div>
      </Modal>
      <Title title={t("OrdersListPage.labels.pageName")} />
      <Table columns={columns} rowKey={"id"} dataSource={myArray} />
    </div>
  );
};

export default Orders;
