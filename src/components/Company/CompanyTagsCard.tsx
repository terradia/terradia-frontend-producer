import React from "react";
import "../../assets/Style/CompanyPage/CompanyTagsCard.less";
import { Company } from "../../interfaces/Company";
import { Card, Empty, Modal, Tag } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons/lib";
import CheckableTag from "antd/es/tag/CheckableTag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import TerradiaLoader from "../TerradiaLoader";
import Button from "../Ui/Button";

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
          <h2>{"Catégories de l'entreprise"}</h2>
          {/* TODO : translate this. */}
        </span>
      }
      bordered={false}
      headStyle={{ display: "flex", flexWrap: "wrap", flexFlow: "column" }}
      bodyStyle={{
        display: "flex",
        flexFlow: "column",
        boxShadow: "0 4px 5px rgba(0, 0, 0, 0.15)",
      }}
      extra={
        <Button
          icon={company.tags.length === 0 ? <PlusOutlined /> : <EditOutlined />}
          className={"icon-container"}
          onClick={() => setShowModal(true)}
        />
      }
    >
      <div>
        {
          "Voici la liste des catégories dans lesquelles s'inscrivent votre entreprise :" // TODO : Translate this.
        }
      </div>
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
              description={"Aucune catégorie n'est attribué à votre entreprise"} // TODO : Translate this.
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
      <Modal
        title="Ajouter des catégorie à l'entreprise"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key={"cancel"} onClick={() => setShowModal(false)}>
            Annuler
          </Button>,
          <Button
            key={"ok"}
            type={"primary"}
            onClick={() => setShowModal(false)}
            isLoading={isMutationLoading}
          >
            {"Valider & Fermer"}
          </Button>,
        ]}
      >
        <div
          style={{
            paddingBottom: "1em",
          }}
        >
          {
            "Cliquez sur le nom d'une catégorie pour l'ajouter à votre entreprise" // TODO : translate this.
          }
        </div>
        {loading && <TerradiaLoader />}
        {!loading &&
          data.getAllCompanyTags.map((tag) => (
            <CheckableTag
              key={tag.id}
              checked={selectedTags.findIndex((elem) => elem === tag.id) !== -1}
              onChange={(checked) => handleSelectTag(tag, checked)}
            >
              {tag.translationKey}
            </CheckableTag>
          ))}
      </Modal>
    </Card>
  );
};

export default CompanyTagsCard;
