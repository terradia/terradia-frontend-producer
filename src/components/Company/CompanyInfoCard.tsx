import React from "react";
import Company from "../../interfaces/Company";
import "../../assets/Style/CompanyPage/CompanyInfoCard.less";
import { EditOutlined } from "@ant-design/icons/lib";
import ImageSelectorButton from "../Gallery/ImageSelectorButton";
import { CompanyImage } from "../../interfaces/CompanyImage";
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

const CompanyInfoCard: React.FC<Props> = ({ company, refetch }: Props) => {
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
          name={"description"}
          value={company.description}
          label={"Description"}
          type={"description"}
          onValidate={handleFieldValidation}
        />
        <Divider />
        <h2>Informations générales</h2> {/* TODO : translate this. */}
        <Field
          value={company.siren}
          name={"siren"}
          label={"SIREN"}
          editable={false}
        />
        <Field
          value={company.address}
          name={"address"}
          label={"Adresse postale"}
          onValidate={handleFieldValidation}
        />
        <Field
          value={company.email}
          name={"email"}
          label={"Adresse e-mail"}
          onValidate={handleFieldValidation}
        />
        <Field
          value={company.phone}
          name={"phone"}
          label={"Numéro de téléphone"}
          onValidate={handleFieldValidation}
        />
      </div>
    </div>
  );
};

export default CompanyInfoCard;
