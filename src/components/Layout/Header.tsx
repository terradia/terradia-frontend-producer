import React, { useEffect } from "react";
import { ReactComponent as ReactLogo } from "../../assets/Logo/Terradia.svg";
import Logout from "../Authentication/Logout/Logout";
import { Layout as AntLayout } from "antd";
import CompanySelector from "../CompanySelector/CompanySelector";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import "../../assets/Style/Header/user-informations.less";

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

  useEffect(() => {
    if (!props.Company) {
      // if not in CompanySelection page
      const companyId = localStorage.getItem("selectedCompany");
      getCompanyByIdQuery({ variables: { companyId: companyId } });
    }
  }, [getCompanyByIdQuery, props.Company]);

  if (props.Company) {
    // if in CompanySelection page (login)
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
    // if not in CompanySelection (after query)

    displayedInfo = <CompanySelector companyData={data.getCompany} />;
  }

  return (
    <>
      <AntHeader
        style={{
          height: "10vh",
          background: "white",
          padding: "0 2% 0 2%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "#CBCBCB",
          borderBottomStyle: "solid",
          borderBottomWidth: "thin",
          lineHeight: "normal",
          width: "100vw",
        }}
        className={"header"}
      >
        <ReactLogo height={"5vh"} width={"25vh"} />
        {displayedInfo}
      </AntHeader>
    </>
  );
};

export default Header;
