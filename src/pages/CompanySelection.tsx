import React from "react";
import {Layout as AntLayout} from "antd";
import Header from "../components/Layout/Header";
import CompanyCardSelector from "../components/CompanySelector/CompanyCardSelector";

const textStyle = {
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: "larger",
    color: "#575757",
    flexShrink: 0
};

const CompanySelection = () => {
    return (
        <AntLayout style={{background: "white"}}>
            <Header Company/>
            <AntLayout style={{
                background: "white",
                minHeight: "90vh"
            }}>
                <AntLayout.Content style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexFlow: "column wrap",
                }}>
                    <span style={textStyle}>
                        Choisissez votre entreprise par défaut
                    </span>
                    <CompanyCardSelector/>

                    {/* TODO A voir quel bouton utiliser
                   <Button style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        width: "25%",
                        backgroundColor: "#5CC04A"
                    }}>
                    <span style={{...textStyle, color: "white", fontSize: 18}}>
                        Valider
                    </span>
                    </Button>*/}
                </AntLayout.Content>
            </AntLayout>
        </AntLayout>
    )
};

export default CompanySelection;