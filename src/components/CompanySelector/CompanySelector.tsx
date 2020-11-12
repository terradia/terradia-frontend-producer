import React, { useCallback, useContext, useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, Menu } from "antd";
import UserContext from "../Context/UserContext";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router";
import Logout from "../Authentication/Logout/Logout";
import PageButton from "../Ui/PageButton";
import { LoadingOutlined, ShopOutlined } from "@ant-design/icons/lib";

const queryGetCompaniesByUser = graphqlLoader(
  "../../graphql/query/getCompaniesByUser.graphql"
);

const getUserInformations = graphqlLoader(
  "../../graphql/query/getUser.graphql"
);

interface Props {
  isMobile?: boolean;
}

declare interface ProfileData {
  getUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    phone: string;
    password: string;
    avatar: string;
    companies: {
      id;
    };
  };
}

const CompanySelector: React.FC<Props> = ({
  isMobile = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
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
  const [avatarLoading, setAvatarLoading] = useState(true);

  const { data, loading, error } = useQuery(queryGetCompaniesByUser, {
    variables: {
      userId: userContext.id,
    },
  });

  const { data: userData, loading: userLoading, error: userError } = useQuery<
    ProfileData
  >(getUserInformations, {
    fetchPolicy: "cache-only",
  });

  const onClickedLink = useCallback(
    (href: string) => {
      setCurrentPage(href);
      history.push(href);
    },
    [history]
  );

  useEffect(() => {
    if (userLoading && !userError) {
      setAvatarLoading(true);
    } else {
      setAvatarLoading(false);
    }
  }, [userLoading, userError]);

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
        return false;
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
          <Menu.ItemGroup key="company" title="Vos entreprises">
            {data &&
              !loading &&
              !error &&
              data.getCompaniesByUser.map((company) => {
                return (
                  <PageButton
                    key={company.company.id}
                    link={company.company.id}
                    label={company.company.name}
                    icon={
                      company.company.logo ? (
                        <Avatar
                          src={`https://media.terradia.eu/${company.company.logo.filename}`}
                        />
                      ) : (
                        <ShopOutlined />
                      )
                    }
                    selected={currentPage === company.company.id}
                    onClick={() => {
                      setCurrentCompanyId(company.company.id);
                      handleChangeCompany(company.company.id);
                    }}
                  />
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
              <Logout />
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
    onClickedLink,
  ]);

  useEffect(() => {
    if (currentCompanyData !== null) {
      setInformation(
        <div className={"user-information-container"}>
          {isMobile === false && (
            <>
              <div className={"info-container"}>
                <span className={"user-name"}>
                  {userData.getUser.firstName + " " + userData.getUser.lastName}
                </span>
                <span className={"company-indicator"}>
                  <DownOutlined
                    className={"down-icon"}
                    style={{ fontSize: 15 }}
                  />
                  <span className={"company-name"}>
                    {currentCompanyData.name}
                  </span>
                </span>
              </div>
              <Divider type={"vertical"} className={"invisible-divider"} />
            </>
          )}
          <div className={"avatar-container"}>
            {isMobile === true && (
              <DownOutlined className={"down-icon"} style={{ fontSize: 15 }} />
            )}
            <Avatar
              className={"avatar"}
              size={"large"}
              shape={"circle"}
              alt={"profile"}
              icon={avatarLoading ? <LoadingOutlined /> : <UserOutlined />}
              src={
                avatarLoading
                  ? null
                  : userData && userData.getUser && userData.getUser.avatar
                  ? `https://media.terradia.eu/${userData.getUser.avatar}`
                  : null
              }
            />
          </div>
        </div>
      );
    }
  }, [
    currentCompanyData,
    userContext.lastName,
    userContext.firstName,
    userData,
    avatarLoading,
    isMobile,
  ]);

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
