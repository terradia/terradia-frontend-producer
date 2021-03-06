import React from "react";
import { Layout as AntLayout, Tabs, Badge } from "antd";
import Header from "../components/Layout/Header";
import CompanyCardSelector from "../components/CompanySelector/CompanyCardSelector";
import InvitationsListCard from "../components/Staff/InvitationsListCard";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import TerradiaLoader from "../components/TerradiaLoader";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "larger",
  color: "#575757",
  flexShrink: 0,
};

const getMyCompaniesInvitations = graphqlLoader(
  "../graphql/query/getMyCompaniesInvitations.graphql"
);

const getCompanies = graphqlLoader("../graphql/query/getCompanies.graphql");

const CompanySelection = () => {
  const getCompaniesResult = useQuery(getCompanies);
  const { t } = useTranslation("common");

  const getMyInvitationsResult = useQuery(getMyCompaniesInvitations, {
    variables: {
      status: "PENDING",
    },
  });

  if (getCompaniesResult.loading) return <TerradiaLoader />;

  let invitationsTab = <div>{"Invitations"}</div>;
  if (
    getMyInvitationsResult.data &&
    getMyInvitationsResult.data.getMyCompaniesInvitations &&
    getMyInvitationsResult.data.getMyCompaniesInvitations.length > 0
  )
    invitationsTab = <Badge dot>{invitationsTab}</Badge>;

  return (
    <AntLayout style={{ background: "white" }}>
      <Header Company />
      <AntLayout
        style={{
          background: "white",
          minHeight: "90vh",
        }}
      >
        {getCompaniesResult.loading ? (
          <TerradiaLoader />
        ) : (
          <Tabs
            defaultActiveKey={
              getCompaniesResult.data &&
              getCompaniesResult.data.getCompanies &&
              getCompaniesResult.data.getCompanies.length === 0
                ? "2"
                : "1"
            }
            style={{
              margin: "2em",
              height: "100%",
            }}
          >
            <TabPane tab={t("CompanySelectionPage.companySelection")} key="1">
              <AntLayout.Content
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexFlow: "column wrap",
                }}
              >
                <span style={textStyle}>
                  {t("CompanySelectionPage.chooseCompany")}
                </span>{" "}
                <CompanyCardSelector
                  queryCompaniesObject={getCompaniesResult}
                />
              </AntLayout.Content>
            </TabPane>
            <TabPane tab={invitationsTab} key="2">
              <InvitationsListCard
                companyView={false}
                queryInvitationsResult={{
                  ...getMyInvitationsResult,
                  refetch: () => {
                    getCompaniesResult.refetch();
                    return getMyInvitationsResult.refetch({
                      status: "PENDING",
                    });
                  },
                }}
                style={{ margin: "1em" }}
                canFilter={false}
              />
            </TabPane>
          </Tabs>
        )}
      </AntLayout>
    </AntLayout>
  );
};

export default CompanySelection;
