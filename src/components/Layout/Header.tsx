import React, { useContext, useEffect } from "react";
import { ReactComponent as TerradiaLogo } from "../../assets/Logo/Terradia.svg";
import { UserOutlined } from "@ant-design/icons";
import Logout from "../Authentication/Logout/Logout";
import { Layout as AntLayout, Avatar, Skeleton } from "antd";
import CompanySelector from "../CompanySelector/CompanySelector";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import UserContext from "../Context/UserContext";

const getCompanyById = graphqlLoader(
  "../../graphql/query/getCompanyById.graphql"
);
const AntHeader = AntLayout.Header;

declare interface HeaderProps {
  Company?: boolean;
}

//TODO Faire un burger menu si la taille est trop petite

const Header = (props: HeaderProps) => {
  let displayedInfo;
  const [getCompanyByIdQuery, { loading, data }] = useLazyQuery(getCompanyById);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!props.Company) {
      const companyId = localStorage.getItem("selectedCompany");
      getCompanyByIdQuery({ variables: { companyId: companyId } });
    }
  }, [getCompanyByIdQuery, props.Company]);

  if (props.Company) {
    displayedInfo = (
      <div
        style={{
          order: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <Logout />
      </div>
    );
  } else if (!loading && data && data.getCompany) {
    displayedInfo = (
      <Skeleton active avatar loading={loading}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <span
            style={{
              height: "18px",
            }}
          >
            {userContext.firstName + " " + userContext.lastName}
          </span>
          <CompanySelector name={data.getCompany.name} />
        </div>
        <Avatar
          size={"large"}
          shape={"circle"}
          alt={"profile"}
          style={{
            marginRight: "5%",
            marginLeft: "5%",
          }}
          src={
            data.getCompany.logo
              ? "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
                data.getCompany.logo.filename
              : ""
          }
          icon={<UserOutlined />}
        />
      </Skeleton>
    );
  }

  return (
    <>
      <AntHeader
        style={{
          height: "10vh",
          background: "white",
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "#CBCBCB",
          borderBottomStyle: "solid",
          borderBottomWidth: "thin",
        }}
      >
        <TerradiaLogo
          height={"5vh"}
          width={"25vh"}
          style={{
            marginLeft: "2%",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {displayedInfo}
        </div>
      </AntHeader>
    </>
  );
};

export default Header;
