import React, { CSSProperties, useState } from "react";
import { Button, Card, Divider, Empty, Input, Modal, Select } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
} from "@ant-design/icons/lib";
import "../../assets/Style/Staff/invitationListCard.less";
import TerradiaLoader from "../TerradiaLoader";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { addNotification } from "../../utils/notifications";
import CompanyInvitationCard from "../../components/Profile/CompanyInvitationCard";
import { loader as graphqlLoader } from "graphql.macro";
import moment from "moment";
import { QueryResult } from "@apollo/react-common";

const { Option } = Select;

const getMyCompaniesInvitations = graphqlLoader(
  "../../graphql/query/getMyCompaniesInvitations.graphql"
);

const mutationInviteNewMember = graphqlLoader(
  "../../graphql/mutation/staff/inviteNewMember.graphql"
);

const mutationCancelInvitation = graphqlLoader(
  "../../graphql/mutation/invitations/cancelInvitation.graphql"
);

const mutationAcceptInvitation = graphqlLoader(
  "../../graphql/mutation/invitations/acceptInvitation.graphql"
);

const mutationDeclineInvitation = graphqlLoader(
  "../../graphql/mutation/invitations/declineInvitation.graphql"
);

const getCompaniesInvitations = graphqlLoader(
  "../../graphql/query/staff/getCompaniesInvitations.graphql"
);

interface Props {
  companyView?: boolean;
  style?: CSSProperties;
  queryInvitationsResult?: QueryResult;
  canFilter?: boolean;
  defaultFilter?: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELED";
}

