import React from "react";
import CompanyCard from "./CompanyCard";
import {useQuery} from "@apollo/react-hooks";
import getCompanyByUser from "../../graphql/mutation/getCompanyByUser.graphql"

const CompanyCardSelector = () => {
    const {loading, error, data} = useQuery(getCompanyByUser);
    let card;

    console.log(data);
    console.log(loading);
    console.log(error);

    if (error) {
        console.log(error);
    }
    if (loading) {
        card = (<CompanyCard loading/>)
    } else if (data && data.getUser) {
        card = data.getUser.companies.map((company: any) => (
            <CompanyCard
                name={company.company.name}
                logo={company.company.logo}
                cover={company.company.cover}
            />
        ))
    }
    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {card}
        </div>
    )
};

export default CompanyCardSelector;