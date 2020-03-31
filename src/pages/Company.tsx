import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {loader as graphqlLoader} from "graphql.macro";
import InfoCard from "../components/Ui/InfoCard"
import Title from "../components/Ui/Title";
import UserViewButton from "../components/Ui/UserViewButton";
import AdButton from "../components/Ui/AdButton";

const getCompanyById = graphqlLoader('../graphql/query/getCompanyById.graphql');

const Company = () => {
    const companyId = localStorage.getItem("selectedCompany");
    const {loading, data: companyData} = useQuery(getCompanyById, {variables: {companyId: companyId}});

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
            <Title title={companyData.getCompany.name}/>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
            }}>
                <InfoCard title={"INFORMATION GENERALES"}
                          infos={[
                              {label: "NOM: ", text: companyData.getCompany.name},
                              {label: "ADRESSE: ", text: companyData.getCompany.address},
                              {label: "NUMÉRO DE TEL.: ", text: companyData.getCompany.phone},
                              {label: "ADRESSE EMAIL: ", text: companyData.getCompany.email},
                              {label: "DESCRIPTION: ", text: companyData.getCompany.description},
                              {label: "TYPE DE PRODUITS: ", text: "test product"}
                          ]}
                />
                <InfoCard title={"INFORMATION ADMINISTRATIVES"}
                          infos={[
                              {label: "SIRET: ", text: "xxx xxx xxx xxxxx"},
                              {label: "IBAN / RIB: ", text: "rib.pdf"},
                              {label: "ADRESSE EMAIL: ", text: companyData.getCompany.email},
                              {label: "DESCRIPTION: ", text: companyData.getCompany.description},
                              {label: "PRESENCE MARCHES: ", text: "oui"},
                              {label: "FRÉQUENCE: ", text: "bihebdomadaire"},
                              {label: "LIVRAISON VOUS-MEME: ", text: "oui"}
                          ]}
                />
                <InfoCard title={"HORAIRE D'OUVERTURE"}
                          infos={[
                              {label: "LUNDI: ", text: "8H-12H & 13H-19H"},
                              {label: "MARDI: ", text: "8H-12H & 13H-19H"},
                              {label: "MERCREDI: ", text: "8H-12H & 13H-19H"},
                              {label: "JEUDI: ", text: "8H-12H & 13H-19H"},
                              {label: "VENDREDI: ", text: "8H-12H & 13H-19H"},
                          ]}
                />
                <InfoCard title={"MARCHES"}
                          infos={[
                              {label: "LUNDI: ", text: "8H-12H - Place Broglie, Strasbourg"},
                              {label: "MARDI: ", text: "8H-12H - Place d'Austerlitz, Strasbourg"},
                          ]}
                />
            </div>
        </>
    )
};

export default Company;