import React, { useState } from "react";
import { Button, Divider, Empty, Modal } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import CompanyImage from "../../interfaces/Files/CompanyImage";
import ImageCard from "./ImageCard";
import { LoadingOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Gallery/style.less";
import ImagesUploadButton from "../Files/ImagesUploadButton";

interface Props {
  visible?: boolean;
  onClickClose: () => void;
  onUpload?: (uploadedImage) => void; // function called for each upload (on multiple call this function for each element).
  onValidate?: (selectedImages: [CompanyImage]) => void; // function called when the modal is closed and there is images that are selected
  onlyOneImageByOne?: boolean; // if you want the user to upload only one image at the time.
}

const queryCompanyImages = graphqlLoader(
  "../../graphql/query/getCompanyImages.graphql"
);

// ⚠️ DO NOT USE THIS COMPONENT ⚠️
// This is a component that is implemented by the ImagesSelectorButton
// It is already loaded by it, that means this component should not be used.
const ImageSelectorModal: React.FC<Props> = ({
  visible,
  onClickClose,
  onValidate,
  onlyOneImageByOne = false,
  ...props
}: Props) => {
  const companyId = localStorage.getItem("selectedCompany");
  const {
    loading: loadingCompanyImages,
    error: errorCompanyImages,
    data: dataCompanyImages,
    refetch,
  } = useQuery(queryCompanyImages, {
    variables: { page: 0, companyId: companyId },
  });

  const [selectedImages, setSelectedImages] = useState({});

  const handleClose = () => {
    setSelectedImages({}); // reset data in case the selection is reopened
    onClickClose();
  };

  const handleValidate = () => {
    const companyImages = dataCompanyImages.getCompanyImages;
    const selectedList = Object.keys(selectedImages).map((key) => {
      return selectedImages[key] === true ? key : undefined;
    });
    const res = companyImages.filter((image) => {
      return selectedList.findIndex((elem) => elem === image.id) !== -1;
    });
    onValidate && onValidate(res);
    handleClose();
  };

  const handleRefetch = () => refetch();

  const handleNewSelection = (companyImage: CompanyImage) => {
    if (onlyOneImageByOne === true)
      setSelectedImages({
        [companyImage.id]: !selectedImages[companyImage.id],
      });
    else
      setSelectedImages({
        ...selectedImages,
        [companyImage.id]: !selectedImages[companyImage.id],
      });
  };

  const numberOfImagesSelected = Object.values(selectedImages).filter(
    (elem) => elem === true
  ).length;

  const footer = [
    <Button key="close" onClick={handleClose}>
      Fermer
    </Button>,
  ];

  if (numberOfImagesSelected > 0) {
    footer.push(
      <Button key="submit" type={"primary"} onClick={handleValidate}>
        Valider & Fermer
      </Button>
    );
  }

  return (
    <Modal
      className={"modal"}
      title={
        onlyOneImageByOne === true
          ? "Sélection d'une image"
          : "Séléction d'images"
      }
      visible={visible}
      onCancel={handleClose}
      footer={footer}
    >
      <nav>
        <ImagesUploadButton
          oneImageByOne={onlyOneImageByOne}
          onUpload={handleRefetch}
        />
        <Divider type={"vertical"} style={{ background: "rgba(0,0,0,0)" }} />
        <div>
          {numberOfImagesSelected === 0
            ? "Aucune image séléctionné"
            : numberOfImagesSelected + " Image(s) séléctionné(s)"}
        </div>
      </nav>
      <Divider />
      <div className={"company-images-container"}>
        {loadingCompanyImages === true ? (
          <LoadingOutlined style={{ fontSize: 40 }} />
        ) : (
          <>
            {dataCompanyImages.getCompanyImages.length === 0 && (
              <Empty
                description={"Aucune image dans la galerie"} // TODO : Translate this.
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            {dataCompanyImages.getCompanyImages.map(
              (companyImage: CompanyImage) => {
                return (
                  <ImageCard
                    key={companyImage.filename + companyImage.id}
                    companyImage={companyImage}
                    selected={selectedImages[companyImage.id]}
                    onClick={() => {
                      handleNewSelection(companyImage);
                    }}
                  />
                );
              }
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ImageSelectorModal;
