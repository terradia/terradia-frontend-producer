import React, { useState } from "react";
import { Avatar, Card, TimePicker } from "antd";
import EditButton from "../Ui/EditButton";
import SubmitButton from "../Ui/SubmitButton";
import EditInfoForm from "./EditInfoForm";
import { Moment } from "moment";
import "../../assets/Style/CompanyInfo/InfoCard.less";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";

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

declare interface InfoCardProps {
  title: string;
  infos: Info[];
  loading: boolean;
  refetch: () => void;
}

declare interface UpdateCompanyInput {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  siren?: string;
  logoId?: string;
  coverId?: string;
}

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 400,
  fontSize: "normal",
  color: "#575757",
  flexShrink: 0,
};

const boldTextStyle = {
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "normal",
  color: "#828282",
};

const { RangePicker } = TimePicker;
const addOpeningDay = loader("../../graphql/mutation/addOpeningDay.graphql");
const updateCompany = loader("../../graphql/mutation/updateCompany.graphql");

const InfoCard = (props: InfoCardProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [addOpeningDayMutation] = useMutation(addOpeningDay);
  const [updateCompanyMutation] = useMutation(updateCompany);

  const updateOpenHours = async (values) => {
    for (const key in values) {
      if (values[key] !== undefined && typeof values[key] !== "string") {
        const existingKey = props.infos.find((currentInfo) => {
          return currentInfo.daySlugName === key;
        });
        console.log(values[key]);
        if (!existingKey.openHours.length && !values[key].length) continue;
        values[key] = values[key].filter((hour) => hour !== undefined);
        existingKey.openHours = values[key].map((hour: [Moment, Moment]) => {
          if (hour === null) return null;
          return { startTime: hour[0].utc(true), endTime: hour[1].utc(true) };
        });
        await addOpeningDayMutation({
          variables: {
            companyId: localStorage.getItem("selectedCompany"),
            day: key,
            hours: existingKey.openHours,
          },
        });
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
    <SubmitButton callback={() => setIsSubmitting(true)} />
  ) : (
    <EditButton
      callback={() => {
        setIsEditing(true);
      }}
      style={{
        display: "flex",
        justifySelf: "flex-end",
      }}
    />
  );

  return (
    <div style={{ display: "flex", paddingBottom: 24, maxWidth: "80%" }}>
      <Card
        key={props.title}
        title={
          <span
            style={{
              ...boldTextStyle,
              display: "flex",
              flexWrap: "wrap",
              justifySelf: "flex-start",
              alignItems: "center",
            }}
          >
            {props.title}
          </span>
        }
        bordered={false}
        headStyle={{ display: "flex", flexWrap: "wrap", flexFlow: "column" }}
        extra={headerButton}
        loading={props.loading}
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
              key={info.label + info.text + info.icon}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                key={info.label}
                style={{
                  ...boldTextStyle,
                  marginRight: "16px",
                }}
              >
                {info.label}
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
                    src={
                      "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
                      info.icon
                    }
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
                        picker={"time"}
                        value={[hour.startTime, hour.endTime]}
                        format={"HH:mm"}
                        suffixIcon={null}
                      />
                      {index !== info.openHours.length - 1 && (
                        <span>{"&"}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </Card>
    </div>
  );
};

export default InfoCard;
