import React from "react";
import { Button, Card, Divider, Empty, Modal } from "antd";
import { CompanyImage } from "../../interfaces/CompanyImage";

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
  return (
    <Modal
      className={"company-image-remove modal"}
      title={`Suppression de "${
        companyImage.name ? companyImage.name : companyImage.filename
      }"`}
      visible={visible}
      onCancel={onClickClose}
      footer={[
        <Button key="close" onClick={onClickClose}>
          Annuler
        </Button>,
        <Button key="submit" danger onClick={onClickConfirm}>
          Confirmer
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
          <span className={"title"}>{"Supression de l'image : "}</span>
          {companyImage.name ? companyImage.name : companyImage.filename}
        </div>
        <Divider />
        <div>
          <span className={"title"}>
            {
              "Supprimer cette image la retirera automatiquement des produits suivant : "
            }
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
      <Divider />
      <span className={"title important danger"}>
        {"⚠️ Cette action est irréversible ⚠️"}
      </span>
    </Modal>
  );
};

export default ImageRemoveConfirmModal;
