import React from "react";
import { Company } from "../../interfaces/Company";
import "../../assets/Style/CompanyPage/CompanyInfoCard.less";
import { EditOutlined } from "@ant-design/icons/lib";
import ImageSelectorButton from "../Gallery/ImageSelectorButton";
import { CompanyImage } from "../../interfaces/CompanyImage";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/client";
import Field from "./Field";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  company: Company;
  refetch?: () => void;
  loading?: boolean;
}

const updateCompany = loader("../../graphql/mutation/updateCompany.graphql");

const CompanyInfoCard: React.FC<Props> = ({ company, refetch }: Props) => {
  const [updateCompanyMutation] = useMutation(updateCompany);

  const { t } = useTranslation("common");

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

  const handleFieldValidation = async (key, value) => {
    await updateCompanyMutation({
      variables: {
        companyId: localStorage.getItem("selectedCompany"),
        newValues: { [key]: value },
      },
    });
    refetch && refetch();
    // TODO : if it's the mail : say there is a validating mail that was sent
    // TODO : notify the user that the field was correctly updated.
  };

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
                title={t("CompanyPage.companyInformations.labels.editLogo")} // TODO : translate this.
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
            title={t("CompanyPage.companyInformations.labels.editCover")} // TODO : translate this.
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
          name={"description"}
          value={company.description}
          label={t("CompanyPage.companyInformations.labels.description")}
          type={"description"}
          onValidate={handleFieldValidation}
        />
        <Divider />
        <h2
          style={{
            width: "100%",
          }}
        >
          {t("CompanyPage.companyInformations.labels.globalInformations")}
        </h2>{" "}
        <Field
          value={company.siren}
          name={"siren"}
          label={t("CompanyPage.companyInformations.labels.companyID")}
          editable={false}
        />
        <Field
          value={company.address}
          name={"address"}
          label={t("CompanyPage.companyInformations.labels.address")}
          onValidate={handleFieldValidation}
        />
        <Field
          value={company.email}
          name={"email"}
          label={t("CompanyPage.companyInformations.labels.email")}
          onValidate={handleFieldValidation}
        />
        <Field
          value={company.phone}
          name={"phone"}
          label={t("CompanyPage.companyInformations.labels.phone")}
          onValidate={handleFieldValidation}
        />
      </div>
    </div>
  );
};

export default CompanyInfoCard;
