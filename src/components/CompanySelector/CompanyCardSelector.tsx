import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../Ui/Button";
import { useHistory } from "react-router";
import { notification, Checkbox } from "antd";
import { QueryResult } from "@apollo/react-common";

const getCompanies = graphqlLoader("../../graphql/query/getCompanies.graphql");

interface Props {
  queryCompaniesObject?: QueryResult;
}

const CompanyCardSelector: React.FC<Props> = ({ queryCompaniesObject }) => {
  const history = useHistory();
  const [getCompaniesQuery] = useLazyQuery(getCompanies);
  let queryResult;
  if (!queryCompaniesObject) {
    queryResult = getCompaniesQuery();
  } else {
    queryResult = queryCompaniesObject;
  }
  const [selected, setSelected] = useState(null);
  const [remember, setRemember] = useState(false);
  let card;

  const OnValidatedSelection = () => {
    if (selected === null) {
      notification.warn({
        key: "emptySelection",
        message: "Veuillez sélectionner une entreprise",
      });
      return;
    }
    notification.close("emptySelection");
    if (selected === "createCompany") {
      history.push("/companyRegister");
    } else {
      localStorage.setItem("rememberCompany", remember.toString());
      localStorage.setItem("selectedCompany", selected);
      history.push("/products");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  });

  const onSelected = (companyId: string) => {
    setSelected(companyId);
  };

  if (
    !queryResult.loading &&
    queryResult.data &&
    queryResult.data.getCompanies
  ) {
    card = queryResult.data.getCompanies.map((companyData: any) => {
      if (companyData) {
        return (
          <CompanyCard
            key={companyData.id}
            id={companyData.id}
            archivedAt={companyData.archivedAt}
            selected={selected === companyData.id}
            name={companyData.name}
            logo={
              companyData.logo
                ? "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
                  companyData.logo.filename
                : null
            }
            cover={
              companyData.cover
                ? "https://terradia-bucket-assets.s3.eu-west-3.amazonaws.com/" +
                  companyData.cover.filename
                : null
            }
            onClick={onSelected}
          />
        );
      }
      return null;
    });
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CompanyCard
          id={"createCompany"}
          selected={selected === "createCompany"}
          onClick={setSelected}
          create
        />
        {card}
      </div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "25%",
        }}
        onClick={OnValidatedSelection}
        isLoading={queryResult.loading}
        text={"Valider"}
      />
      <Checkbox onChange={(event) => setRemember(event.target.checked)}>
        se souvenir de mon choix
      </Checkbox>
    </>
  );
};

export default CompanyCardSelector;
