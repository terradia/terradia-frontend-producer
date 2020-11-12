import React, { useState } from "react";
import { Avatar, Button, Card, TimePicker } from "antd";
import EditInfoForm from "./EditInfoForm";
import { Moment } from "moment";
import "../../assets/Style/CompanyPage/CompanyHoursCard.less";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";
import { CheckOutlined, EditOutlined } from "@ant-design/icons/lib";
import { useTranslation } from "react-i18next";

export declare interface Hours {
  startTime: any;
  endTime: any;
}

export declare interface Info {
  slugName?: string;
  label: string;
  text?: string;
  icon?: string;
  isLogo?: boolean;
  daySlugName?: string;
  openHours?: Hours[];
}

declare interface Props {
  infos: Info[];
  loading: boolean;
  refetch: () => void;
  isDelivery?: boolean;
}

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 400,
  fontSize: "normal",
  color: "#575757",
  flexShrink: 0,
};

const { RangePicker } = TimePicker;
const addOpeningDay = loader("../../graphql/mutation/addOpeningDay.graphql");
const addDeliveryDay = loader("../../graphql/mutation/addDeliveryDay.graphql");
const updateCompany = loader("../../graphql/mutation/updateCompany.graphql");

const CompanyOpenHoursCard = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [addOpeningDayMutation] = useMutation(addOpeningDay);
  const [addDeliveryDayMutation] = useMutation(addDeliveryDay);
  const [updateCompanyMutation] = useMutation(updateCompany);

  const { t } = useTranslation("common");

  const updateOpenHours = async (values) => {
    for (const key in values) {
      if (values[key] !== undefined && typeof values[key] !== "string") {
        const existingKey = props.infos.find((currentInfo) => {
          return currentInfo.daySlugName === key;
        });
        if (!existingKey.openHours.length && !values[key].length) continue;
        values[key] = values[key].filter((hour) => hour !== undefined);
        existingKey.openHours = values[key].map((hour: [Moment, Moment]) => {
          if (hour === null) return null;
          return { startTime: hour[0].utc(true), endTime: hour[1].utc(true) };
        });
        if (props.isDelivery) {
          await addDeliveryDayMutation({
            variables: {
              companyId: localStorage.getItem("selectedCompany"),
              day: key,
              hours: existingKey.openHours,
            },
          });
        } else {
          await addOpeningDayMutation({
            variables: {
              companyId: localStorage.getItem("selectedCompany"),
              day: key,
              hours: existingKey.openHours,
            },
          });
        }
      }
    }
  };

  const onSubmit = async (values) => {
    setIsSubmitting(false);
    setIsEditing(false);
    if (props.infos[0].openHours) {
      return updateOpenHours(values);
    }
    await updateCompanyMutation({
      variables: {
        companyId: localStorage.getItem("selectedCompany"),
        newValues: values,
      },
    });
    props.refetch();
  };

  const headerButton = isEditing ? (
    <Button icon={<CheckOutlined />} onClick={() => setIsSubmitting(true)} />
  ) : (
    <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
  );

  return (
    <Card
      title={
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifySelf: "flex-start",
            alignItems: "center",
          }}
        >
          <h2>
            {props.isDelivery
              ? "Horaires de livraison"
              : "Horaires d'ouverture"}
          </h2>
          {/* TODO : translate this. */}
        </span>
      }
      bordered={false}
      headStyle={{ display: "flex", flexWrap: "wrap", flexFlow: "column" }}
      extra={headerButton}
      loading={props.loading}
      className={"company-hours-card"}
      bodyStyle={{
        display: "flex",
        flexFlow: "column",
      }}
    >
      {(isEditing || isSubmitting) && (
        <EditInfoForm
          infos={props.infos}
          isEditing={isEditing}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          setIsEditing={setIsEditing}
        />
      )}
      {!isEditing &&
        props.infos.map((info) => (
          <div
            className={"hours-container"}
            key={info.label + info.text + info.icon}
            style={{}}
          >
            <span
              key={info.label}
              style={{
                marginRight: "16px",
              }}
            >
              {t(info.label)}
            </span>
            {info.text && (
              <span key={info.text} style={textStyle}>
                {info.text}
              </span>
            )}
            {info.icon && (
              <>
                <br />
                <Avatar
                  key={info.icon}
                  style={{
                    marginLeft: "10px",
                  }}
                  size={64}
                  shape={"square"}
                  src={"https://media.terradia.eu/" + info.icon}
                />
              </>
            )}
            {info.openHours && (
              <div className={"hours-container"}>
                {info.openHours.map((hour, index) => (
                  <div key={info.label + "-" + index}>
                    <RangePicker
                      className={"ant-picker-borderless picker-input-color"}
                      bordered={false}
                      inputReadOnly
                      disabled
                      value={[hour.startTime, hour.endTime]}
                      format={"HH:mm"}
                      suffixIcon={null}
                    />
                    {index !== info.openHours.length - 1 && <span>{"&"}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </Card>
  );
};

export default CompanyOpenHoursCard;
