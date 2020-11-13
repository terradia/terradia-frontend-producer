import React from "react";
import Button from "./Button";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";

const deleteCompanyMutation = graphqlLoader(
  "../../graphql/mutation/deleteCompany.graphql"
);

const DeleteCompanyButton = () => {
  const [deleteCompany] = useMutation(deleteCompanyMutation);

  const onDeleteCompany = () => {
    deleteCompany({
      variables: { companyId: localStorage.getItem("selectedCompany") },
    }).then((data) => {
      if (data) {
        const companyId = localStorage.getItem("selectedCompany");
        localStorage.removeItem("selectedCompany");
        localStorage.removeItem("rememberCompany");
        dispatchEvent(
          new StorageEvent("storage", {
            key: "selectedCompany",
            oldValue: companyId,
            newValue: null,
          })
        );
      }
    });
  };

  return (
    <Button
      type={"default"}
      danger
      size={"large"}
      fitParentWidth
      icon={<DeleteOutlined />}
      text={"Delete Company"}
      onClick={onDeleteCompany}
    />
  );
};

export default DeleteCompanyButton;
