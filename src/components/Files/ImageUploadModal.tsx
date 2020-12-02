import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { InboxOutlined } from "@ant-design/icons/lib";
import { RcFile, UploadChangeParam } from "antd/lib/upload/interface";
import { useTranslation } from "react-i18next";

const addCompanyImage = graphqlLoader(
  "../../graphql/mutation/addCompanyImage.graphql"
);

interface Props {
  visible?: boolean;
  onClickClose: () => void;
  onUpload?: (
    imageFile: UploadChangeParam,
    uploadedImage?: CompanyImageData
  ) => void; // function called for each upload (on multiple call this function for each element).
  closeAfterUpload?: boolean; // if you want the modal to close when the upload is done.
  oneImageByOne?: boolean; // if you want the user to upload only one image at the time.
}

export declare interface AddCompanyImageData {
  addCompanyImage: CompanyImageData;
}

export declare interface CompanyImageData {
  id: string;
  name: string;
  filename: string;
}

const validImageTypes = ["image/jpeg", "image/png"];

// ⚠️ DO NOT USE THIS COMPONENT ⚠️
// This is a component that is implemented by the ImagesUploadButton
// It is already loaded by it, that means this component should not be used.
const ImageUploadModal: React.FC<Props> = ({ visible, ...props }: Props) => {
  const companyId = localStorage.getItem("selectedCompany");
  const [imageList, setImageList] = useState([]);

  const { t } = useTranslation("common");

  const handleBeforeUpload = (file: RcFile): any => {
    // TODO save in hook the file list. that way, we can set the status of the upload when the mutation is done.
    if (validImageTypes.includes(file.type)) setImageList([...imageList, file]);
  };

  const handleCompleteUpload = (data) => {
    console.log(data);
  };

  const handleErrorUpload = () => {
    // TODO : put a notification showing the error of the server.
    setImageList(
      imageList.map((image) => {
        image.status = "error";
        return image;
      })
    );
  };

  const [mutation] = useMutation<AddCompanyImageData>(addCompanyImage, {
    context: {
      fetchOptions: {
        onUploadProgress: (progress) => {
          setImageList(
            imageList.map((image) => {
              image.percent = (progress.loaded / progress.total) * 100;
              return image;
            })
          );
          console.log(`${(progress.loaded / progress.total) * 100}% uploaded`);
        },
      },
    },
    onCompleted: handleCompleteUpload,
    onError: handleErrorUpload,
  });

  const handleClose = () => {
    setImageList([]);
    if (props.onClickClose) {
      props.onClickClose();
    }
  };

  const handleRemove = (data) => {
    setImageList(imageList.filter((image) => image.uid !== data.uid));
  };

  const handleCustomRequest = (files: UploadChangeParam): void => {
    if (files.file.status !== "uploading") {
      props.onUpload(files);
      return;
    }
    if (validImageTypes.includes(files.file.type)) {
      setImageList(
        imageList.map((image) => {
          image.status = "uploading";
          return image;
        })
      );
      mutation({
        variables: {
          companyId,
          image: files.file.originFileObj,
          name: files.file.name,
        },
      }).then((data) => {
        if (props.onUpload && data && data.data && data.data) {
          imageList.map((image) => {
            image.status = "success";
            return image;
          });
          props.onUpload(files, data.data.addCompanyImage);
        }
      });
    } else {
      // TODO : the user needs to send ONLY png or jpeg => notify there is an error;
    }
  };

  return (
    <Modal
      title={t("FilesPage.Images.addImageModal.modalName")}
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          {t("FilesPage.Images.addImageModal.buttons.close")}
        </Button>,
      ]}
    >
      <Upload.Dragger
        listType={"picture"}
        defaultFileList={[]}
        fileList={imageList}
        action={"#"}
        customRequest={() => {
          return;
        }}
        beforeUpload={handleBeforeUpload}
        onRemove={handleRemove}
        onChange={handleCustomRequest}
        multiple={props.oneImageByOne !== true}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          {t("FilesPage.Images.addImageModal.explanation")}
        </p>
        <p className="ant-upload-hint">
          {t("FilesPage.Images.addImageModal.littleExplanation")}
        </p>
      </Upload.Dragger>
    </Modal>
  );
};

export default ImageUploadModal;
