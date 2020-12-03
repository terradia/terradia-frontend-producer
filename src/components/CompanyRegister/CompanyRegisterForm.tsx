import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Form, Steps } from "antd";
import Button from "../Ui/Button";
import GeneralInfoForm from "./GeneralInfoForm";
import AdministrativeInfoForm, { InputStatus } from "./AdministrativeInfoForm";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
import RegisterForm from "../Authentication/Register/RegisterForm";
import LoginForm from "../Authentication/Login/LoginForm";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { CompanyImageData } from "../Files/ImageUploadModal";
import { UploadChangeParam } from "antd/lib/upload";
import { Redirect } from "react-router";
import { SirenData } from "../../interfaces/Company/CompanyRegister/CompanyRegisterForm";
import FormStepButton from "./FormStepButton";
import Logout from "../Authentication/Logout/Logout";
import { useStripe } from "@stripe/react-stripe-js";

const createCompanyMutation = graphqlLoader(
  "../../graphql/mutation/createCompany.graphql"
);
const updateCompanyMutation = graphqlLoader(
  "../../graphql/mutation/updateCompany.graphql"
);
const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

const checkSirenQuery = graphqlLoader("../../graphql/query/checkSiren.graphql");

const getGeocodeQuery = graphqlLoader("../../graphql/query/getGeoCode.graphql");

declare interface RegisterStep {
  title: string;
  content: ReactNode;
}

export declare type RegisterStepsState = RegisterStep[];

