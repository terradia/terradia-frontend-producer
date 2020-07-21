import React, { useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons/lib";
import { Card } from "antd";
import ImageViewModal from "./ImageViewModal";
import { CompanyImage } from "../../interfaces/CompanyImage";
import ImageRemoveConfirmModal from "./ImageRemoveConfirmModal";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";

interface Props {
  companyImage: CompanyImage;
  onOpenViewModal?: () => void;
  onCloseViewModal?: () => void;
  onOpenRemoveModal?: () => void;
  onCloseRemoveModal?: () => void;
  onRemove?: () => void;
  onUpdate?: () => void;
}

const removeCompanyImage = graphqlLoader(
  "../../graphql/mutation/removeCompanyImage.graphql"
);

const updateImageName = graphqlLoader(
  "../../graphql/mutation/updateCompanyImage.graphql"
);

const ImageCard: React.FC<Props> = ({
  companyImage,
  onOpenViewModal,
  onCloseViewModal,
  onOpenRemoveModal,
  onCloseRemoveModal,
  onRemove,
  onUpdate,
  ...props
}: Props) => {
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);

  const handleOpenViewModal = () => {
    onOpenViewModal && onOpenViewModal();
    setViewModalVisible(true);
  };
  const handleCloseViewModal = () => {
    onCloseViewModal && onCloseViewModal();
    setViewModalVisible(false);
  };
  const handleOpenRemoveModal = () => {
    onOpenRemoveModal && onOpenRemoveModal();
    setRemoveModalVisible(true);
  };
  const handleCloseRemoveModal = () => {
    onCloseRemoveModal && onCloseRemoveModal();
    setRemoveModalVisible(false);
  };

  const [removeImageMutation] = useMutation(removeCompanyImage, {
    variables: { imageId: companyImage.id },
    onCompleted: () => {
      onRemove && onRemove();
      handleCloseViewModal();
    },
    onError: (error) => console.log(error), // TODO : notify the user of the error
  });

  const [updateImageNameMutation] = useMutation(updateImageName, {
    variables: { imageId: companyImage.id, name: "" },
    onCompleted: () => {
      onUpdate && onUpdate();
      handleCloseViewModal();
    },
    onError: (error) => console.log(error), // TODO : notify the user of the error
  });

  const handleConfirmRemove = () => removeImageMutation();
  const handleUpdateName = (name: string) =>
    updateImageNameMutation({ variables: { imageId: companyImage.id, name } });

  return (
    <>
      <Card
        key={companyImage.filename}
        className={"company-image-card"}
        cover={
          <img
            onClick={handleOpenViewModal}
            alt={companyImage.filename}
            src={`https://media.terradia.eu/${companyImage.filename}`}
          />
        }
        bodyStyle={{ height: 0, padding: 0 }}
        actions={[
          <EyeOutlined key={"eye"} onClick={handleOpenViewModal} />,
          <DeleteOutlined
            key={"delete"}
            style={{ color: "#f5222d" }}
            onClick={handleOpenRemoveModal}
          />,
        ]}
      />
      <ImageViewModal
        visible={isViewModalVisible}
        companyImage={companyImage}
        onImageUpdate={handleUpdateName}
        onClickClose={handleCloseViewModal}
      />
      <ImageRemoveConfirmModal
        visible={isRemoveModalVisible}
        companyImage={companyImage}
        onClickClose={handleCloseRemoveModal}
        onClickConfirm={handleConfirmRemove}
      />
    </>
  );
};

export default ImageCard;
