import React, {useState} from "react";
import CompanyCard from "./CompanyCard";
import {useQuery} from "@apollo/react-hooks";
import {loader as graphqlLoader} from 'graphql.macro';
import Button from "../Ui/Button";
import {useHistory} from "react-router";
import CheckBox from "rc-checkbox";

const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#575757",
    flexShrink: 0
};

const CompanyCardSelector = () => {
    const history = useHistory();
    const {loading, error, data: userData} = useQuery(getUser);
    const [selected, setSelected] = useState("");
    const [remember, setRemember] = useState(false);
    let card;

    if (error)
        console.log(error);

    const OnValidatedSelection = () => {
        localStorage.setItem("rememberCompany", remember.toString());
        localStorage.setItem("selectedCompany", selected);
        if (selected === "user")
            window.location.href = "http://localhost:8000/graphql";
        else
            history.push("/Home");
    };

    if (!loading && userData && userData.getUser && userData.getUser.companies) {
        if (userData.getUser.companies.length < 1)
            history.push("/Login");
        card = userData.getUser.companies.map((company: any) => (
            <CompanyCard
                key={company.company.id}
                id={company.company.id}
                selected={(selected === company.company.id)}
                name={company.company.name}
                logo={company.company.logo}
                cover={company.company.cover}
                onClick={setSelected}
            />
        ));
    }

    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <CompanyCard
                    id={"user"}
                    selected={(selected === "user")}
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
                    width: "25%"
                }}
                onClick={OnValidatedSelection}
                isLoading={loading}
            >
                <span style={{...textStyle, color: "#5CC04A", fontSize: 18}}>
                    Valider
                </span>
            </Button>
            <CheckBox onClick={event => setRemember(event.currentTarget.checked)}>
                se souvenir de mon choix
            </CheckBox>
        </>
    )
};

export default CompanyCardSelector;