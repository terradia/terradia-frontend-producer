import React from "react";
import { CompanyInvitation } from "../../interfaces/CompanyInvitation";
import Button from "../Ui/Button";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons/lib";
import { Tooltip } from "antd";
import moment from 'moment';

interface Props {
  invitation: CompanyInvitation;
}

const CompanyInvitationCard: React.FC<Props> = ({
  invitation,
  ...props
}: Props) => {
  return (
    <div className={"card"}>
      <div className={"first-part"}>
        <div className={"data"}>
          <label>{"INVITATION DE"}</label>
          <div>{`${invitation.fromUser.firstName} ${invitation.fromUser.lastName}`}</div>
        </div>
        <div className={"data"}>
          <label>{"POUR L'ENTREPRISE"}</label>
          <div>{invitation.company.name}</div>
        </div>
        <div className={"data"}>
          <label>{"DATE DE L'INVITATION"}</label>
          <div>{moment(invitation.createdAt).format("DD/MM/YYYY")}</div>
        </div>
      </div>
      <div className={"second-part"}>
        {invitation.status === "PENDING" && (
          <>
            <Tooltip placement="top" title={"Accepter l'invitation"}>
              <Button
                type={"link"}
                icon={<CheckCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
            <Tooltip placement="top" title={"Refuser l'invitation"}>
              <Button
                type={"link"}
                danger
                icon={<CloseCircleOutlined />}
                size={"large"}
              />
            </Tooltip>
          </>
        )}
        {invitation.status === "ACCEPTED" && (
          <div className={"accepted-icon response-icon"}>
            <CheckCircleOutlined />
          </div>
        )}
        {invitation.status === "DECLINED" && (
          <div className={"declined-icon response-icon"}>
            <CloseCircleOutlined
              style={{
                color: "#f5222d",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInvitationCard;
