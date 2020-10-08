import React, { ReactNode, useEffect, useState } from "react";
import { Form, Steps } from "antd";
import Button from "../Ui/Button";
import GeneralInfoForm from "./GeneralInfoForm";
import AdministrativeInfoForm from "./AdministrativeInfoForm";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
import RegisterForm from "../Authentication/Register/RegisterForm";
import LoginForm from "../Authentication/Login/LoginForm";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { AddCompanyImageData } from "../Files/ImageUploadModal";
import { UploadChangeParam } from "antd/lib/upload";
import { Redirect } from "react-router";
import { SirenData } from "../../interfaces/Company/CompanyRegister/CompanyRegisterForm";
import FormStepButton from "./FormStepButton";
import PersonalInfoForm from "./PersonalInfoForm";

const createCompanyMutation = graphqlLoader(
  "../../graphql/mutation/createCompany.graphql"
);
const updateCompanyMutation = graphqlLoader(
  "../../graphql/mutation/updateCompany.graphql"
);
const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

const checkSirenQuery = graphqlLoader("../../graphql/query/checkSiren.graphql");

declare interface RegisterStep {
  title: string;
  content: ReactNode;
}

export declare type RegisterStepsState = RegisterStep[];

const CompanyRegisterForm = () => {
  const [form] = Form.useForm();
  const [isCreated, setIsCreated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [logoId, setLogoId] = useState(null);
  const [coverId, setCoverId] = useState(null);
  const client = useApolloClient();
  const [user, setUser] = useState(null);
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
  const [checkSiren, { called, data, error, loading, refetch }] = useLazyQuery<
    SirenData
  >(checkSirenQuery, { onError: (error) => console.log(error) });

  useEffect(() => {
    checkSiren({ variables: { siren: "123456789" } });
  }, []);

  useEffect(() => {
    if (called && !loading)
      if (data) {
        form.setFields([
          {
            name: "officialName",
            value: data.checkSiren.uniteLegale.denominationUniteLegale,
          },
          {
            name: "name",
            value: data.checkSiren.uniteLegale.denominationUsuelle1UniteLegale,
          },
          {
            name: "address",
            value: (
              data.checkSiren.adresseEtablissement.numeroVoieEtablissement +
              " " +
              data.checkSiren.adresseEtablissement.typeVoieEtablissement +
              " " +
              data.checkSiren.adresseEtablissement.libelleVoieEtablissement +
              ", " +
              data.checkSiren.adresseEtablissement.codePostalEtablissement +
              " " +
              data.checkSiren.adresseEtablissement.libelleCommuneEtablissement
            )
              .replace(/null/g, "")
              .trim(),
          },
        ]);
      } else if (error) {
        console.log(error);
      }
  }, [data, error, called, loading, form]);

  console.log(form.getFieldsValue());

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

  const [steps, setSteps] = useState<RegisterStepsState>([
    user
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
      content: <AdministrativeInfoForm />,
    },
    {
      /* TODO : translate this. */
      title: "Informations personnelles",
      content: <PersonalInfoForm />,
    },
    {
      title: "Information complémentaires",
      content: <GeneralInfoForm onUpload={onUpload} />,
    },
  ]);

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

  const onSubmit = (values) => {
    console.log(values);
    createCompany({ variables: values }).then((data) => {
      localStorage.setItem("selectedCompany", data.data.createCompany.id);
      localStorage.setItem("rememberCompany", "false");
      setCurrentStep((step) => step + 1);
    });
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
  };

  const switchLoginRegister = () => {
    const prevSteps = [...steps];
    if (hasAccount) {
      prevSteps[0].title = "S'enregistrer";
      prevSteps[0].content = <RegisterForm onRegister={onAuth} />;
    } else {
      prevSteps[0].title = "Se connecter";
      prevSteps[0].content = <LoginForm onLogin={onAuth} />;
    }
    setSteps(prevSteps);
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
            console.log(form.getFieldsValue());
            if ("siren" in value && value.siren.length === 9) {
              console.log(called);
              if (called === false) checkSiren({ variables: value });
              else refetch(value);
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
