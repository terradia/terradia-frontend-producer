import React, { useState } from "react";
import { Input, Form, Upload } from "antd";
import "../../assets/Style/Login-Register/registerForm.less";
import ImagesUploadButton from "../Files/ImagesUploadButton";
import { AddCompanyImageData } from "../Files/ImageUploadModal";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

declare interface GeneralInfoFormProps {
  onUpload: (
    imageFile: UploadChangeParam,
    uploadedImage: AddCompanyImageData,
    type: "logo" | "cover"
  ) => void;
}

const GeneralInfoForm = (props: GeneralInfoFormProps) => {
  const [currentLogo, setCurrentLogo] = useState<UploadFile[]>();
  const [currentCover, setCurrentCover] = useState<UploadFile[]>();

  const onLogoUploaded = (
    imageFile: UploadChangeParam,
    uploadedImage: AddCompanyImageData
  ) => {
    console.log(imageFile);
    if (imageFile.fileList.length === 0) {
      setCurrentLogo(undefined);
      return;
    }
    imageFile.fileList[0].percent = 100;
    imageFile.fileList[0].status = "done";
    imageFile.fileList[0].url =
      "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
      uploadedImage.addCompanyImage.filename;
    setCurrentLogo(imageFile.fileList);
    props.onUpload(imageFile, uploadedImage, "logo");
  };

  const onCoverUpload = (
    imageFile: UploadChangeParam,
    uploadedImage: AddCompanyImageData
  ) => {
    if (imageFile.fileList.length === 0) {
      setCurrentCover(undefined);
      return;
    }
    imageFile.fileList[0].percent = 100;
    imageFile.fileList[0].status = "done";
    imageFile.fileList[0].url =
      "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
      uploadedImage.addCompanyImage.filename;
    setCurrentCover(imageFile.fileList);
    props.onUpload(imageFile, uploadedImage, "cover");
  };

  const onLogoRemove = () => {
    setCurrentLogo(undefined);
  };

  const onCoverRemove = () => {
    setCurrentCover(undefined);
  };

  return (
    <>
      <Form.Item name={"description"}>
        <Input.TextArea
          className={"input_item"}
          placeholder={"Description courte (300 caractères)"}
          onChange={(event) => {
            if (event.currentTarget.value.length === 300) return false;
          }}
        />
      </Form.Item>
      <Form.Item>
        <ImagesUploadButton onUpload={onLogoUploaded} />
        {currentLogo && (
          <Upload
            fileList={currentLogo}
            listType={"picture"}
            onRemove={onLogoRemove}
          />
        )}
      </Form.Item>
      <Form.Item>
        <ImagesUploadButton onUpload={onCoverUpload} />
        {currentCover && (
          <Upload
            fileList={currentCover}
            listType={"picture"}
            onRemove={onCoverRemove}
          />
        )}
      </Form.Item>
    </>
  );
};

export default GeneralInfoForm;