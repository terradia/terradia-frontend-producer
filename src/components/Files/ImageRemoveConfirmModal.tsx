import React from "react";
import { Button, Card, Divider, Empty, Modal } from "antd";
import { CompanyImage } from "../../interfaces/CompanyImage";
import { useTranslation } from "react-i18next";

interface Props {
  visible?: boolean;
  onClickClose: () => void;
  onClickConfirm: () => void;
  companyImage?: CompanyImage;
}

const ImageRemoveConfirmModal: React.FC<Props> = ({
  visible = false,
  companyImage,
  onClickClose,
  onClickConfirm,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
  const { t } = useTranslation("common");
  return (
    <Modal
      className={"company-image-remove modal"}
      title={`${t("FilesPage.Images.removeImageModal.delete")}"${
        companyImage.name ? companyImage.name : companyImage.filename
      }"`}
      visible={visible}
      onCancel={onClickClose}
      footer={[
        <Button key="close" onClick={onClickClose}>
          {t("FilesPage.Images.removeImageModal.buttons.cancel")}
        </Button>,
        <Button key="submit" danger onClick={onClickConfirm}>
          {t("FilesPage.Images.removeImageModal.buttons.confirm")}
        </Button>,
      ]}
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
            {t("FilesPage.Images.removeImageModal.delete")}
          </span>
          {companyImage.name ? companyImage.name : companyImage.filename}
        </div>
        <Divider />
        <div>
          <span className={"title"}>
            {t("FilesPage.Images.removeImageModal.name")}
          </span>
          {companyImage.products ? (
            <ul>
              {companyImage.products.map((product) => {
                return <li key={product.id}>{product.name}</li>;
              })}
            </ul>
          ) : (
            <Empty
              description={t("FilesPage.Images.removeImageModal.noUses")}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
      <Divider />
      <span className={"title important danger"}>
        {t("FilesPage.Images.removeImageModal.removeWarning")}
      </span>
    </Modal>
  );
};

export default ImageRemoveConfirmModal;
