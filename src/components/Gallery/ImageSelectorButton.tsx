import React, { useState } from "react";
import Button from "../Ui/Button";
import ImageSelectorModal from "./ImageSelectorModal";
import { FileImageOutlined } from "@ant-design/icons/lib";
import CompanyImage from "../../interfaces/CompanyImage";
import { UploadChangeParam } from "antd/lib/upload";
import { CompanyImageData } from "../Files/ImageUploadModal";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { ButtonType } from "antd/es/button";

interface Props {
  onCloseModal?: () => void; // called when the modal is closed
  onOpenModal?: () => void; // called when the modal is opened
  // shouldCloseAfterUpload?: boolean; // if you want the modal to close when the upload is done (auto select the image(s) uploaded).
  onValidate?: (selectedImages: [CompanyImage]) => void; // this function is called when the modal is validated (there are selected images)
  onlyOneImageByOne?: boolean; // if you want the user to upload / select only one image at the time.
  onUpload?: (
    imageFile: UploadChangeParam,
    uploadedImage?: CompanyImageData
  ) => void;
  customText?: string;
  customIcon?: React.PureComponent | any;
  accentColor?: string;
  size?: SizeType;
  type?: ButtonType;
  title?: string;
}

const ImageSelectorButton: React.FC<Props> = ({
  onOpenModal,
  onCloseModal,
  onValidate,
  onlyOneImageByOne = false,
  onUpload,
  customText,
  customIcon,
  accentColor,
  size,
  type,
  title,
  ...props
}: Props) => {
  const [modalVisible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    onCloseModal && onCloseModal();
  };

  const handleOpen = () => {
    setVisible(true);
    onOpenModal && onOpenModal();
  };

  return (
    <>
      <Button
        text={
          customText !== undefined
            ? customText
            : onlyOneImageByOne === true
            ? "Séléctionner une image"
            : "Séléctionner des images"
        }
        icon={customIcon ? customIcon : <FileImageOutlined />}
        onClick={handleOpen}
        accentColor={accentColor}
        size={size}
        type={type}
        {...props}
      />
      <ImageSelectorModal
        visible={modalVisible}
        customTitle={title}
        onClickClose={handleClose}
        onValidate={onValidate}
        onlyOneImageByOne={onlyOneImageByOne}
        onUpload={onUpload}
        {...props}
      />
    </>
  );
};

export default ImageSelectorButton;
