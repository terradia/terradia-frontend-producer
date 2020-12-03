import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Divider } from "antd";
import "../../assets/Style/CompanyPage/CompanyBankInformations.less";
import { useTranslation } from "react-i18next";
import { IbanElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loader as graphqlLoader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";

const mutationUpdateBankAccount = graphqlLoader(
  "../../graphql/mutation/updateCompanyExternalAccount.graphql"
);

declare interface CompanyBankInformationsProps {
  companyId: string;
  isStripeValidated: boolean;
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
  const [editMode, setEditMode] = useState(false);
  const [updateBankAccount] = useMutation(mutationUpdateBankAccount);

  const options = useOptions();
  const stripe = useStripe();
  const elements = useElements();

  function handleSubmit() {
    const iban = elements.getElement(IbanElement);
    console.log("iban", iban);
    const token = stripe
      .createToken(iban, {
        currency: "eur",
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_holder_name: "Jenny Rosen",
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_holder_type: "company",
      })
      .then(function (result) {
        console.log("result", result);
        updateBankAccount({
          variables: {
            companyId: props.companyId,
            token: result.token.id,
          },
        }).then((data) => {
          console.log("data", data);
        });
        // Handle result.error or result.token
      });
    console.log("token", token);
    setEditMode(!editMode);
  }

  function handleChangeIban(ibanEl) {
    if (ibanEl.complete === true) setEditMode(true);
  }

  return (
    <Card
      title={t("CompanyPage.bankInformations.tabTitle")}
      bordered={false}
      className={"company-bank-informations-card"}
    >
      <div className={"iban-informations"}>
        <label className={"field-label"}>
          {t("CompanyPage.bankInformations.editIban")}
          <IbanElement options={options} onChange={handleChangeIban} />
        </label>
        <div className={"button-submit-iban"}>
          <span>
            {editMode === true && (
              <Button onClick={handleSubmit} type={"primary"}>
                {t("common.edit")}
              </Button>
            )}
          </span>
        </div>
      </div>
      {!props.isStripeValidated && (
        <>
          <Divider />
          <Alert
            message={t("CompanyPage.bankInformations.notValidated")}
            type="warning"
          />
        </>
      )}
    </Card>
  );
}

export default CompanyBankInformations;
