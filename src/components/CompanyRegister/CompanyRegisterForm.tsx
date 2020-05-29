import React, { useEffect, useState } from "react";
import { Form, Steps } from "antd";
import Button from "../Ui/Button";
import GeneralInfoForm from "./GeneralInfoForm";
import AdministrativeInfoForm from "./AdministrativeInfoForm";
import "../../assets/Style/CompanyRegister/CompanyRegisterForm.less";
import RegisterForm from "../Authentication/Register/RegisterForm";
import LoginForm from "../Authentication/Login/LoginForm";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { LeftOutlined } from "@ant-design/icons";
import { AddCompanyImageData } from "../Files/ImageUploadModal";
import { UploadChangeParam } from "antd/lib/upload";
import { Redirect } from "react-router";
import Logout from "../Authentication/Logout/Logout";

const createCompanyMutation = graphqlLoader(
  "../../graphql/mutation/createCompany.graphql"
);
const updateCompanyMutation = graphqlLoader(
  "../../graphql/mutation/updateCompany.graphql"
);
const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

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

  const onUpload = (
    file: UploadChangeParam,
    updateFile: AddCompanyImageData,
    type: "logo" | "cover"
  ) => {
    if (type === "logo") {
      setLogoId(updateFile.addCompanyImage.id);
    } else if (type === "cover") {
      setCoverId(updateFile.addCompanyImage.id);
    }
  };

  const onAuth = () => {
    setCurrentStep((step) => step + 1);
  };

  const [steps, setSteps] = useState([
    user
      ? {
          title: "Se connecter",
          content: <LoginForm onLogin={onAuth} />,
        }
      : {
          title: "S'enregistrer",
          content: <RegisterForm onRegister={onAuth} />,
        },
    {
      title: "Création de l'entreprise",
      content: <AdministrativeInfoForm />,
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
    if (!isCreated) {
      createCompany({ variables: values }).then((data) => {
        localStorage.setItem("selectedCompany", data.data.createCompany.id);
        localStorage.setItem("rememberCompany", "false");
        setCurrentStep((step) => step + 1);
        setIsCreated(true);
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
                <Steps.Step key={item.title} title={item.title} />
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
    return <Redirect to={"/home"} />;
  }

  return (
    <div className={"register_box"}>
      <div className={"register_form_div"}>
        <Form
          className={"auth_form"}
          form={form}
          scrollToFirstError
          onFinish={onSubmit}
          layout={"vertical"}
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexFlow: "column",
          }}
        >
          <Steps current={currentStep} labelPlacement={"vertical"}>
            {steps.map((item) => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {currentStep > 0 && (
            <div
              onClick={() => setCurrentStep((step) => step - 1)}
              className={"prev_step"}
            >
              {currentStep === 1 && <Logout />}
              {currentStep > 1 && (
                <>
                  <LeftOutlined />
                  <span>{"Retour à l’étape précédente"}</span>
                </>
              )}
            </div>
          )}
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
          <div className="external_connexion">
            {currentStep < steps.length - 1 && (
              <Button
                isLoading={createLoading || updateLoading}
                text={"Créer l'entreprise"}
                className={"form_item"}
                id={"next_step"}
                size={"large"}
                htmlType={"submit"}
              />
            )}
            {currentStep === steps.length - 1 && (
              <Button
                isLoading={updateLoading}
                text={"Mettre à jours l'entreprise"}
                className={"form_item"}
                id={"login_button"}
                size={"large"}
                htmlType={"submit"}
              />
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
