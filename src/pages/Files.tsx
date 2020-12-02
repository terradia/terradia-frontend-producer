import React from "react";
import { Card, Divider, Empty } from "antd";
import "../assets/Style/Files/index.less";
import ImagesUploadButton from "../components/Files/ImagesUploadButton";
import { CompanyImage } from "../interfaces/CompanyImage";
import ImageCard from "../components/Files/ImageCard";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import TerradiaLoader from "../components/TerradiaLoader";
import { useTranslation } from "react-i18next";

const queryCompanyImages = graphqlLoader(
  "../graphql/query/getCompanyImages.graphql"
);

const Files = () => {
  const companyId = localStorage.getItem("selectedCompany");

  const { t } = useTranslation("common");

  const {
    loading: loadingCompanyImages,
    data: dataCompanyImages,
    refetch,
  } = useQuery(queryCompanyImages, {
    variables: { page: 0, companyId: companyId },
  });

  // TODO : handle errors and notify user

  if (loadingCompanyImages)
    return (
      <div className={"company-images-container"}>
        <TerradiaLoader />
      </div>
    );

  const handleRefetch = () => refetch();

  return (
    <Card>
      <nav className={"images-tab-header"}>
        <ImagesUploadButton onUpload={handleRefetch} />
      </nav>
      <Divider />
      <div className={"company-images-container"}>
        {dataCompanyImages.getCompanyImages.length === 0 && (
          <Empty
            description={t("FilesPage.Images.noImage")}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        {dataCompanyImages.getCompanyImages.map(
          (companyImage: CompanyImage) => {
            return (
              <ImageCard
                key={companyImage.filename}
                companyImage={companyImage}
                onRemove={handleRefetch}
                onUpdate={handleRefetch}
              />
            );
          }
        )}
      </div>
    </Card>
  );
};

export default Files;
