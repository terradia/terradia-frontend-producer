import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import InfoCard, { Info } from "../components/CompanyInfo/InfoCard";
import Title from "../components/Ui/Title";
import UserViewButton from "../components/Ui/UserViewButton";
import AdButton from "../components/Ui/AdButton";
import moment from "moment";

declare interface CompanyData {
  getCompany: {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    logo: string;
    cover: string;
    address: string;
    openingDays: [
      {
        id;
        daySlugName;
        dayTranslationKey;
        hours: [
          {
            startTime: Date;
            endTime: Date;
          }
        ];
      }
    ];
  };
}

const getCompanyById = graphqlLoader("../graphql/query/getCompanyById.graphql");

const defaultOfficeHours: Info[] = [
  { label: "monday.label", daySlugName: "monday", openHours: [] },
  { label: "tuesday.label", daySlugName: "tuesday", openHours: [] },
  { label: "wednesday.label", daySlugName: "wednesday", openHours: [] },
  { label: "thursday.label", daySlugName: "thursday", openHours: [] },
  { label: "friday.label", daySlugName: "friday", openHours: [] },
  { label: "saturday.label", daySlugName: "saturday", openHours: [] },
  { label: "sunday.label", daySlugName: "sunday", openHours: [] },
];

const Company = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const { loading, data, refetch } = useQuery<CompanyData>(getCompanyById, {
    variables: { companyId: companyId },
    fetchPolicy: "cache-first",
  });
  const [officeHours, setOfficeHours] = useState<Info[]>(defaultOfficeHours);

  useEffect(() => {
    if (data) {
      setOfficeHours((prevState) => {
        return prevState.map((item) => {
          const existingHours = data.getCompany.openingDays.find(
            (value) => value.daySlugName === item.daySlugName
          );
          if (existingHours === undefined) return item;
          return Object.assign({}, item, {
            label: existingHours.dayTranslationKey,
            daySlugName: existingHours.daySlugName,
            openHours: existingHours.hours.map((hour) => {
              return {
                startTime: moment(hour.startTime).local(),
                endTime: moment(hour.endTime).local(),
              };
            }),
          });
        });
      });
    }
  }, [data]);

  if (loading || !data || officeHours === null || officeHours === undefined)
    return <div>loading</div>;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyItems: "flex-start",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          paddingBottom: 24,
        }}
      >
        <UserViewButton />
        <AdButton />
      </div>
      <Title
        title={!loading && data && data.getCompany ? data.getCompany.name : ""}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <InfoCard
          title={"INFORMATION GENERALES"}
          infos={[
            { label: "NOM: ", text: loading ? "" : data.getCompany.name },
            {
              label: "ADRESSE: ",
              text: loading ? "" : data.getCompany.address,
            },
            {
              label: "NUMÉRO DE TEL.: ",
              text: loading ? "" : data.getCompany.phone,
            },
            {
              label: "ADRESSE EMAIL: ",
              text: loading ? "" : data.getCompany.email,
            },
            {
              label: "DESCRIPTION: ",
              text: loading ? "" : data.getCompany.description,
            },
            { label: "TYPE DE PRODUITS: ", text: "test product" },
            {
              label: "LOGO ENTREPRISE:",
              icon: loading ? "" : data.getCompany.logo,
            },
            { label: "BANIERE ENTREPRISE:", icon: data.getCompany.cover },
          ]}
          loading={loading}
          refetch={refetch}
        />
        <InfoCard
          title={"INFORMATION ADMINISTRATIVES"}
          infos={[
            { label: "SIRET: ", text: "xxx xxx xxx xxxxx" },
            { label: "IBAN / RIB: ", text: "rib.pdf" },
            {
              label: "ADRESSE EMAIL: ",
              text: loading ? "" : data.getCompany.email,
            },
            {
              label: "DESCRIPTION: ",
              text: loading ? "" : data.getCompany.description,
            },
            { label: "PRESENCE MARCHES: ", text: "oui" },
            { label: "FRÉQUENCE: ", text: "bihebdomadaire" },
            { label: "LIVRAISON VOUS-MEME: ", text: "oui" },
          ]}
          loading={loading}
          refetch={refetch}
        />
        <InfoCard
          title={"HORAIRE D'OUVERTURE"}
          infos={officeHours}
          loading={loading}
          refetch={refetch}
        />
      </div>
    </>
  );
};

export default Company;
