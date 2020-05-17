import React from "react";
import { Card, Statistic, Progress, Rate } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { loader as graphqlLoader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";

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
    variables: { id: companyId, limit: 30, offset: 1 },
  });

  const gridStyle = {
    width: "25%" as const,
    textAlign: "center" as const,
    minWidth: "fit-content",
  };
  const avisStyle = {
    display: "flex" as const,
    flexDirection: "column" as const,
    alignItems: "center",
  };

  const bodyStyle = {
    display: "flex",
    paddingBottom: 24,
  };

  const [nbReviews, setNbReviews] = React.useState(0);

  const commentUser = () => {
    let tmpNbReviews = 0;
    let ratingTotal = 0;
    dataCompanyReviews.getCompanyReviews.map((user) => {
      if (user.customerMark) {
        tmpNbReviews += 1;
        ratingTotal += user.customerMark;
      }
    });
    console.log(ratingTotal / tmpNbReviews);
    if (tmpNbReviews !== 0 && ratingTotal !== 0)
      return ratingTotal / tmpNbReviews;
    return 0;
  };

  if (loading) return <div>loading</div>;
  return (
    <>
      {console.log(dataCompanyReviews)}
      <div style={bodyStyle}>
        <div
          style={{
            marginRight: "1%",
            display: "flex",
            flexGrow: 2,
            flexDirection: "column",
          }}
        >
          <Card
            title="Commandes"
            style={{
              marginBottom: "1%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Card.Grid hoverable={false} style={gridStyle}>
                <Statistic title="Commandes en cours" value={12} />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Card.Meta title={"Commandes du jour"}></Card.Meta>
                <Progress percent={60} size="small" />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Statistic title="Commandes totale du mois" value={216} />
              </Card.Grid>
            </div>
          </Card>

          <div>
            <Card
              title="Produits"
              style={{
                marginBottom: "1%",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <Card.Grid hoverable={false} style={gridStyle}>
                  <Card.Meta title={"Produits disponibles"} />
                  <Progress percent={60} size="small" />
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                  <Statistic title="Produit favorit" value={"Tomato"} />
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                  <Card.Meta title={"Chiffre d'affaire du jour"}></Card.Meta>
                  <Progress type="circle" percent={76} size="small" />
                </Card.Grid>
              </div>
            </Card>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Card
            title={"Avis"}
            style={{
              marginBottom: "1%",
            }}
          >
            <div style={avisStyle}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Rate
                  disabled
                  defaultValue={2}
                  allowHalf
                  value={commentUser()}
                  style={{
                    display: "flex",
                  }}
                />{" "}
                (223) avis
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Statistic
                  title="Compagnie favorite"
                  value={1128}
                  prefix={<LikeOutlined />}
                />
              </Card.Grid>
            </div>
          </Card>
          <Card
            title="Employees"
            style={{
              display: "flex",
            }}
          >
            {/* <Card.Grid hoverable={false} style={gridStyle}>
                <Card.Meta title={"Produits disponibles"} />
                <Progress percent={60} size="small" />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Statistic title="Produit favorit" value={"Tomato"} />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Card.Meta title={"Produits disponibles"}></Card.Meta>
                <Progress percent={60} size="small" />
              </Card.Grid> */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Statistics;
