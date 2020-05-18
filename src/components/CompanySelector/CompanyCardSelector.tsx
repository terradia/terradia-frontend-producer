import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../Ui/Button";
import { useHistory } from "react-router";
import CheckBox from "rc-checkbox";
import { notification } from "antd";

const getCompanies = graphqlLoader("../../graphql/query/getCompanies.graphql");

const CompanyCardSelector = () => {
  const history = useHistory();
  const { loading, error, data: companiesData } = useQuery(getCompanies);
  const [selected, setSelected] = useState(null);
  const [remember, setRemember] = useState(false);
  let card;

  if (error) console.log(error);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  });

  const onSelected = (companyId: string) => {
    setSelected(companyId);
  };

  const OnValidatedSelection = () => {
    if (selected === null) {
      notification.warn({
        key: "emptySelection",
        message: "Veuillez sélectionner une entreprise",
      });
      return;
    }
    notification.close("emptySelection");
    localStorage.setItem("rememberCompany", remember.toString());
    localStorage.setItem("selectedCompany", selected);
    if (selected === "user")
      window.location.href = "http://localhost:8000/graphql";
    else {
      console.log("redirect to home from company selector");
      history.push("/home");
    }
  };

  if (!loading && companiesData && companiesData.getCompanies) {
    if (companiesData.getCompanies.length < 1) history.push("/Login");
    card = companiesData.getCompanies.map((companyData: any) => {
      if (companyData) {
        return (
          <CompanyCard
            key={companyData.id}
            id={companyData.id}
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
          id={"user"}
          selected={selected === "user"}
          onClick={setSelected}
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
        isLoading={loading}
        text={"Valider"}
      />
      <CheckBox onClick={(event) => setRemember(event.currentTarget.checked)}>
        se souvenir de mon choix
      </CheckBox>
    </>
  );
};

export default CompanyCardSelector;
