import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { Info } from "../components/CompanyInfo/InfoCard";
import moment from "moment";
import CompanyInfoCard from "../components/Company/CompanyInfoCard";
import { Company } from "../interfaces/Company";
import TerradiaLoader from "../components/TerradiaLoader";
import { Divider } from "antd";
import CompanyTagsCard from "../components/Company/CompanyTagsCard";
import CompanyHoursCard from "../components/Company/CompanyHoursCards";
import DeleteCompanyButton from "../components/Ui/DeleteCompanyButton";

declare interface CompanyData {
  getCompany: Company;
}

const getCompanyById = graphqlLoader("../graphql/query/getCompanyById.graphql");
// const deleteCompanyMutation = graphqlLoader(
//   "../graphql/mutation/deleteCompany.graphql"
// );

const defaultOfficeHours: Info[] = [
  { label: "monday.label", daySlugName: "monday", openHours: [] },
  { label: "tuesday.label", daySlugName: "tuesday", openHours: [] },
  { label: "wednesday.label", daySlugName: "wednesday", openHours: [] },
  { label: "thursday.label", daySlugName: "thursday", openHours: [] },
  { label: "friday.label", daySlugName: "friday", openHours: [] },
  { label: "saturday.label", daySlugName: "saturday", openHours: [] },
  { label: "sunday.label", daySlugName: "sunday", openHours: [] },
];

const CompanyPage = () => {
  const companyId = localStorage.getItem("selectedCompany");
  const { loading, data, refetch } = useQuery<CompanyData>(getCompanyById, {
    variables: { companyId: companyId },
    fetchPolicy: "cache-first",
  });
  const [officeHours, setOfficeHours] = useState<Info[]>(defaultOfficeHours);
  const [deliveryHours, setDeliveryHours] = useState<Info[]>(
    defaultOfficeHours
  );
  // const [deleteCompany] = useMutation(deleteCompanyMutation);

  useEffect(() => {
    const initHours = (prevState, isDelivery) => {
      return prevState.map((item) => {
        let existingHours;
        if (isDelivery) {
          existingHours = data.getCompany.deliveryDays.find(
            (value) => value.daySlugName === item.daySlugName
          );
        } else {
          existingHours = data.getCompany.openingDays.find(
            (value) => value.daySlugName === item.daySlugName
          );
        }
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
    };
    if (data) {
      setOfficeHours((prevState) => {
        return initHours(prevState, false);
      });
      setDeliveryHours((prevState) => {
        return initHours(prevState, true);
      });
    }
  }, [data]);

  // const onDeleteCompany = () => {
  //   deleteCompany({
  //     variables: { companyId: localStorage.getItem("companyId") },
  //   }).then((data) => {
  //     if (data) {
  //       const companyId = localStorage.getItem("companyId");
  //       localStorage.setItem("companyId", null);
  //       localStorage.setItem("rememberCompany", null);
  //       dispatchEvent(
  //         new StorageEvent("storage", {
  //           key: "companyId",
  //           oldValue: companyId,
  //           newValue: null,
  //         })
  //       );
  //     }
  //   });
  // };

  if (loading || !data || officeHours === null || officeHours === undefined)
    return <TerradiaLoader />;
  return (
    <>
      <CompanyInfoCard
        company={data.getCompany}
        refetch={refetch}
        loading={loading}
      />
      <Divider className={"invisible-divider padding-size"} />
      <CompanyHoursCard
        infos={officeHours}
        loading={loading}
        refetch={refetch}
      />
      <Divider className={"invisible-divider padding-size"} />
      <CompanyHoursCard
        infos={deliveryHours}
        loading={loading}
        refetch={refetch}
        isDelivery
      />
      <Divider className={"invisible-divider padding-size"} />
      <CompanyTagsCard company={data.getCompany} />
      <Divider className={"invisible-divider padding-size"} />
      <DeleteCompanyButton />
      {/*<Title*/}
      {/*  title={!loading && data && data.getCompany ? data.getCompany.name : ""}*/}
      {/*/>*/}
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: "flex",*/}
      {/*    flexWrap: "wrap",*/}
      {/*    justifyContent: "space-evenly",*/}
      {/*    alignItems: "flex-start",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <InfoCard*/}
      {/*    title={"INFORMATION GENERALES"}*/}
      {/*    infos={[*/}
      {/*      {*/}
      {/*        label: "NOM: ",*/}
      {/*        slugName: "name",*/}
      {/*        text: loading ? "" : data.getCompany.name,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "ADRESSE: ",*/}
      {/*        slugName: "address",*/}
      {/*        text: loading ? "" : data.getCompany.address,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "NUMÉRO DE TEL.: ",*/}
      {/*        slugName: "phone",*/}
      {/*        text: loading ? "" : data.getCompany.phone,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "ADRESSE EMAIL: ",*/}
      {/*        slugName: "email",*/}
      {/*        text: loading ? "" : data.getCompany.email,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "DESCRIPTION: ",*/}
      {/*        slugName: "description",*/}
      {/*        text: loading ? "" : data.getCompany.description,*/}
      {/*      },*/}
      {/*      { label: "TYPE DE PRODUITS: ", text: "test product" },*/}
      {/*      {*/}
      {/*        label: "LOGO ENTREPRISE:",*/}
      {/*        slugName: "logoId",*/}
      {/*        icon:*/}
      {/*          data && data.getCompany && data.getCompany.logo === null*/}
      {/*            ? ""*/}
      {/*            : data.getCompany.logo.filename,*/}
      {/*        isLogo: true,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "BANIERE ENTREPRISE:",*/}
      {/*        slugName: "coverId",*/}
      {/*        icon:*/}
      {/*          data && data.getCompany && data.getCompany.cover === null*/}
      {/*            ? ""*/}
      {/*            : data.getCompany.cover.filename,*/}
      {/*        isLogo: false,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    loading={loading}*/}
      {/*    refetch={refetch}*/}
      {/*  />*/}
      {/*  <InfoCard*/}
      {/*    title={"INFORMATION ADMINISTRATIVES"}*/}
      {/*    infos={[*/}
      {/*      {*/}
      {/*        label: "SIREN: ",*/}
      {/*        slugName: "siren",*/}
      {/*        text: data.getCompany.siren,*/}
      {/*      },*/}
      {/*      { label: "IBAN / RIB: ", text: "rib.pdf" },*/}
      {/*      {*/}
      {/*        label: "ADRESSE EMAIL: ",*/}
      {/*        slugName: "email",*/}
      {/*        text: loading ? "" : data.getCompany.email,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        label: "DESCRIPTION: ",*/}
      {/*        slugName: "description",*/}
      {/*        text: loading ? "" : data.getCompany.description,*/}
      {/*      },*/}
      {/*      { label: "PRESENCE MARCHES: ", text: "oui" },*/}
      {/*      { label: "FRÉQUENCE: ", text: "bihebdomadaire" },*/}
      {/*      { label: "LIVRAISON VOUS-MEME: ", text: "oui" },*/}
      {/*    ]}*/}
      {/*    loading={loading}*/}
      {/*    refetch={refetch}*/}
      {/*  />*/}
      {/*  <Button accentColor={""} onClick={onDeleteCompany}>*/}
      {/*    {"Supprimer l'entreprise"}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
};

export default CompanyPage;
