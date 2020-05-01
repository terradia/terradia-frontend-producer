import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import InfoCard from "../components/CompanyInfo/InfoCard";
import Title from "../components/Ui/Title";
import UserViewButton from "../components/Ui/UserViewButton";
import AdButton from "../components/Ui/AdButton";
import moment from "moment";

const getCompanyById = graphqlLoader("../graphql/query/getCompanyById.graphql");

const Company = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const { loading, data: companyData } = useQuery(getCompanyById, { variables: { companyId: companyId } });

  if (loading)
    return <div>loading</div>;
  return (
    <>
      <div style={{
        display: "flex",
        justifyItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        paddingBottom: 24,
      }}>
        <UserViewButton/>
        <AdButton/>
      </div>
      <Title title={!loading && companyData && companyData.getCompany ? companyData.getCompany.name: ""}/>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
      }}>
        <InfoCard title={"INFORMATION GENERALES"}
                  infos={[
                    { label: "NOM: ", text: loading ? "" : companyData.getCompany.name },
                    { label: "ADRESSE: ", text: loading ? "" : companyData.getCompany.address },
                    { label: "NUMÉRO DE TEL.: ", text: loading ? "" : companyData.getCompany.phone },
                    { label: "ADRESSE EMAIL: ", text: loading ? "" : companyData.getCompany.email },
                    { label: "DESCRIPTION: ", text: loading ? "" : companyData.getCompany.description },
                    { label: "TYPE DE PRODUITS: ", text: "test product" },
                    { label: "LOGO ENTREPRISE:", icon: loading ? "" : companyData.getCompany.logo },
                    { label: "BANIERE ENTREPRISE:", icon: "" },
                  ]}
                  loading={loading}
        />
        <InfoCard title={"INFORMATION ADMINISTRATIVES"}
                  infos={[
                    { label: "SIRET: ", text: "xxx xxx xxx xxxxx" },
                    { label: "IBAN / RIB: ", text: "rib.pdf" },
                    { label: "ADRESSE EMAIL: ", text: loading ? "" : companyData.getCompany.email },
                    { label: "DESCRIPTION: ", text: loading ? "" : companyData.getCompany.description },
                    { label: "PRESENCE MARCHES: ", text: "oui" },
                    { label: "FRÉQUENCE: ", text: "bihebdomadaire" },
                    { label: "LIVRAISON VOUS-MEME: ", text: "oui" },
                  ]}
                  loading={loading}
        />
        <InfoCard title={"HORAIRE D'OUVERTURE"}
                  infos={[
                    { label: "LUNDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}]},
                    { label: "MARDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}, {startTime: moment("13:00", "HH:mm"), endTime: moment("17:30", "HH:mm")}]},
                    { label: "MERCREDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}]},
                    { label: "JEUDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}, {startTime: moment("13:00", "HH:mm"), endTime: moment("17:30", "HH:mm")}]},
                    { label: "VENDREDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}]},
                  ]}
                  loading={loading}
        />
        <InfoCard title={"MARCHES"}
                  infos={[
                    { label: "LUNDI: ", openHours: [{startTime: moment("08:00", "HH:mm"), endTime: moment("12:00", "HH:mm")}]},
                    { label: "MARDI: ", openHours: [{startTime: moment("08::00", "HH:mm"), endTime: moment("12:00", "HH:mm")}, {startTime: moment("13:00", "HH:mm"), endTime: moment("17:00", "HH:mm")}]},
                  ]}
                  loading={loading}
        />
      </div>
    </>
  );
};

export default Company;
