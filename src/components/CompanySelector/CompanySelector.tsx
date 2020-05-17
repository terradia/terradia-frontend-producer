import React, { useCallback, useContext, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import UserContext from "../Context/UserContext";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router";
import Logout from "../Authentication/Logout/Logout";
import PageButton from "../Ui/PageButton";
import { ShopOutlined } from "@ant-design/icons/lib";

const queryGetCompaniesByUser = graphqlLoader(
  "../../graphql/query/getCompaniesByUser.graphql"
);

const CompanySelector = () => {
  const currentUrl = useLocation();
  const history = useHistory();
  const [currentCompanyId, setCurrentCompanyId] = useState(
    localStorage.getItem("selectedCompany")
  );

  const [currentPage, setCurrentPage] = useState(currentUrl.pathname);
  const [currentCompanyData, setCurrentCompanyData] = useState(null);

  const userContext = useContext(UserContext);
  const [menu, setMenu] = useState(null);
  const [information, setInformation] = useState(null);

  const { data, loading, error } = useQuery(queryGetCompaniesByUser, {
    variables: {
      userId: userContext.id,
    },
  });

  const onClickedLink = (href: string) => {
    setCurrentPage(href);
    history.push(href);
  };

  const findCurrentCompanyData = useCallback(
    (newCompanyId) => {
      data.getCompaniesByUser.findIndex((company) => {
        if (
          company.company.id ===
          (newCompanyId ? newCompanyId : currentCompanyId)
        ) {
          setCurrentCompanyData(company.company);
          return true;
        }
      });
    },
    [data, currentCompanyId]
  );

  const handleChangeCompany = useCallback(
    (newCompanyId) => {
      setCurrentCompanyId(newCompanyId);
      const oldCompanyId = localStorage.getItem("selectedCompany");
      localStorage.setItem("selectedCompany", newCompanyId);
      findCurrentCompanyData(newCompanyId);
      dispatchEvent(
        new StorageEvent("storage", {
          key: "selectedCompany",
          oldValue: oldCompanyId,
          newValue: newCompanyId,
          url: currentPage,
        })
      );
    },
    [currentPage, findCurrentCompanyData]
  );

  useEffect(() => {
    if (!error && !loading && data !== null) {
      findCurrentCompanyData(null);
    }
  }, [data, loading, error, findCurrentCompanyData]);

  useEffect(() => {
    setCurrentPage(currentUrl.pathname);
  }, [currentUrl]);

  useEffect(() => {
    if (!loading && !error && data) {
      setMenu(
        <Menu selectedKeys={[currentCompanyId]}>
          <Menu.ItemGroup key="entreprise" title="Vos entreprises">
            {data &&
              !loading &&
              !error &&
              data.getCompaniesByUser.map((company) => {
                return (
                  <Menu.Item
                    key={company.company.id}
                    onClick={() => {
                      setCurrentCompanyId(company.company.id);
                      handleChangeCompany(company.company.id);
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      padding: "16",
                    }}
                  >
                    <div className={"button-container"}>
                      <span className={"icon-container"}>
                        {<ShopOutlined />}
                      </span>
                      <span className={"label-container"}>
                        {company.company.name}
                      </span>
                    </div>
                  </Menu.Item>
                );
              })}
          </Menu.ItemGroup>
          <Menu.Divider />
          <Menu.ItemGroup key="settings" title="Paramètres">
            <PageButton
              link={"/profile/userProfile"}
              label={"Profil"}
              icon={<UserOutlined />}
              onClick={onClickedLink}
            />
            <Menu.Item>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  flexFlow: "column",
                  justifyContent: "flex-start",
                  alignContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Logout />
              </div>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      );
    }
  }, [
    data,
    loading,
    error,
    currentPage,
    history,
    currentCompanyId,
    handleChangeCompany,
  ]);

  useEffect(() => {
    if (currentCompanyData !== null) {
      setInformation(
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
              <span>{currentCompanyData.name}</span>
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
                currentCompanyData.logo && currentCompanyData.logo.filename
                  ? currentCompanyData.logo.filename
                  : null
              }
              icon={<UserOutlined />}
            />
          </div>
        </div>
      );
    }
  }, [currentCompanyData, userContext.lastName, userContext.firstName]);

  if (data && !loading && !error && menu !== null && information !== null) {
    return (
      <Dropdown
        overlay={menu}
        forceRender
        placement="topLeft"
        trigger={["click"]}
      >
        {information}
      </Dropdown>
    );
  } else {
    return null;
  }
};

export default CompanySelector;