const CompanyRegisterForm = () => {
  const [form] = Form.useForm();
  const [isCreated, setIsCreated] = useState(false);
  const [initLazy, setInitLazy] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);
  const [isLocked, setIsLock] = useState(false);
  const [validationStatus, setValidationStatus] = useState<InputStatus>({
    siren: "",
    officialName: "",
    name: "",
    address: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [logoId, setLogoId] = useState(null);
  const [coverId, setCoverId] = useState(null);
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const stripe = useStripe();

  try {
    if (user === null) {
      const cachedUser = client.readQuery({ query: getUser });
      setUser(cachedUser);
    }
  } catch {
    setUser(undefined);
  }
  const [createCompany, { loading: createLoading }] = useMutation(
    createCompanyMutation
  );
  const [updateCompany, { loading: updateLoading }] = useMutation(
    updateCompanyMutation
  );
  const [
    checkSiren,
    { called, data, error, loading, refetch },
  ] = useLazyQuery<SirenData>(checkSirenQuery, {
    onCompleted: (sirenData) => {
      setValidationStatus((prevState) => {
        return {
          ...prevState,
          siren: sirenData ? "success" : "error",
        };
      });
    },
    onError: () => {
      setValidationStatus((prevState) => {
        return {
          ...prevState,
          siren: "error",
        };
      });
    },
  });
  const [getGeocode, { called: geoCalled, refetch: geoRefetch }] = useLazyQuery(
    getGeocodeQuery,
    {
      onCompleted: (geoData) => {
        if (geoData) {
          setValidationStatus((prevState) => {
            return {
              ...prevState,
              address: "success",
            };
          });
        }
      },
      onError: (error) => {
        console.log(error);
        setValidationStatus((prevState) => {
          return {
            ...prevState,
            address: "error",
          };
        });
      },
    }
  );

  useEffect(() => {
    if (!initLazy) {
      checkSiren();
      getGeocode();
      setInitLazy(true);
    }
  }, [checkSiren, getGeocode, initLazy]);

  const onUpload = (
    file: UploadChangeParam,
    updateFile: CompanyImageData,
    type: "logo" | "cover"
  ) => {
    if (type === "logo") {
      setLogoId(updateFile.id);
    } else if (type === "cover") {
      setCoverId(updateFile.id);
    }
  };

  const onAuth = () => {
    setCurrentStep((step) => step + 1);
  };

  const steps = [
    user && hasAccount
      ? {
          /* TODO : translate this. */
          title: "Se connecter",
          content: <LoginForm onLogin={onAuth} />,
        }
      : {
          /* TODO : translate this. */
          title: "S'enregistrer",
          content: <RegisterForm onRegister={onAuth} />,
        },
    {
      /* TODO : translate this. */
      title: "Création de l'entreprise",
      content: (
        <AdministrativeInfoForm
          isLocked={isLocked}
          validationStatus={validationStatus}
        />
      ),
    },
    {
      title: "Information complémentaires",
      content: <GeneralInfoForm onUpload={onUpload} />,
    },
  ];

  const getCompanyInfo = useCallback(() => {
    const units = data.checkSiren.uniteLegale;
    const addr = data.checkSiren.adresseEtablissement;
    const officialName = {
      name: "officialName",
      value:
        units.denominationUniteLegale || units.denominationUsuelle1UniteLegale,
    };
    const name = {
      name: "name",
      value:
        units.denominationUsuelle1UniteLegale || units.denominationUniteLegale,
    };
    const address = {
      name: "address",
      value: `${addr.numeroVoieEtablissement || ""} ${
        addr.typeVoieEtablissement || ""
      } ${addr.libelleVoieEtablissement || ""}, ${
        addr.codePostalEtablissement || ""
      } ${addr.libelleCommuneEtablissement || ""}`.trim(),
    };
    return [officialName, name, address];
  }, [data]);

  useEffect(() => {
    if (validationStatus.address === "validating") {
      if (!geoCalled) {
        getGeocode({
          variables: {
            address: form.getFieldValue("address"),
          },
        });
      } else {
        geoRefetch({
          address: form.getFieldValue("address"),
        });
      }
    }
  }, [validationStatus, form, geoCalled, geoRefetch, getGeocode]);

  useEffect(() => {
    if (called && !loading)
      if (data) {
        const companyInfo = getCompanyInfo();
        form.setFields(companyInfo);
        setIsLock(!!companyInfo[0].value);
        setValidationStatus({
          siren: "success",
          officialName: companyInfo[0].value ? "success" : undefined,
          name: companyInfo[1].value ? "success" : undefined,
          address: "validating",
        });
      } else if (error) {
        setIsLock(false);
        setValidationStatus({
          siren: "error",
          officialName: undefined,
          name: undefined,
          address: undefined,
        });
        form.resetFields(["officialName", "name", "address"]);
      }
  }, [data, error, called, loading, form, getCompanyInfo]);

  useEffect(() => {
    if (client) {
      if (user) {
        setCurrentStep(1);
      } else {
        setCurrentStep(0);
      }
    } else {
      throw new Error("Apollo client is not defined");
    }
  }, [client, user]);

  const onSubmit = async (values) => {
    if (!isCreated) {
      const tokenStripe = await stripe.createToken("account", {
        // eslint-disable-next-line @typescript-eslint/camelcase
        business_type: "company",
        company: {
          name: values.name,
          // eslint-disable-next-line @typescript-eslint/camelcase
          tax_id: values.siren,
        },
        // eslint-disable-next-line @typescript-eslint/camelcase
        tos_shown_and_accepted: true,
      });
      values.tokenAccount = tokenStripe.token.id;
      createCompany({ variables: values })
        .then((data) => {
          localStorage.setItem("selectedCompany", data.data.createCompany.id);
          localStorage.setItem("rememberCompany", "false");
          setCurrentStep((step) => step + 1);
          setIsCreated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      values["logoId"] = logoId;
      values["coverId"] = coverId;
      updateCompany({
        variables: {
          companyId: localStorage.getItem("selectedCompany"),
          newValues: values,
        },
      }).then(() => {
        dispatchEvent(
          new StorageEvent("storage", {
            key: "token",
            oldValue: "",
            newValue: localStorage.getItem("token"),
          })
        );
        setRedirect(true);
      });
    }
  };

  const switchLoginRegister = () => {
    setHasAccount(!hasAccount);
  };

  if (currentStep === 0) {
    return (
      <>
        <div className={"register_box"}>
          <div className={"register_form_div"}>
            <Steps current={currentStep} labelPlacement={"vertical"}>
              {steps.map((item) => (
                <Steps.Step
                  key={item.title}
                  title={item.title}
                  className={"item-title"}
                />
              ))}
            </Steps>
            <Button
              text={
                hasAccount
                  ? "Je souhaite créer un compte Terradia"
                  : "J'ai déjà un compte Terradia"
              }
              className={"form_item"}
              id={"hasAccount"}
              size={"middle"}
              onClick={switchLoginRegister}
            />
          </div>
        </div>
        {steps[0].content};
      </>
    );
  }

  if (redirect) {
    return <Redirect to={"/products"} />;
  }

  return (
    <div className={"register_box"}>
      <div className={"register_form_div"}>
        <Form
          className={"auth_form"}
          form={form}
          preserve
          onValuesChange={(value) => {
            if ("siren" in value && value.siren.length === 9) {
              if (called === false) checkSiren({ variables: value });
              else refetch(value);
            } else if ("address" in value) {
              getGeocode({ variables: value });
            }
          }}
          scrollToFirstError
          onFinish={onSubmit}
          layout={"vertical"}
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "column",
          }}
        >
          <div
            style={{
              margin: "2em",
              display: "flex",
            }}
          >
            <Logout />
          </div>
          <Steps current={currentStep} labelPlacement={"vertical"}>
            {steps.map((item) => (
              <Steps.Step
                key={item.title}
                title={item.title}
                className={"item-title"}
              />
            ))}
          </Steps>
          <FormStepButton
            currentStep={currentStep}
            steps={steps}
            createLoading={createLoading}
            updateLoading={updateLoading}
            prevStep={() => setCurrentStep((step) => step - 1)}
            nextStep={() => setCurrentStep((step) => step + 1)}
            form={form}
          >
            <span
              className={"form_item_wrapper required"}
              style={{ display: "flex", alignSelf: "flex-end" }}
            >
              champs obligatoires
            </span>
            <div>
              {steps.map((step, index) => {
                if (index === currentStep) {
                  return <div key={step.title}>{step.content}</div>;
                } else if (index === 0) {
                  return null;
                }
                return (
                  <div key={step.title} style={{ display: "none" }}>
                    {step.content}
                  </div>
                );
              })}
            </div>
          </FormStepButton>
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
