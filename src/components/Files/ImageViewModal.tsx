import React, { useState } from "react";
import { Button, Card, Divider, Empty, Input, Modal } from "antd";
import { CompanyImage } from "../../interfaces/CompanyImage";
import { useTranslation } from "react-i18next";

interface Props {
  visible?: boolean;
  onClickClose: () => void;
  onImageUpdate?: (name: string) => void; // function to update the name. if not given, the user cannot update the name of the image.
  companyImage?: CompanyImage;
}

const ImageViewModal: React.FC<Props> = ({
  visible = false,
  companyImage,
  onClickClose,
  onImageUpdate,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
  const originalValue = companyImage.name
    ? companyImage.name
    : companyImage.filename;
  const [companyImageName, setName] = useState(originalValue);

  const handleClose = (reset = true) => {
    if (reset === true) setName(originalValue);
    onClickClose();
  };

  const { t } = useTranslation("common");

  const footer = [
    <Button key="close" onClick={() => handleClose()}>
      {t("FilesPage.Images.editImageModal.buttons.close")}
    </Button>,
  ];

  if (companyImageName !== originalValue) {
    footer.push(
      <Button
        type={"primary"}
        key="submit"
        onClick={() => {
          handleClose(false);
          onImageUpdate(companyImageName);
        }}
      >
        {t("FilesPage.Images.editImageModal.buttons.saveAndClose")}
      </Button>
    );
  }

  return (
    <Modal
      className={"company-image-view modal"}
      title={companyImage.name ? companyImage.name : companyImage.filename}
      visible={visible}
      onCancel={onClickClose}
      footer={footer}
    >
      <div className={"column1"}>
        <Card
          key={companyImage.filename}
          className={"company-image-card"}
          cover={
            <img
              alt={companyImage.filename}
              src={`https://media.terradia.eu/${companyImage.filename}`}
            />
          }
          bodyStyle={{ height: 0, padding: 0 }}
        />
      </div>
      <div className={"column2"}>
        <div>
          <span className={"title"}>
            {t("FilesPage.Images.editImageModal.name")}
          </span>
          {onImageUpdate ? (
            <Input
              name={t("FilesPage.Images.editImageModal.name")}
              className={"image-name-input"}
              onChange={(event: { target: { value: string } }) => {
                setName(event.target.value);
              }}
              value={companyImageName}
            />
          ) : (
            companyImageName
          )}
        </div>
        <Divider />
        <div>
          <span className={"title"}>
            {t("FilesPage.Images.editImageModal.uses")}
          </span>
          {companyImage.products && companyImage.products.length > 0 ? (
            <ul>
              {companyImage.products.map((product) => {
                return <li key={product.id}>{product.name}</li>;
              })}
            </ul>
          ) : (
            <Empty
              description={t("FilesPage.Images.editImageModal.noUses")}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageViewModal;
