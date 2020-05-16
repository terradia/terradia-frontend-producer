import React from "react";
import "../assets/Style/Products/ProductsPage.less";
import { Card, Statistic, Progress } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const Statistics = () => {
  const companyId = localStorage.getItem("selectedCompany");

  const gridStyle = {
    width: "25%" as const,
    textAlign: "center" as const,
  };

  return (
    <div className={"product-page"}>
      <div style={{ display: "flex", paddingBottom: 24 }}>
        <Card title="Commandes">
          <Card.Grid style={gridStyle}>
            <Statistic title="Commandes en cours" value={12} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <Statistic title="Produit favorit" value={"Tomato"} />
          </Card.Grid>
          <Card.Grid style={gridStyle}>{companyId}</Card.Grid>
          <Card.Grid style={gridStyle}>
            <Card.Meta title={"Produits disponibles"}></Card.Meta>
            <Progress percent={60} size="small" />
          </Card.Grid>
        </Card>
        <Card title={"Avis"}>
          <Statistic
            title="Avis de l'entreprise"
            value={1128}
            prefix={<LikeOutlined />}
          />
        </Card>
        ,
      </div>
    </div>
  );
};

export default Statistics;
