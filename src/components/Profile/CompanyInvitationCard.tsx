import React from "react";
import { CompanyInvitation } from "../../interfaces/CompanyInvitation";
import Button from "../Ui/Button";
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  CloseCircleOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons/lib";
import { Tooltip } from "antd";
import moment from "moment";
import "../../assets/Style/Profile/invitationCard.less";
import { useTranslation } from "react-i18next";

interface Props {
  invitation: CompanyInvitation;
  companyView?: boolean;
  onCancel?: (invitationId: string) => void;
  onAccept?: (invitationId: string) => void;
  onDecline?: (invitationId: string) => void;
}

const CompanyInvitationCard: React.FC<Props> = ({
  invitation,
  companyView = false,
  onCancel,
  onAccept,
  onDecline,
}: Props) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`invitation-card card ${
        invitation.status !== "PENDING" ? "disabled" : ""
      }`}
    >
      <div className={"first-part"}>
        <div className={"data"}>
          <label>{t("Components.CompanyInvitationCard.from")}</label>
          <div>{`${invitation.fromUser.firstName} ${invitation.fromUser.lastName}`}</div>
        </div>
        {!companyView ? (
          <div className={"data"}>
            <label>{t("Components.CompanyInvitationCard.for")}</label>
            <div>{invitation.company.name}</div>
          </div>
        ) : (
          <div className={"data"}>
            <label>{t("Components.CompanyInvitationCard.email")}</label>
            <div>{invitation.invitationEmail}</div>
          </div>
        )}
        <div className={"data"}>
          <label>{t("Components.CompanyInvitationCard.date")}</label>
          <div>{moment(invitation.createdAt).format("DD/MM/YYYY")}</div>
        </div>
        {companyView === true && (
          <div className={"data"}>
            <label>{t("Components.CompanyInvitationCard.status")}</label>
            <div>{invitation.status}</div>
          </div>
        )}
      </div>
      <div className={"second-part"}>
        {invitation.status === "PENDING" && companyView === false ? (
          <>
            <Tooltip
              placement="top"
              title={t("Components.CompanyInvitationCard.accept")}
            >
              <Button
                type={"link"}
                onClick={() => onAccept && onAccept(invitation.id)}
                icon={<CheckCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
            <Tooltip
              placement="top"
              title={t("Components.CompanyInvitationCard.decline")}
            >
              <Button
                type={"link"}
                onClick={() => onDecline && onDecline(invitation.id)}
                danger
                icon={<CloseCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
          </>
        ) : (
          <>
            {invitation.status === "PENDING" && (
              <Tooltip
                placement="top"
                title={t("Components.CompanyInvitationCard.cancel")}
              >
                <Button
                  type={"link"}
                  onClick={() => onCancel && onCancel(invitation.id)}
                  danger
                  icon={<CloseCircleOutlined />}
                  size={"large"}
                />
              </Tooltip>
            )}
          </>
        )}
        {invitation.status === "ACCEPTED" && (
          <div className={"accepted-icon response-icon"}>
            <CheckSquareOutlined />
          </div>
        )}
        {invitation.status === "DECLINED" && (
          <div className={"declined-icon response-icon"}>
            <CloseSquareOutlined style={{ color: "#f5222d" }} />
          </div>
        )}
        {invitation.status === "CANCELED" && (
          <div className={"declined-icon response-icon"}>
            <CloseSquareOutlined style={{ color: "#faad14" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInvitationCard;
