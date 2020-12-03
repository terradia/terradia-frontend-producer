import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { Info } from "../components/CompanyInfo/InfoCard";
import moment from "moment";
import CompanyInfoCard from "../components/Company/CompanyInfoCard";
import { Company } from "../interfaces/Company";
import TerradiaLoader from "../components/TerradiaLoader";
import { Divider, Tabs } from "antd";
import CompanyTagsCard from "../components/Company/CompanyTagsCard";
import CompanyHoursCard from "../components/Company/CompanyHoursCards";
import DeleteCompanyButton from "../components/Ui/DeleteCompanyButton";
import CompanyReviewsCard from "../components/Company/CompanyReviewsCard";
import { useTranslation } from "react-i18next";
import CompanyBankInformations from "../components/Company/CompanyBankInformations";

const { TabPane } = Tabs;

declare interface CompanyData {
  getCompany: Company;
}

const getCompanyById = graphqlLoader("../graphql/query/getCompanyById.graphql");

const getCompanyReviews = graphqlLoader(
  "../graphql/query/getCompanyReviews.graphql"
);

const getIsStripeAccValidated = graphqlLoader(
  "../graphql/query/isStripeAccountValidated.graphql"
);

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

  const {
    loading: loadingStripeValidated,
    data: dataStripeValidated,
  } = useQuery(getIsStripeAccValidated, {
    variables: { companyId: companyId },
    fetchPolicy: "cache-first",
  });

  const [firstLoad, setFirstLoad] = useState(true);
  const [officeHours, setOfficeHours] = useState<Info[]>(defaultOfficeHours);
  const [deliveryHours, setDeliveryHours] = useState<Info[]>(
    defaultOfficeHours
  );

  const [
    loadReviews,
    { loading: loadingReviews, data: dataReviews, fetchMore: fetchMoreReviews },
  ] = useLazyQuery(getCompanyReviews);

  const { t } = useTranslation("common");

  function handleChangePannel(key) {
    if (key === "3" && firstLoad) {
      setFirstLoad(false);
      loadReviews({
        variables: {
          id: companyId,
          limit: 10,
          offset: 0,
        },
      });
    }
  }

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

  //TODO: arreter le chargement si il y a une erreur
  if (loading || !data || officeHours === null || officeHours === undefined)
    return <TerradiaLoader />;
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        className={"product-modal-tabs"}
        onChange={handleChangePannel}
      >
        <TabPane tab={t("CompanyPage.companyInformations.name")} key="1">
          <CompanyInfoCard
            company={data.getCompany}
            refetch={refetch}
            loading={loading}
          />
          <Divider className={"invisible-divider padding-size"} />
          <CompanyTagsCard company={data.getCompany} />
          <Divider className={"invisible-divider padding-size"} />
          <DeleteCompanyButton />
        </TabPane>
        <TabPane tab={t("CompanyPage.openingTime.name")} key="2">
          <CompanyHoursCard
            infos={deliveryHours}
            loading={loading}
            refetch={refetch}
            isDelivery
          />
          <Divider className={"invisible-divider padding-size"} />
          <CompanyHoursCard
            infos={deliveryHours}
            loading={loading}
            refetch={refetch}
            isDelivery
          />
        </TabPane>
        <TabPane tab={t("CompanyPage.customersReviews.name")} key="3">
          <CompanyReviewsCard
            averageMark={data.getCompany.averageMark}
            numberOfMarks={data.getCompany.numberOfMarks}
            reviews={
              dataReviews !== undefined ? dataReviews.getCompanyReviews : []
            }
            loading={loadingReviews}
            fetchMoreReviews={fetchMoreReviews}
            companyId={companyId}
          />
        </TabPane>
        {!loadingStripeValidated && (
          <TabPane tab={t("CompanyPage.bankInformations.tabTitle")} key="4">
            <CompanyBankInformations
              companyId={companyId}
              isStripeValidated={dataStripeValidated.isStripeAccountValidated}
            />
          </TabPane>
        )}
      </Tabs>
    </>
  );
};

export default CompanyPage;
