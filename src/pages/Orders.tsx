import React from "react";
import "../assets/Style/Products/ProductsPage.less";
import { Table } from "antd";
import Title from "../components/Ui/Title";
import { MoreOutlined } from "@ant-design/icons";
import Button from "antd/es/button";

// const queryCompanyUsers = graphqlLoader(
//   "../graphql/query/getCompanyUsers.graphql"
// );

const myArray = [
  {
    id: "0102030405",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 1,
    deliveryMode: "Stuart vélo",
    totalPrice: 46,
  },
  {
    id: "101020344457",
    date: new Date("May 12, 08 04:20"),
    status: "payed",
    nbItems: 12,
    deliveryMode: "Stuart vélo",
    totalPrice: 16,
  },
  {
    id: "01020306545",
    date: new Date("March 03, 12 04:20"),
    status: "delivered",
    nbItems: 2,
    deliveryMode: "Stuart vélo",
    totalPrice: 146,
  },
  {
    id: "0102030407",
    date: new Date("March 13, 08 04:20"),
    status: "approuved",
    nbItems: 1,
    deliveryMode: "Stuart fourguon",
    totalPrice: 460,
  },
  {
    id: "0102030408",
    date: new Date("March 13, 08 04:20"),
    status: "payed",
    nbItems: 7,
    deliveryMode: "Stuart scooter",
    totalPrice: 46,
  },
  {
    id: "0102030409",
    date: new Date("March 21, 20 04:20"),
    status: "canceled",
    nbItems: 5,
    deliveryMode: "Stuart voiture",
    totalPrice: 45,
  },
  {
    id: "0102030410",
    date: new Date("March 31, 18 04:20"),
    status: "sent",
    nbItems: 12,
    deliveryMode: "Stuart vélo",
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

  const [openMoreDetails, setOpenMoreDetails] = React.useState(false);

  const handleMoreDetails = (order) => {
    console.log("Order:", order);
    return openMoreDetails === true
      ? setOpenMoreDetails(false)
      : setOpenMoreDetails(true);
  };

  const moreDetails = (text, record) => {
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.toDateString(),
    },
    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Sent",
          value: "sent",
        },
        {
          text: "approuved",
          value: "approuved",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Payed",
          value: "payed",
        },
        {
          text: "Canceled",
          value: "canceled",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Nb d'articles",
      dataIndex: "nbItems",
      key: "nbItems",
      sorter: (a, b) => a.nbItems - b.nbItems,
    },
    {
      title: "Mode de livraison",
      dataIndex: "deliveryMode",
      key: "deliveryMode",
    },
    {
      title: "Prix",
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
      title: "Actions",
      dataIndex: "operation",
      render: moreDetails,
    },
  ];

  // if (loading) return <div>loading</div>;

  return (
    <div className={"order-page"}>
      <Title title={"Suivi des commandes"} />
      <Table columns={columns} rowKey={"id"} dataSource={myArray} />
    </div>
  );
};

export default Orders;
