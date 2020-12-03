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
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("common");

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
          message: t(
            "Components.InvitationListCard.messages.invitationCanceled"
          ),
          description: t(
            "Components.InvitationListCard.description.invitationCanceled"
          ),
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      })
      .catch((error) => {
        addNotification({
          message: t("Components.InvitationListCard.messages.notCanceled"),
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
          message: t(
            "Components.InvitationListCard.messages.invitationAccepted"
          ),
          description: t(
            "Components.InvitationListCard.description.invitationCanceled"
          ),
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch();
      })
      .catch((error) => {
        addNotification({
          message: t("Components.InvitationListCard.messages.notAccepted"),
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
          message: t(
            "Components.InvitationListCard.messages.invitationDeclined"
          ),
          description: t(
            "Components.InvitationListCard.description.invitationDeclined"
          ),
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch();
      })
      .catch((error) => {
        addNotification({
          message: t("Components.InvitationListCard.messages.notDeclined"),
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
          message: t("Components.InvitationListCard.messages.userInvitated"),
          description: `${t(
            "Components.InvitationListCard.description.userInvitated"
          )}${invitationEmail}`,
          icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
        });
        queryResult && queryResult.refetch({ companyId });
      })
      .catch((error) => {
        addNotification({
          message: t("Components.InvitationListCard.messages.notInvitated"),
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
                <label>{t("Components.InvitationListCard.status.name")}</label>
                <Select
                  defaultValue={invitationsFilter}
                  onChange={handleChangeFilter}
                >
                  <Option value="ALL">
                    {t("Components.InvitationListCard.status.all")}
                  </Option>
                  <Option value="PENDING">
                    {t("Components.InvitationListCard.status.pending")}
                  </Option>
                  <Option value="ACCEPTED">
                    {t("Components.InvitationListCard.status.accepted")}
                  </Option>
                  <Option value="DECLINED">
                    {t("Components.InvitationListCard.status.declined")}
                  </Option>
                  <Option value="CANCELED">
                    {t("Components.InvitationListCard.status.canceled")}
                  </Option>
                </Select>
              </div>
              {companyView === true && (
                <Button
                  className={"button"}
                  icon={<MailOutlined />}
                  onClick={openInvitationEmailModal}
                >
                  {t("Components.InvitationListCard.status.button")}
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
              description={t(
                "Components.InvitationListCard.modal.noInvitations"
              )} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
      </Card>
      <Modal
        title={t("Components.InvitationListCard.modal.title")}
        centered
        visible={invitationModalOpen}
        confirmLoading={inviteNewMemberLoading}
        onCancel={closeInvitationEmailModal}
        footer={invitationModalFooter}
      >
        <Input
          value={invitationEmail}
          name={"invitationEmail"}
          placeholder={t("Components.InvitationListCard.modal.emailToInvite")}
          onChange={(data) => {
            setInvitationEmail(data.currentTarget.value);
          }}
        />
      </Modal>
    </>
  );
};

export default InvitationsListCard;
