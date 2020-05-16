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

const steps = [
  {
    title: "S'enregistrer",
    content: <RegisterForm />,
  },
  {
    title: "Création de l'entreprise",
    content: <GeneralInfoForm />,
  },
  {
    title: "Information administrative",
    content: <AdministrativeInfoForm />,
  },
];

const createCompanyMutation = graphqlLoader(
  "../../graphql/mutation/createCompany.graphql"
);
const getUser = graphqlLoader("../../graphql/query/getUser.graphql");

const CompanyRegisterForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);
  const [createCompany] = useMutation(createCompanyMutation);
  const client = useApolloClient();

  useEffect(() => {
    const user = client.readQuery({ query: getUser });
    console.log(user);
    if (user) {
      steps[0].title = "Se connecter";
      steps[0].content = (
        <LoginForm onLogin={() => setCurrentStep(currentStep + 1)} />
      );
      setCurrentStep(1);
    }
  }, [client]);

  const onSubmit = (values) => {
    console.log(values);
    createCompany({ variables: values }).then((data) => {
      console.log(data);
    });
  };

  const switchLoginRegister = () => {
    setHasAccount(!hasAccount);
    if (hasAccount) {
      steps[0].title = "S'enregistrer";
      steps[0].content = (
        <RegisterForm onRegister={() => setCurrentStep(currentStep + 1)} />
      );
    } else {
      steps[0].title = "Se connecter";
      steps[0].content = (
        <LoginForm onLogin={() => setCurrentStep(currentStep + 1)} />
      );
    }
  };

  if (currentStep === 0)
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
              //isLoading={loading}
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
              onClick={() => setCurrentStep(currentStep - 1)}
              className={"prev_step"}
            >
              <LeftOutlined />
              <span>{"Retour à l’étape précédente"}</span>
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
                //isLoading={loading}
                text={"Étape Suivante"}
                className={"form_item"}
                id={"next_step"}
                size={"large"}
                onClick={() => {
                  form
                    .validateFields()
                    .then(() => {
                      setCurrentStep(currentStep + 1);
                    })
                    .catch((values) => {
                      console.log(values);
                    });
                }}
              />
            )}
            {currentStep === steps.length - 1 && (
              <Button
                //isLoading={loading}
                text={"Enregistrer l'entreprise"}
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
