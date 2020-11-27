import React from "react";
import "../../assets/Style/CompanyPage/CompanyTagsCard.less";
import { Company } from "../../interfaces/Company";
import { Card, Empty, Modal, Tag, Input } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons/lib";
import CheckableTag from "antd/es/tag/CheckableTag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import TerradiaLoader from "../TerradiaLoader";
import Button from "../Ui/Button";
import { useTranslation } from "react-i18next";

interface Props {
  company: Company;
}

const getCompanyTags = graphqlLoader(
  "../../graphql/query/getAllCompanyTags.graphql"
);

const addTagToCompany = graphqlLoader(
  "../../graphql/mutation/company-tags/addTagToCompany.graphql"
);

const deleteTagFromCompany = graphqlLoader(
  "../../graphql/mutation/company-tags/deleteTagFromCompany.graphql"
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompanyTagsCard: React.FC<Props> = ({ company, ...props }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  const { loading, data } = useQuery(getCompanyTags);

  const [
    addTagToCompanyMutation,
    { loading: loadingAddTagToCompanyMutation },
  ] = useMutation(addTagToCompany, {
    variables: { companyId: company.id, companyTagId: "" },
  });

  const [
    deleteTagFromCompanyMutation,
    { loading: loadingDeleteTagFromCompany },
  ] = useMutation(deleteTagFromCompany, {
    variables: { companyId: company.id, companyTagId: "" },
  });

  const isMutationLoading =
    loadingAddTagToCompanyMutation || loadingDeleteTagFromCompany;
  const [selectedTags, setSelectedTags] = React.useState(
    company.tags.map((tag) => tag.id)
  );

  const handleSelectTag = async (tag, checked) => {
    if (checked) {
      setSelectedTags([...selectedTags, tag.id]);
      await addTagToCompanyMutation({
        variables: { companyId: company.id, companyTagId: tag.id },
      });
    } else {
      setSelectedTags(selectedTags.filter((elem) => elem !== tag.id));
      await deleteTagFromCompanyMutation({
        variables: { companyId: company.id, companyTagId: tag.id },
      });
    }
  };

  const { t } = useTranslation("common");

  let allTags = [];
  if (data)
    allTags = data.getAllCompanyTags.map((elem) => {
      return { ...elem, translatedString: t(elem.translationKey) };
    });

  return (
    <Card
      title={
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifySelf: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            maxWidth: "90%",
            textOverflow: "ellipsis",
          }}
        >
          <h2>{t("CompanyPage.companyInformations.labels.companyTags")}</h2>
        </span>
      }
      bordered={false}
      headStyle={{ display: "flex", flexWrap: "wrap", flexFlow: "column" }}
      bodyStyle={{
        display: "flex",
        flexFlow: "column",
      }}
      extra={
        <Button
          icon={company.tags.length === 0 ? <PlusOutlined /> : <EditOutlined />}
          className={"icon-container"}
          onClick={() => setShowModal(true)}
        />
      }
    >
      <div>{t("CompanyPage.companyInformations.labels.companyTags")}</div>
      <div className={"company-tags-container"}>
        {company.tags.map((tag, index) => {
          return (
            <Tag key={index} color={tag.color ? tag.color : "success"}>
              {tag.translationKey}
            </Tag>
          );
        })}
        {company.tags.length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty
              description={t(
                "CompanyPage.companyInformations.labels.noCompanyTags"
              )}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
      <Modal
        title={t("CompanyPage.companyInformations.labels.addTagName")}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key={"cancel"} onClick={() => setShowModal(false)}>
            {t("CompanyPage.companyInformations.buttons.cancel")}
          </Button>,
          <Button
            key={"ok"}
            type={"primary"}
            onClick={() => setShowModal(false)}
            isLoading={isMutationLoading}
          >
            {t("CompanyPage.companyInformations.buttons.saveAndClose")}
          </Button>,
        ]}
      >
        <div
          style={{
            paddingBottom: "1em",
          }}
        >
          {t("CompanyPage.companyInformations.labels.addTag")}
        </div>
        <Input.Search
          allowClear
          style={{ width: "100%", marginBottom: "1em" }}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t("CompanyPage.companyInformations.labels.searchTags")}
        />
        {loading && <TerradiaLoader />}
        {!loading &&
          allTags
            .filter((elem) => {
              const regExp = new RegExp(searchInput, "i");
              return elem.translatedString.match(regExp);
            })
            .map((tag) => (
              <CheckableTag
                key={tag.id}
                checked={
                  selectedTags.findIndex((elem) => elem === tag.id) !== -1
                }
                onChange={(checked) => handleSelectTag(tag, checked)}
              >
                {tag.translatedString}
              </CheckableTag>
            ))}
      </Modal>
    </Card>
  );
};

export default CompanyTagsCard;
