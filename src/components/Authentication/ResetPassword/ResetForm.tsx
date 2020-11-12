import React, { useState } from "react";
import { Input } from "antd";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "../../Ui/Button";
import Text from "antd/lib/typography/Text";
import { loader as graphqlLoader } from "graphql.macro";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { addNotification } from "../../../utils/notifications";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons/lib";
import ReactCodeInput from "react-verification-code-input";
import { Redirect } from "react-router-dom";

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Votre adresse email est invalide")
    .required("Veuillez entrer votre adresse email"),
});

const mutationGenerateCodePasswordForgot = graphqlLoader(
  "../../../graphql/mutation/password-forgot/generateCodePasswordForgot.graphql"
);
const mutationSignInWithgeneratedCode = graphqlLoader(
  "../../../graphql/mutation/password-forgot/signInWithgeneratedCode.graphql"
);
const getUser = graphqlLoader("../../../graphql/query/getUser.graphql");
const getCompanies = graphqlLoader(
  "../../../graphql/query/getCompanies.graphql"
);

declare interface ResetData {
  data: {
    signInWithgeneratedCode: {
      token: string;
      userId: string;
    };
  };
}

const ResetForm: React.FC = () => {
  const client = useApolloClient();
  const [generatePassCode] = useMutation(mutationGenerateCodePasswordForgot);
  const [signInWithgeneratedCode] = useMutation(
    mutationSignInWithgeneratedCode
  );
  const [isCodeGenerated, setCodeIsGenerated] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [prevToken, setPrevToken] = useState("");
  const [redirect, setRedirect] = useState("");

  const handleCodeChange = (vals) => setCode(vals);

  const finaliseRedirect = () => {
    dispatchEvent(
      new StorageEvent("storage", {
        key: "token",
        oldValue: prevToken,
        newValue: localStorage.getItem("token"),
      })
    );
    localStorage.setItem("connectedAsPasswordForgot", "true");
    addNotification({
      message: "Connexion",
      description:
        "Vous avez bien été connecté, pensez à changer votre mot de passe (Dans la section profil)",
      icon: <CheckCircleOutlined style={{ color: "#5CC04A" }} />,
    });
  };

  const redirectToProducts = (data) => {
    if (
      data &&
      data.getCompanies &&
      (!localStorage.getItem("rememberCompany") ||
        localStorage.getItem("rememberCompany") === "false")
    ) {
      setRedirect("CompanySelection");
      finaliseRedirect();
    } else if (data && data.getCompanies) {
      if (
        data.getCompanies.length >= 1 &&
        !!localStorage.getItem("rememberCompany") &&
        localStorage.getItem("rememberCompany") === "true"
      ) {
        setRedirect("/products");
        finaliseRedirect();
      }
    }
  };

  const [getCompaniesQuery] = useLazyQuery(getCompanies, {
    onCompleted: redirectToProducts,
  });
  const [getUserQuery] = useLazyQuery(getUser, {
    onCompleted: () => getCompaniesQuery(),
  });

  const onSubmit = () => {
    if (code.length !== 6) {
      return addNotification({
        message: "Erreur",
        description:
          "Entrez le code à 6 chiffres reçu par mail, s'il vous plaît",
        icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
      });
    }
    signInWithgeneratedCode({
      variables: {
        email,
        code,
      },
    })
      .then((response: ResetData) => {
        setPrevToken(localStorage.getItem("token"));
        localStorage.setItem(
          "token",
          response.data.signInWithgeneratedCode.token
        );
        client.clearStore().then(() => {
          getUserQuery();
        });
        localStorage.setItem("connectedAsPasswordForgot", "true");
      })
      .catch((error) => {
        addNotification({
          message: "Erreur lors de la connexion",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
      });
  };

  if (redirect !== "" && localStorage.getItem("token")) {
    return <Redirect to={redirect} />;
  }

  if (isCodeGenerated === true)
    return (
      <div className={"reset_box"}>
        <div className={"reset_form_div"}>
          <ReactCodeInput
            title={"Entrez le code reçu par email"}
            className={"code-input"}
            onChange={handleCodeChange}
            autoFocus={true}
          />
          <Button
            isLoading={false}
            text={"Envoyer"}
            className={"form_item btn-validate"}
            id={"validate_button"}
            size={"large"}
            onClick={onSubmit}
          />
        </div>
      </div>
    );

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ResetSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values) => {
        setEmail(values.email);
        generatePassCode({
          variables: {
            email: values.email,
          },
        })
          .then(() => {
            setCodeIsGenerated(true);
          })
          .catch((error) => {
            addNotification({
              message: "Erreur lors de la demande de mot de passe oublié",
              description: error.message.substr(14),
              icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
            });
          });
      }}
    >
      {({ errors, handleChange, handleSubmit }) => {
        return (
          <div className={"reset_box"}>
            <div className={"reset_form_div"}>
              <form className={"reset-form"} onSubmit={handleSubmit}>
                {errors.email && (
                  <div
                    id="feedback"
                    className={"error-description error-email"}
                  >
                    {errors.email}
                  </div>
                )}
                <Text className={"instruction"}>Entrez votre email</Text>
                <Input
                  name={"email"}
                  className={"form_item input_item"}
                  id={"input_email"}
                  size={"large"}
                  type={"default"}
                  placeholder={"E-mail"}
                  style={{
                    color: errors.email ? "#f5222d" : undefined,
                    borderColor: errors.email ? "#f5222d" : undefined,
                  }}
                  autoComplete={"email"}
                  onChange={handleChange}
                />
                <Button
                  isLoading={false}
                  text={"Valider"}
                  className={"form_item btn-validate"}
                  id={"validate_button"}
                  size={"large"}
                  htmlType={"submit"}
                />
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ResetForm;
