import React from "react";
import ProgressCard from "../Ui/ProgressCard";
import PremiumCard from "../Ui/PremiumCard";

const SummarySidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexFlow: "column",
          margin: "8px",
        }}
      >
        <ProgressCard text={"Ventes Aujourd'hui"} value={9} />
        <ProgressCard text={"Commandes Prêtes"} value={4} />
        <ProgressCard text={"Clients Satisfaits"} value={100} />
      </div>
      <PremiumCard />
    </div>
  );
};

export default SummarySidebar;
