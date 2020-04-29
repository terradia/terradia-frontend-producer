import React, { useEffect, useState } from "react";
import { Avatar, Card, TimePicker } from "antd";
import EditButton from "../Ui/EditButton";
import SubmitButton from "../Ui/SubmitButton";
import EditInfoForm from "./EditInfoForm";
import { Moment } from "moment";
import "../../assets/Style/CompanyInfo/InfoCard.less";

export declare interface Hours {
  startTime: Moment;
  endTime: Moment;
}

export declare interface Info {
  label: string;
  text?: string;
  icon?: string;
  openHours?: Hours[];
}

declare interface InfoCardProps {
  title: string;
  infos: Info[];
  loading: boolean;
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

const InfoCard = (props: InfoCardProps) => {
  const [infos, setInfos] = useState<React.ReactNode[]>(null);
  const [rawInfo, setRawInfo] = useState<InfoCardProps>(props);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = (values) => {
    const newValues: Info[] = rawInfo.infos;
    const i = 0;

    setIsSubmitting(false);
    setIsEditing(false);
    for (const key in values) {
      if (values[key] !== undefined && typeof values[key] === "string")
        newValues[i] = { label: key, text: values[key] };
      else if (values[key] !== undefined && typeof values[key] !== "string") {
        const existingKey = newValues.find((currentInfo) => {
          return currentInfo.label === key;
        });
        existingKey.openHours = values[key].map((hour: Hours) => {
          return { startTime: hour[0], endTime: hour[1] };
        });
      }

      setRawInfo(prevState => ({
        ...prevState,
        infos: newValues,
      }));
    }
  };

  useEffect(() => {
    setInfos(rawInfo.infos.map(info => (
      <div key={info.label + info.text + info.icon} style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
          <span
            key={info.label}
            style={{
              ...boldTextStyle,
              marginRight: "16px"
            }}
          >
              {info.label}
          </span>
        {
          info.text &&
          <span
            key={info.text}
            style={textStyle}
          >
            {info.text}
          </span>
        }
        {
          info.icon &&
          <>
            <br/>
            <Avatar
              key={info.icon}
              style={{
                marginLeft: "10px",
              }}
              size={64}
              shape={"square"}
              src={info.icon}
            />
          </>
        }
        {
          info.openHours &&
          <>
            {
              info.openHours.map((hour, index) => (
                  <div key={info.label + "-" + index}>
                    <RangePicker className={"ant-picker-borderless picker-input-color"}
                                 bordered={false}
                                 inputReadOnly
                                 disabled
                                 picker={"time"}
                                 value={[hour.startTime, hour.endTime]}
                                 format={"HH:mm"}
                                 suffixIcon={null}
                    />
                    {index !== info.openHours.length - 1 &&
                    <span>
                      {"&"}
                    </span>
                    }
                  </div>
                ),
              )
            }
          </>
        }
      </div>
    )));
  }, [rawInfo]);

  const headerButton = isEditing ?
    <SubmitButton callback={() => setIsSubmitting(true)}/> :
    <EditButton
      callback={() => {
        setIsEditing(true);
      }}
      style={{
        display: "flex",
        justifySelf: "flex-end",
      }}
    />;

  return (
    <div style={{ display: "flex", paddingBottom: 24, maxWidth: "80%" }}>
      <Card
        key={rawInfo.title}
        title={
          <span style={{
            ...boldTextStyle,
            display: "flex",
            flexWrap: "wrap",
            justifySelf: "flex-start",
            alignItems: "center",
          }}>
            {rawInfo.title}
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
        /*style={{
          maxWidth: '300px'
        }}*/
      >
        {
          (isEditing || isSubmitting) &&
          <EditInfoForm infos={rawInfo.infos} isEditing={isEditing} onSubmit={onSubmit}
                        isSubmitting={isSubmitting} setIsEditing={setIsEditing}/>
        }
        {
          !isEditing &&
          [infos]
        }
      </Card>
    </div>
  );
};

export default InfoCard;
