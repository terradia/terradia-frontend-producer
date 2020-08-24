import React, { useState } from "react";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { CompanyInvitation } from "../../interfaces/CompanyInvitation";
import TerradiaLoader from "../../components/TerradiaLoader";
import { Divider, Empty, Select } from "antd";
import CompanyInvitationCard from "../../components/Profile/CompanyInvitationCard";
import "../../assets/Style/Profile/invitationsView.less";

const { Option } = Select;

const getMyCompaniesInvitations = graphqlLoader(
  "../../graphql/query/getMyCompaniesInvitations.graphql"
);

declare interface InvitationsData {
  getMyCompaniesInvitations: CompanyInvitation[];
}

const CompanyInvitationsView: React.FC = () => {
  const tmpFilter = localStorage.getItem("companiesInvitationsFilter");
  const [filter, changeFilter] = useState(
    tmpFilter === null ? "ALL" : tmpFilter
  );
  const { data: companiesInvitationsData, loading, error } = useQuery<
    InvitationsData
  >(getMyCompaniesInvitations, {
    variables: { status: filter },
  });

  if (error) console.error(error);

  const handleChangeFilter = (data) => {
    changeFilter(data);
    localStorage.setItem("companiesInvitationsFilter", data);
  };

  if (loading === true) return <TerradiaLoader />;
  console.log(companiesInvitationsData);
  const invitationsToPrompt = companiesInvitationsData.getMyCompaniesInvitations.filter(
    (invitation) => {
      return filter === "ALL" ? true : filter === invitation.status;
    }
  );
  return (
    <div className={"main-content"}>
      <div className={"header"}>
        <div className={"status-filter"}>
          <label>STATUS DES INVITATIONS</label>
          <Select
            defaultValue={filter}
            style={{ width: "100%" }}
            onChange={handleChangeFilter}
          >
            <Option value="ALL">Toutes</Option>
            <Option value="PENDING">En attente</Option>
            <Option value="ACCEPTED">Acceptées</Option>
            <Option value="DECLINED">Refusées</Option>
          </Select>
        </div>
      </div>
      <div className={"invitations-container"}>
        {invitationsToPrompt.map((invitation, index) => {
          return <CompanyInvitationCard key={index} invitation={invitation} />;
        })}
        {invitationsToPrompt.length === 0 && (
          <div className={"card"}>
            <Empty
              style={{
                width: "100%",
              }}
              description={"Aucune invitation pour le moment"} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInvitationsView;
