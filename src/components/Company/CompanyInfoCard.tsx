import React from "react";
import Company from "../../interfaces/Company";
import "../../assets/Style/CompanyPage/CompanyInfoCard.less";
import { EditOutlined } from "@ant-design/icons/lib";
import ImageSelectorButton from "../Gallery/ImageSelectorButton";
import CompanyImage from "../../interfaces/CompanyImage";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";
import Field from "./Field";
import { Divider } from "antd";

interface Props {
  company: Company;
  refetch?: () => void;
  loading?: boolean;
}

const updateCompany = loader("../../graphql/mutation/updateCompany.graphql");

const CompanyInfoCard: React.FC<Props> = ({
  company,
  refetch,
  loading,
  ...props
}: Props) => {
  const [updateCompanyMutation] = useMutation(updateCompany);

  const handleChangeImage = async (
    image: CompanyImage,
    imageType: "logo" | "cover" = "logo"
  ) => {
    const value = {};
    value[imageType === "logo" ? "logoId" : "coverId"] = image.id;
    await updateCompanyMutation({
      variables: {
        companyId: localStorage.getItem("selectedCompany"),
        newValues: value,
      },
    });
    refetch && refetch();
  };

  console.log(company);

  return (
    <div className={"card"}>
      <div className={"company-cover-container"}>
        {company.cover && (
          <img
            className={"company-cover"}
            alt={"Company cover"}
            src={"https://media.terradia.eu/" + company.cover.filename}
          />
        )}
        <div className={"on-cover-company-data-container"}>
          <div className={"company-avatar-container"}>
            {company.logo && (
              <img
                className={"company-logo"}
                alt={"Company logo"}
                src={"https://media.terradia.eu/" + company.logo.filename}
              />
            )}
            <span className={"hover-logo"}>
              <ImageSelectorButton
                customText={null}
                customIcon={<EditOutlined />}
                title={"Modifier le logo"} // TODO : translate this.
                onlyOneImageByOne={true}
                accentColor={"white"}
                type={"link"}
                onValidate={(selectedImages) =>
                  handleChangeImage(selectedImages[0], "logo")
                }
              />
            </span>
          </div>
          <div className={"company-name"}>{company.name}</div>
        </div>
        <div className={"actions"}>
          <ImageSelectorButton
            customText={null}
            customIcon={<EditOutlined />}
            title={"Modifier la couverture"} // TODO : translate this.
            onlyOneImageByOne={true}
            accentColor={"white"}
            onValidate={(selectedImages) =>
              handleChangeImage(selectedImages[0], "cover")
            }
          />
        </div>
      </div>
      <div className={"info-container"}>
        <Field
          style={{
            width: "100%",
            padding: 0,
          }}
          value={
            "Ceci est une description d'entreprise en dur pour faire un test et voir si visuellement ce n'est pas trop moche. Ce texte et long et ne sert a rien m'ai j'imagine que c'est mieux qu'un simple Lorem Ispum"
          }
          label={"Description"}
          type={"description"}
        />
        <Divider />
        <h2>Informations générales</h2>
        <Field value={company.address} label={"Adresse postale"} />
        {/* TODO : translate this. */}
        <Field value={company.email} label={"Adresse e-mail"} />
        <Field value={company.phone} label={"Numéro de téléphone"} />
      </div>
    </div>
  );
};

export default CompanyInfoCard;
