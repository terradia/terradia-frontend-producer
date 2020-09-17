import React, { useState } from "react";
import { Card, Progress, Rate, Statistic, Radio } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import "../assets/Style/Statistics/Statistics.less";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  LineChart,
  Line,
} from "recharts";

const data = [
  {
    name: "Jan.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Fev.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Mar.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Avr.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Mai",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Jui.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Jui.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Aou.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Sep.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Oct.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Nov.",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
  {
    name: "Dec",
    pv: Math.floor(Math.random() * (97 - 2 + 1)) + 2,
  },
];
const data2 = [
  {
    name: "Semaine 1",
    pv: Math.floor(Math.random() * (54 - 13 + 1)) + 13,
  },
  {
    name: "Semaine 2",
    pv: Math.floor(Math.random() * (54 - 13 + 1)) + 13,
  },
  {
    name: "Semaine 3",
    pv: Math.floor(Math.random() * (54 - 13 + 1)) + 13,
  },
  {
    name: "Semaine 4",
    pv: Math.floor(Math.random() * (54 - 13 + 1)) + 13,
  },
];

const data3 = [
  {
    name: "Lun",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Mar.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Mer.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Jeu.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Ven.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Sam.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
  {
    name: "Dim.",
    pv: Math.floor(Math.random() * (14 - 1 + 1)) + 1,
  },
];

const monthsRevenue = Math.floor(Math.random() * (1568 - 125 + 1)) + 125;
const monthsCommands = Math.floor(Math.random() * (87 - 5 + 1)) + 87;

const getCompanyReviews = graphqlLoader(
  "../graphql/query/getCompanyReviews.graphql"
);

const Statistics = () => {
  const companyId = localStorage.getItem("selectedCompany");

  const {
    loading,
    error: errorCompanyReviews,
    data: dataCompanyReviews,
  } = useQuery(getCompanyReviews, {
    variables: { id: companyId, limit: 10, offset: 1 },
  });

  function rateNumber() {
    let nbReviews = 0;
    dataCompanyReviews.getCompanyReviews.forEach((user) => {
      if (user.customerMark) {
        nbReviews += 1;
      }
    });
    if (nbReviews !== 0) {
      return <>({nbReviews}) </>;
    }
    return nbReviews;
  }

  const commentUser = () => {
    let tmpNbReviews = 0;
    let ratingTotal = 0;
    dataCompanyReviews.getCompanyReviews.forEach((user) => {
      if (user.customerMark) {
        tmpNbReviews += 1;
        ratingTotal += user.customerMark;
      }
    });
    if (tmpNbReviews !== 0 && ratingTotal !== 0) {
      return ratingTotal / tmpNbReviews;
    }
    return 0;
  };

  const [graphScope, setGraphScope] = useState("year");

  const onChange = (event) => {
    setGraphScope(event.target.value);
  };

  if (loading) return <div>loading</div>;
  return (
    <>
      <div className={"statistic-page"}>
        <div className={"strong-statistics"}>
          <div className={"head-statistics"}>
            <Card title="Commandes en cours" className={"statistic-card"}>
              <div className={"description-card"}>
                <p className={"green-stats"}>8</p>
                <p>Commandes sont en attentes de prépatation ou de livraison</p>
              </div>
            </Card>
            <Card title="Clients uniques" className={"statistic-card"}>
              <div className={"description-card"}>
                <p className={"green-stats"}>4</p>
                <p>Clients differents qui ont commandé chez vous</p>
              </div>
            </Card>
            <Card title={"Avis"} className={"statistic-card"}>
              <Card.Grid hoverable={false} className={"grid-style"}>
                {!errorCompanyReviews && (
                  <Rate
                    disabled
                    defaultValue={2}
                    allowHalf
                    value={commentUser()}
                    className={"rate"}
                  />
                )}
                {rateNumber()}
              </Card.Grid>
              <Card.Grid hoverable={false} className={"grid-style"}>
                <Statistic
                  title="Entreprise favorite"
                  value={1128}
                  prefix={<LikeOutlined />}
                />
              </Card.Grid>
            </Card>
          </div>
          <Card
            title="Commandes complétées"
            extra={
              <Radio.Group
                defaultValue="year"
                onChange={onChange}
                buttonStyle="solid"
              >
                <Radio.Button value="year">Année</Radio.Button>
                <Radio.Button value="months">Mois</Radio.Button>
                <Radio.Button value="week">Semaine</Radio.Button>
              </Radio.Group>
            }
            className={"statistic-card"}
          >
            <div className={"statistic-graph"}>
              {graphScope === "year" && (
                <BarChart width={600} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="pv" fill="#52c41a">
                    <LabelList dataKey="pv" position="center" />
                  </Bar>
                </BarChart>
              )}
              {graphScope === "months" && (
                <BarChart width={500} height={300} data={data2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="pv" fill="#52c41a">
                    <LabelList dataKey="pv" position="center" />
                  </Bar>
                </BarChart>
              )}
              {graphScope === "week" && (
                <BarChart width={500} height={300} data={data3}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="pv" fill="#52c41a">
                    <LabelList dataKey="pv" position="center" />
                  </Bar>
                </BarChart>
              )}
            </div>
          </Card>
          <Card title="Visites page Producteur" className={"statistic-card"}>
            <div className={"statistic-graph"}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="pv" stroke="#52c41a" />
              </LineChart>
            </div>
          </Card>
          <div>
            <Card title="Produits" className={"statistic-card"}>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Card.Grid hoverable={false} className={"grid-style"}>
                  <Card.Meta title={"Produits disponibles"} />
                  <Progress percent={84} size="small" />
                </Card.Grid>
                <Card.Grid hoverable={false} className={"grid-style"}>
                  <Statistic title="Produit favori" value={"Tomate"} />
                </Card.Grid>
                <Card.Grid hoverable={false} className={"grid-style"}>
                  <Card.Meta title={`Revenus ${monthsRevenue}€`} />
                  <p>
                    Vous avez completez {monthsCommands} commandes durant le
                    mois de Septembre
                  </p>
                </Card.Grid>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
