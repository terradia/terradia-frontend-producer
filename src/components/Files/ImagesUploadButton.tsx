import React, { useState } from "react";
import Button from "../Ui/Button";
import { UploadOutlined } from "@ant-design/icons/lib";
import ImageUploadModal, { CompanyImageData } from "./ImageUploadModal";
import { UploadChangeParam } from "antd/lib/upload";
import { useTranslation } from "react-i18next";

interface Props {
  onCloseModalCallBack?: () => void; // called when the modal is closed
  onOpenModalCallBack?: () => void; // called when the modal is opened
  onUpload?: (
    imageFile: UploadChangeParam,
    uploadedImage?: CompanyImageData
  ) => void; // function called for each upload (on multiple call this function for each element).
  closeAfterUpload?: boolean; // if you want the modal to close when the upload is done.
  oneImageByOne?: boolean; // if you want the user to upload only one image at the time.
}

const ImagesUploadButton: React.FC<Props> = ({
  oneImageByOne = false,
  closeAfterUpload = false,
  ...props
}: Props) => {
  const [uploadImagesModalVisible, setUploadImagesModalVisible] = useState(
    false
  );

  const { t } = useTranslation("common");

  const handleClose = () => {
    setUploadImagesModalVisible(false);
    props.onCloseModalCallBack && props.onCloseModalCallBack();
  };

  const handleOpen = () => {
    setUploadImagesModalVisible(true);
    props.onOpenModalCallBack && props.onOpenModalCallBack();
  };

  return (
    <>
      <Button
        text={
          oneImageByOne === true
            ? t("FilesPage.Images.buttons.loadImage")
            : t("FilesPage.Images.buttons.loadImages")
        }
        icon={<UploadOutlined />}
        onClick={handleOpen}
      />
      <ImageUploadModal
        visible={uploadImagesModalVisible}
        onClickClose={handleClose}
        onUpload={props.onUpload}
        oneImageByOne={oneImageByOne}
        closeAfterUpload={closeAfterUpload}
      />
    </>
  );
};

export default ImagesUploadButton;
