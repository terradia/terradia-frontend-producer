import React, { useState } from "react";
import { Button, Card, Divider, Empty, Input, Modal } from "antd";
import CompanyImage from "../../interfaces/Files/CompanyImage";

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

  const footer = [
    <Button key="close" onClick={() => handleClose()}>
      Fermer
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
        Enregistrer & Fermer
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
              src={`https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/${companyImage.filename}`}
            />
          }
          bodyStyle={{ height: 0, padding: 0 }}
        />
      </div>
      <div className={"column2"}>
        <div>
          <span className={"title"}>{"Nom : "}</span>
          {onImageUpdate ? (
            <Input
              name={"name"}
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
            {"Produits qui utilisent cette image : "}
          </span>
          {companyImage.products ? (
            <ul>
              {companyImage.products.map((product) => {
                return <li key={product.id}>{product.name}</li>;
              })}
            </ul>
          ) : (
            <Empty
              description={"Aucun produit à lister"} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageViewModal;
