import React, { useState } from "react";
import { Avatar, Card, Popover } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import "../../assets/Style/CompanySelector/CompanyCard.less";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { useTranslation } from "react-i18next";

const restoreCompanyMutation = graphqlLoader(
  "../../graphql/mutation/restoreCompany.graphql"
);

const textStyle = {
  fontWeight: 600,
  fontSize: "larger",
  color: "#575757",
  flexShrink: 0,
};

declare interface CompanyCardProps {
  id: string;
  selected: boolean;
  loading?: boolean;
  name?: string;
  cover?: string;
  logo?: string;
  onClick: (arg: string) => void;
  create?: boolean;
  archivedAt?: string | null;
}

const CompanyCard = ({
  id,
  selected = false,
  loading = false,
  name,
  logo,
  onClick,
  create,
  archivedAt,
}: CompanyCardProps) => {
  const [archived, setArchived] = useState(!!archivedAt);
  const [restoreCompany] = useMutation(restoreCompanyMutation);
  const { t } = useTranslation("common");

  const onClickHandler = () => {
    if (archived) {
      restoreCompany({
        variables: { companyId: id },
      }).then((data) => {
        if (data) {
          onClick(id);
          setArchived(false);
        }
      });
    } else {
      onClick(id);
    }
  };

  const deleteIn = () => {
    const archived = moment(archivedAt).add(30, "days");
    const nowDate = moment();
    return archived.diff(nowDate, "days");
  };

  const card = (
    <Card
      style={{
        width: 250,
        height: 250,
        margin: "24px",
        border: "solid ",
        borderColor: selected ? "#00c537" : "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClickHandler}
      loading={loading}
      cover={
        create
          ? null
          : logo && (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
                alt={"profile"}
                src={logo}
              />
            )
      }
      bodyStyle={{
        display: create || !logo ? "flex" : "none",
      }}
    >
      {(create || !logo) && (
        <Avatar
          size={200}
          shape={"square"}
          alt={"profile"}
          icon={create ? <PlusOutlined /> : <UserOutlined />}
        />
      )}
    </Card>
  );

  console.log(name);
  if (archived) {
    return (
      <div
        className={"archived"}
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Popover
          content={t("CompanySelectionPage.CompanyCard.dataDeletionWarning", {
            delay: deleteIn(),
          })}
        >
          {card}
        </Popover>
        <span style={textStyle}>
          {name ? name : t("CompanySelectionPage.CompanyCard.register")}
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {card}
        <span style={textStyle}>
          {name ? name : t("CompanySelectionPage.CompanyCard.register")}
        </span>
      </div>
    );
  }
};

export default CompanyCard;
