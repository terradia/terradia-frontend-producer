import React, { useContext, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import UserContext from "../Context/UserContext";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router";

const queryGetCompaniesByUser = graphqlLoader(
  "../../graphql/query/getCompaniesByUser.graphql"
);

declare interface CompanySelectorProps {
  companyData: {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    logo: {
      id: string;
      filename: string;
    };
    cover: {
      id: string;
      filename: string;
    };
    address: string;
    openingDays: {
      id: string;
      daySlugName: string;
      dayTranslationKey: string;
      hours: {
        id: string;
        startTime: Date;
        endTime: Date;
      };
    };
  };
}

const CompanySelector = (props: CompanySelectorProps) => {
  const currentUrl = useLocation().pathname;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(currentUrl);

  const userContext = useContext(UserContext);
  const [menu, setMenu] = useState(null);

  const { data, loading, error } = useQuery(queryGetCompaniesByUser, {
    variables: {
      userId: userContext.id,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setMenu(
        <Menu defaultSelectedKeys={[currentPage]}>
          <Menu.ItemGroup key="entreprise" title="Vos entreprises">
            {data &&
              !loading &&
              !error &&
              data.getCompaniesByUser.map((company) => {
                console.log("company", company);
                return (
                  <Menu.Item
                    title={company.company.name}
                    key={company.company.id}
                  >
                    <p>{company.company.name}</p>
                  </Menu.Item>
                );
              })}
          </Menu.ItemGroup>
          <Menu.Divider />
          <Menu.ItemGroup key="settings" title="Paramètres">
            <Menu.Item>
              <p
                onClick={() => {
                  setCurrentPage("/profile/userProfile");
                  history.push("/profile/userProfile");
                }}
              >
                Profil
              </p>
            </Menu.Item>
            <Menu.Item>
              <p>Se deconnecter</p>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      );
      console.log("menuSet");
    }
  }, [data, loading, error, currentPage, history]);

  const tmpLogo = "https://w.wallhaven.cc/full/nr/wallhaven-nrgrv1.jpg";

  const informations = (
    <div className={"user-information"}>
      <div className={"informations"}>
        <div
          style={{
            height: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {userContext.firstName + " " + userContext.lastName}
        </div>
        <div
          style={{
            color: "#5CC04A",
            fontSize: "20px",
            fontStyle: "bold",
            height: "50%",
            width: "max-content",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DownOutlined />
          <span>{props.companyData.name}</span>
        </div>
      </div>

      <div
        style={{
          width: "1vw",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          size={"large"}
          shape={"circle"}
          alt={"profile"}
          src={
            props.companyData.logo && props.companyData.logo.filename
              ? props.companyData.logo.filename
              : tmpLogo
          }
          icon={<UserOutlined />}
        />
      </div>
    </div>
  );

  if (data && !loading && !error && menu !== null) {
    console.log("menu", menu);
    return (
      <Dropdown overlay={menu} placement="topLeft" trigger={["click"]}>
        {informations}
      </Dropdown>
    );
  } else {
    return informations;
  }
};

export default CompanySelector;
