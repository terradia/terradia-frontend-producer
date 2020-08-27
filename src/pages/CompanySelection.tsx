import React from "react";
import { ReactComponent as TerradiaLogo } from "../assets/Logo/Terradia.svg";
import { Layout as AntLayout, Divider } from "antd";
import CompanyCardSelector from "../components/CompanySelector/CompanyCardSelector";

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "larger",
  color: "#575757",
  flexShrink: 0,
};

const CompanySelection = () => {
  return (
    <AntLayout style={{ background: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "4em",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <TerradiaLogo
          height={"40px"}
          width={"200px"}
          style={{ marginTop: "1em" }}
        />
      </div>
      <Divider />
      <AntLayout
        style={{
          background: "white",
          minHeight: "90vh",
        }}
      >
        <AntLayout.Content
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexFlow: "column wrap",
          }}
        >
          <span style={textStyle}>Choisissez votre entreprise</span>{" "}
          {/* TODO : translate this. */}
          <CompanyCardSelector />
        </AntLayout.Content>
      </AntLayout>
    </AntLayout>
  );
};

export default CompanySelection;