const InvitationsListCard: React.FC<Props> = ({
  companyView = false,
  style,
  queryInvitationsResult,
  canFilter = true,
  defaultFilter = "PENDING",
}) => {
  const tmpFilter = localStorage.getItem("companiesInvitationsFilter");
  const [invitationsFilter, changeInvitationsFilter] = useState(
    !tmpFilter ? "ALL" : tmpFilter
  );
  const companyId = localStorage.getItem("selectedCompany");

  let queryResult;
  queryResult = useQuery(
    companyView === false ? getMyCompaniesInvitations : getCompaniesInvitations,
    companyView === false
      ? {
          variables: {
            status: canFilter === true ? invitationsFilter : defaultFilter,
          },
        }
      : { variables: { companyId } }
  );
  if (queryInvitationsResult) {
    queryResult = queryInvitationsResult;
  }

  const [invitationModalOpen, setInvitationModalOpen] = React.useState(false);
  const [invitationEmail, setInvitationEmail] = React.useState(null);
  const [inviteNewMember, { loading: inviteNewMemberLoading }] = useMutation(
    mutationInviteNewMember,
    {
      variables: {
        companyId: localStorage.getItem("companyId"),
        invitationEmail,
      },
    }
  );

  const [cancelInvitation] = useMutation(mutationCancelInvitation);

  const [acceptInvitation] = useMutation(mutationAcceptInvitation);

  const [declineInvitation] = useMutation(mutationDeclineInvitation);

  const handleCancel = (invitationId) => {
    cancelInvitation({
      variables: {
        invitationId,
      },
    })
      .then(() => {
        addNotification({
          message: "Invitation annulée",
          description: "L'invitation à bien été annulée",
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      })
      .catch((error) => {
        addNotification({
          message: "L'invitation n'a pas été annulée",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      });
  };

  const handleAccept = (invitationId) => {
    acceptInvitation({
      variables: {
        invitationId,
      },
    })
      .then(() => {
        addNotification({
          message: "Invitation acceptée",
          description: "L'invitation à bien été acceptée",
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch();
      })
      .catch((error) => {
        addNotification({
          message: "L'acceptation de l'invitation n'a pas pu aboutir",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
        queryResult && queryResult.refetch();
      });
  };

  const handleDecline = (invitationId) => {
    declineInvitation({
      variables: {
        invitationId,
      },
    })
      .then(() => {
        addNotification({
          message: "Invitation refusée",
          description: "L'invitation à bien été refusée",
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch();
      })
      .catch((error) => {
        addNotification({
          message: "l'invitation n'a pas été refusée",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
        queryResult && queryResult.refetch();
      });
  };

  if (queryResult && queryResult.error) console.error(queryResult.error);

  const openInvitationEmailModal = () => {
    setInvitationModalOpen(true);
  };
  const closeInvitationEmailModal = () => {
    setInvitationModalOpen(false);
  };
  const inviteMember = () => {
    inviteNewMember({
      variables: { companyId, invitationEmail },
    })
      .then(() => {
        addNotification({
          message: "Utilisateur invité",
          description: `Une invitation a l'adresse email : ${invitationEmail} à été envoyée.`,
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      })
      .catch((error) => {
        addNotification({
          message: "l'Utilisateur n'a pas invité",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      });
    closeInvitationEmailModal();
  };
  const invitationModalFooter = [
    <Button key="close" onClick={() => closeInvitationEmailModal()}>
      Fermer
    </Button>,
  ];
  if (invitationEmail) {
    invitationModalFooter.push(
      <Button
        type={"primary"}
        key="ok"
        onClick={() => inviteMember()}
        loading={inviteNewMemberLoading}
      >
        Envoyer
      </Button>
    );
  }

  const handleChangeFilter = (data) => {
    changeInvitationsFilter(data);
    localStorage.setItem("companiesInvitationsFilter", data);
  };

  let invitationsToPrompt = [];
  if (
    queryResult &&
    queryResult.data &&
    queryResult.data[
      companyView === true
        ? "getCompaniesInvitations"
        : "getMyCompaniesInvitations"
    ]
  )
    invitationsToPrompt = queryResult.data[
      companyView === true
        ? "getCompaniesInvitations"
        : "getMyCompaniesInvitations"
    ]
      .filter((invitation) => {
        return invitationsFilter === "ALL"
          ? true
          : invitationsFilter === invitation.status;
      })
      .sort((invitation1, invitation2) => {
        const date1 = moment(invitation1.createdAt);
        const date2 = moment(invitation2.createdAt);
        return date1.isBefore(date2) ? 1 : -1;
      });

  return (
    <>
      <Card className={"card"} title={<h2>Invitations</h2>} style={style}>
        {canFilter === true && (
          <>
            <div className={"card-header"}>
              <div className={"status-filter"}>
                <label>STATUS DES INVITATIONS</label>
                <Select
                  defaultValue={invitationsFilter}
                  onChange={handleChangeFilter}
                >
                  <Option value="ALL">Toutes</Option>
                  <Option value="PENDING">En attente</Option>
                  <Option value="ACCEPTED">Acceptées</Option>
                  <Option value="DECLINED">Refusées</Option>
                  <Option value="CANCELED">Annulées</Option>
                </Select>
              </div>
              {companyView === true && (
                <Button
                  className={"button"}
                  icon={<MailOutlined />}
                  onClick={openInvitationEmailModal}
                >
                  {"Inviter un nouvel employé"}
                </Button>
              )}
            </div>
            <Divider />
          </>
        )}
        {queryResult && queryResult.loading && <TerradiaLoader />}
        {invitationsToPrompt.map((invitation, index) => {
          return (
            <CompanyInvitationCard
              key={index}
              invitation={invitation}
              companyView={companyView}
              onCancel={handleCancel}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          );
        })}
        {queryResult &&
          (!queryResult.data ||
            queryResult.data[
              companyView === true
                ? "getCompaniesInvitations"
                : "getMyCompaniesInvitations"
            ].length === 0) && (
            <Empty
              style={{
                width: "100%",
              }}
              description={"Aucune invitation pour le moment"} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
      </Card>
      <Modal
        title="Inviter un employé"
        centered
        visible={invitationModalOpen}
        confirmLoading={inviteNewMemberLoading}
        onCancel={closeInvitationEmailModal}
        footer={invitationModalFooter}
      >
        <Input
          value={invitationEmail}
          name={"invitationEmail"}
          placeholder={"E-Mail à inviter"}
          onChange={(data) => {
            setInvitationEmail(data.currentTarget.value);
          }}
        />
      </Modal>
    </>
  );
};

export default InvitationsListCard;
