import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { InboxOutlined } from "@ant-design/icons/lib";
import { RcFile } from "antd/lib/upload/interface";

const addCompanyImage = graphqlLoader(
  "../../graphql/mutation/addCompanyImage.graphql"
);

interface Props {
  visible?: boolean;
  onClickClose: () => void;
  onUpload?: (uploadedImage) => void; // function called for each upload (on multiple call this function for each element).
  closeAfterUpload?: boolean; // if you want the modal to close when the upload is done.
  oneImageByOne?: boolean; // if you want the user to upload only one image at the time.
}

const validImageTypes = ["image/jpeg", "image/png"];

// ⚠️ DO NOT USE THIS COMPONENT ⚠️
// This is a component that is implemented by the ImagesUploadButton
// It is already loaded by it, that means this component should not be used.
const ImageUploadModal: React.FC<Props> = ({ visible, ...props }: Props) => {
  // TODO : translate the Modal content
  const companyId = localStorage.getItem("selectedCompany");
  const [imageList, setImageList] = useState([]);

  const handleBeforeUpload = (file: RcFile): any => {
    // TODO save in hook the file list. that way, we can set the status of the upload when the mutation is done.
    if (validImageTypes.includes(file.type)) setImageList([...imageList, file]);
  };

  const handleCompleteUpload = (data) => {
    console.log(data);
  };

  const handleErrorUpload = (data) => {
    // TODO : put a notification showing the error of the server.
    setImageList(
      imageList.map((image) => {
        image.status = "error";
        return image;
      })
    );
    console.log("error uploading the image(s) : ", data);
  };

  const [mutation] = useMutation(addCompanyImage, {
    variables: {},
    onCompleted: handleCompleteUpload,
    onError: handleErrorUpload,
  });

  const handleClose = () => {
    setImageList([]);
    props.onClickClose();
  };

  const handleRemove = (data) => {
    setImageList(imageList.filter((image) => image.uid !== data.uid));
  };

  const handleCustomRequest = (data): any => {
    if (data.file.status !== "uploading") return;
    const file: File = data.file.originFileObj;
    if (validImageTypes.includes(file.type)) {
      mutation({
        variables: {
          companyId,
          image: file,
          name: file.name,
        },
      }).then(() => {
        props.onUpload(file);
      });
    } else {
      // TODO : the user needs to send ONLY png or jpeg => notify there is an error;
    }
  };

  return (
    <Modal
      title="Téléverser des images"
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Fermer
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
          Cliquez ici pour choisir les images ou glissez - déposez les
          directement dans la zone
        </p>
        <p className="ant-upload-hint">
          Fonctionne avec un ou plusieurs fichiers.
        </p>
      </Upload.Dragger>
    </Modal>
  );
};

export default ImageUploadModal;
