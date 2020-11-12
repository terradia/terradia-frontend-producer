import React, { useEffect, useState } from "react";
import { Form, Input, Upload } from "antd";
import { Info } from "../CompanyInfo/InfoCard";
import EditOfficeHour from "./EditOfficeHour";
import ImageSelectorButton from "../Gallery/ImageSelectorButton";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { CompanyImageData } from "../Files/ImageUploadModal";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";

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

const updateCompany = loader("../../graphql/mutation/updateCompany.graphql");

const EditInfoForm = (props: EditInfoFormProps) => {
  const [form] = Form.useForm();
  const [currentLogo, setCurrentLogo] = useState<UploadFile[]>();
  const [currentCover, setCurrentCover] = useState<UploadFile[]>();
  const [updateCompanyMutation] = useMutation(updateCompany);

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
    } else {
      initialValues[info.slugName] = info.text;
    }
    return null;
  });

  const onUploaded = (
    imageFile: UploadChangeParam,
    uploadedImage: CompanyImageData,
    isLogo: boolean
  ) => {
    if (imageFile.fileList.length === 0) {
      if (isLogo) {
        setCurrentLogo(undefined);
      } else {
        setCurrentCover(undefined);
      }
      return;
    }
    imageFile.fileList[0].percent = 100;
    imageFile.fileList[0].status = "done";
    imageFile.fileList[0].url =
      "https://media.terradia.eu/" + uploadedImage.filename;
    if (isLogo) {
      setCurrentLogo(imageFile.fileList);
      updateCompanyMutation({
        variables: {
          companyId: localStorage.getItem("selectedCompany"),
          newValues: { logoId: uploadedImage.id },
        },
      });
    } else {
      setCurrentCover(imageFile.fileList);
      updateCompanyMutation({
        variables: {
          companyId: localStorage.getItem("selectedCompany"),
          newValues: { coverId: uploadedImage.id },
        },
      });
    }
  };

  const onRemove = (isLogo: boolean) => {
    if (isLogo) {
      setCurrentLogo(undefined);
    } else {
      setCurrentCover(undefined);
    }
  };

  const info = props.infos.map((info) => (
    <div
      className={"hours-container"}
      key={info.label}
      style={{
        marginBottom: "16px",
      }}
    >
      <span style={{ ...boldTextStyle, marginRight: "16px" }}>
        {info.label}
      </span>
      {info.text !== undefined && (
        <Form.Item name={info.slugName}>
          <Input style={textStyle} />
        </Form.Item>
      )}
      {info.icon !== undefined && (
        <Form.Item>
          <ImageSelectorButton
            onlyOneImageByOne
            onUpload={(imageFile, uploadedImage) =>
              onUploaded(imageFile, uploadedImage, info.isLogo)
            }
          />
          {currentLogo && (
            <Upload
              name={info.slugName}
              fileList={info.isLogo ? currentLogo : currentCover}
              listType={"picture"}
              onRemove={() => onRemove(info.isLogo)}
            />
          )}
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
