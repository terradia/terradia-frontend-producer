import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Divider, Input } from "antd";
import "../../assets/Style/CompanyPage/CompanyBankInformations.less";
import { useTranslation } from "react-i18next";
import { IbanElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const mutationUpdateBankAccount = graphqlLoader(
  "../../graphql/mutation/updateCompanyExternalAccount.graphql"
);

const getStripeInformations = graphqlLoader(
  "../../graphql/query/getCompanyStripeAccount.graphql"
);

const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

declare interface CompanyBankInformationsProps {
  companyId: string;
  stripeData: {
    id: string;
    external_accounts: {
      data: [
        {
          account_holder_name: string;
          bank_name: string;
          last4: string;
        }
      ];
    };
    payouts_enabled: boolean;
  };
}

function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 450 ? "16px" : "18px");
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });
  return fontSize;
}

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  return useMemo(
    () => ({
      supportedCountries: ["SEPA"],
      style: {
        base: {
          fontSize: fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
          border: "1px solid grey",
          borderRadius: "10px",
          width: "80%",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );
};

function CompanyBankInformations(props: CompanyBankInformationsProps) {
  const { t } = useTranslation("common");
  const [canModifyIban, setCanModifyIban] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateBankAccount] = useMutation(mutationUpdateBankAccount, {
    refetchQueries: [
      {
        query: getStripeInformations,
        variables: { companyId: props.companyId },
      },
    ],
  });

  const { data: dataUser } = useQuery(getUser, {
    fetchPolicy: "cache-first",
  });

  console.log("dataUser", dataUser);

  const ibanAlreadyExist =
    !props.stripeData.external_accounts &&
    props.stripeData.external_accounts.data.length > 0;

  const options = useOptions();
  const stripe = useStripe();
  const elements = useElements();

  function handleSubmit() {
    const iban = elements.getElement(IbanElement);
    stripe
      .createToken(iban, {
        currency: "eur",
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_holder_name: `${dataUser.getUser.firstName} ${dataUser.getUser.lastName}`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_holder_type: "company",
      })
      .then(function (result) {
        updateBankAccount({
          variables: {
            companyId: props.companyId,
            token: result.token.id,
          },
        }).then(() => {
          setCanModifyIban(!canModifyIban);
          setEditMode(false);
        });
      });
  }

  function handleChangeIban(ibanEl) {
    if (ibanEl.complete === true) setCanModifyIban(true);
  }

  return dataUser && dataUser.getUser ? (
    <Card
      title={t("CompanyPage.bankInformations.tabTitle")}
      bordered={false}
      className={"company-bank-informations-card"}
    >
      {(!ibanAlreadyExist || editMode) && (
        <div className={"iban-informations"}>
          <label className={"field-label"}>
            {t("CompanyPage.bankInformations.editIban")}
            <IbanElement options={options} onChange={handleChangeIban} />
          </label>
          <div className={"button-submit-iban"}>
            <div
              className={"icon-container"}
              onClick={() => setEditMode(false)}
            >
              <CloseOutlined />
            </div>
            <span>
              {canModifyIban === true && (
                <Button onClick={handleSubmit} type={"primary"}>
                  {t("common.edit")}
                </Button>
              )}
            </span>
          </div>
        </div>
      )}
      {ibanAlreadyExist && !editMode && (
        <div className={"field main-container"}>
          <label
            className={"field-label" + (editMode === true ? " edit-mode" : "")}
          >
            {t("CompanyPage.bankInformations.editIban")}
          </label>
          <div className={"value-container"}>
            <Input
              value={
                "XX XXXX XXXX " +
                props.stripeData.external_accounts.data[0].last4
              }
              type={"text"}
              disabled={true}
            />
            <div className={"icon-container"} onClick={() => setEditMode(true)}>
              {editMode === true ? null : <EditOutlined />}
            </div>
          </div>
        </div>
      )}
      {!props.stripeData.payouts_enabled && (
        <>
          <Divider />
          <Alert
            message={t("CompanyPage.bankInformations.notValidated")}
            type="warning"
          />
        </>
      )}
    </Card>
  ) : null;
}

export default CompanyBankInformations;
