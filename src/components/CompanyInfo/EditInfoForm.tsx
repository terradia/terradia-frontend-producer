import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Info } from "./InfoCard";
import EditOfficeHour from "./EditOfficeHour";
import ImageSelectorButton from "../Gallery/ImageSelectorButton";

declare interface EditInfoFormProps {
  infos: Info[];
  onSubmit: (values) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isSubmitting: boolean;
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

const EditInfoForm = (props: EditInfoFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.isSubmitting === true) {
      form.submit();
    }
  }, [props.isSubmitting, form]);

  const initialValues = {};
  props.infos.forEach((info) => {
    if (info.openHours) {
      const initialHours = [];
      info.openHours.forEach((hour) => {
        return initialHours.push([hour.startTime, hour.endTime]);
      });
      initialValues[info.daySlugName] = initialHours;
    }
    return null;
  });

  const info = props.infos.map((info) => (
    <div
      key={info.label}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "16px",
      }}
    >
      <span style={{ ...boldTextStyle, marginRight: "16px" }}>
        {info.label}
      </span>
      {info.text !== undefined && (
        <Form.Item name={info.label}>
          <Input placeholder={info.text} style={textStyle} />
        </Form.Item>
      )}
      {info.icon !== undefined && (
        <Form.Item>
          <ImageSelectorButton onlyOneImageByOne />
        </Form.Item>
      )}
      {info.openHours && (
        <EditOfficeHour
          day={info.label}
          daySlugName={info.daySlugName}
          openHours={info.openHours}
          form={form}
        />
      )}
    </div>
  ));

  return (
    <Form
      form={form}
      scrollToFirstError
      onFinish={props.onSubmit}
      initialValues={initialValues}
      layout={"inline"}
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexFlow: "column",
      }}
    >
      {info}
    </Form>
  );
};
export default EditInfoForm;
