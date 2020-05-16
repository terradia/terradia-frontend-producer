import React from "react";

import { Divider, Empty } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import ImagesUploadButton from "./ImagesUploadButton";
import ImageCard from "./ImageCard";
import CompanyImage from "../../interfaces/Files/CompanyImage";
import { LoadingOutlined } from "@ant-design/icons/lib";

const queryCompanyImages = graphqlLoader(
  "../../graphql/query/getCompanyImages.graphql"
);

interface Props {
  companyId: string;
}

const ImagesTab: React.FC<Props> = (props: Props) => {
  const {
    loading: loadingCompanyImages,
    data: dataCompanyImages,
    refetch,
  } = useQuery(queryCompanyImages, {
    variables: { page: 0, companyId: props.companyId },
  });

  // TODO : handle errors and notify user

  if (loadingCompanyImages)
    return (
      <div className={"company-images-container"}>
        <LoadingOutlined style={{ fontSize: 40 }} />
      </div>
    );

  const handleRefetch = () => refetch();

  return (
    <>
      <nav className={"images-tab-header"}>
        <ImagesUploadButton onUpload={handleRefetch} />
      </nav>
      <Divider />
      <div className={"company-images-container"}>
        {dataCompanyImages.getCompanyImages.length === 0 && (
          <Empty
            description={"Aucune image pour le moment"} // TODO : Translate this.
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
    </>
  );
};

export default ImagesTab;
