import React, { useContext, useEffect, useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/react-hooks";
import { Checkbox, Divider, Input } from "antd";
import { loader as graphqlLoader } from "graphql.macro";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../../Ui/Button";
import "../../../assets/Style/Login-Register/loginForm.less";
import UserContext from "../../Context/UserContext";
import {
  AppleFilled,
  CloseCircleOutlined,
  FacebookFilled,
} from "@ant-design/icons/lib";
import { addNotification } from "../../../utils/notifications";

const mutationLogin = graphqlLoader("../../../graphql/mutation/login.graphql");
const getUser = graphqlLoader("../../../graphql/query/getUser.graphql");
const getCompanies = graphqlLoader(
  "../../../graphql/query/getCompanies.graphql"
);

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Votre adresse email est invalide")
    .required("Veuillez entrer votre adresse email"),
  password: Yup.string()
    .required("Veuillez entrer votre mot de passe")
    .min(2, "Votre mot de passe doit contenir plus de 2 caractère")
    .max(20, "Votre mot de passe ne peut dépasser 20 caractère"),
});

declare interface LoginData {
  data: {
    login: {
      token: string;
      userId: string;
    };
  };
}

declare interface LoginFormProps {
  onLogin?: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const client = useApolloClient();
  const userContext = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [login, { loading: loginLoading }] = useMutation(mutationLogin);
  const [
    getCompaniesQuery,
    { loading: companiesLoading, data: companiesData, called },
  ] = useLazyQuery(getCompanies);
  const history = useHistory();

  const onGetUser = () => {
    if (props.onLogin) {
      props.onLogin();
    }
  };

  const [getUserQuery] = useLazyQuery(getUser, {
    onCompleted: onGetUser,
    onError: (e) => console.log(e),
  });

  useEffect(() => {
    if (userContext) getCompaniesQuery();
  }, [getCompaniesQuery, userContext]);

  useEffect(() => {
    if (called && !companiesLoading) {
      if (
        companiesData &&
        companiesData.getCompanies &&
        (!localStorage.getItem("rememberCompany") ||
          localStorage.getItem("rememberCompany") === "false")
      ) {
        setRedirect("CompanySelection");
      } else if (companiesData && companiesData.getCompanies) {
        if (
          companiesData.getCompanies.length >= 1 &&
          !!localStorage.getItem("rememberCompany") &&
          localStorage.getItem("rememberCompany") === "true"
        ) {
          setRedirect("/products");
        }
      }
    }
  }, [called, companiesData, companiesLoading, history]);

  if (redirect !== "" && localStorage.getItem("token")) {
    return <Redirect to={redirect} />;
  }

  const OnErrorHandler = (data: LoginData) => {
    console.log(data);
  };

  const submitForm = (values: { email: any; password: any }) => {
    login({ variables: { email: values.email, password: values.password } })
      .then((loginData: LoginData) => {
        if (loginData) {
          const prevToken = localStorage.getItem("token");
          localStorage.setItem("token", loginData.data.login.token);
          client.clearStore().then(() => {
            getCompaniesQuery();
            getUserQuery();
            if (!props.onLogin) {
              dispatchEvent(
                new StorageEvent("storage", {
                  key: "token",
                  oldValue: prevToken,
                  newValue: loginData.data.login.token,
                })
              );
            }
          });
        } else {
          OnErrorHandler(loginData);
        }
      })
      .catch((error) => {
        addNotification({
          message: "Erreur lors de la connexion",
          description: error.message.substr(14),
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={SignInSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={submitForm}
    >
      {({ errors, handleChange, handleSubmit }) => {
        return (
          <div className={"login_box"}>
            <div className={"login_form_div"}>
              <form className={"auth_form"} onSubmit={handleSubmit}>
                {errors.email && (
                  <div
                    id="feedback"
                    className={"error-description error-email"}
                  >
                    {errors.email}
                  </div>
                )}
                <Input
                  name={"email"}
                  className={"form_item"}
                  id={"input_login"}
                  size={"large"}
                  type={"default"}
                  placeholder={"Email"}
                  style={{
                    color: errors.email ? "red" : undefined,
                    borderColor: errors.email ? "red" : undefined,
                  }}
                  autoComplete={"email"}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div id="feedback" className={"error-description"}>
                    {errors.password}
                  </div>
                )}
                <Input
                  name={"password"}
                  className={"form_item"}
                  id={"input_password"}
                  size={"large"}
                  type={"password"}
                  placeholder={"Mot de passe"}
                  style={{
                    color: errors.password ? "red" : undefined,
                    borderColor: errors.password ? "red" : undefined,
                  }}
                  autoComplete={"current-password"}
                  onChange={handleChange}
                />

                <Checkbox
                  name={"rememberMe"}
                  onChange={handleChange}
                  className={"form_item remember-box"}
                >
                  Se souvenir de moi
                </Checkbox>
                <Button
                  text={"Se connecter"}
                  className={"form_item"}
                  id={"login_button"}
                  size={"large"}
                  width={"100%"}
                  htmlType={"submit"}
                  isLoading={loginLoading || companiesLoading}
                />
                <div className={"forgot_password"}>
                  <NavLink to="/ResetPassword">Mot de passe oublié ?</NavLink>
                </div>
              </form>
              <Divider className={"auth_divider"}>OU</Divider>
              <div className={"not_register"}>
                <div className={"external_connexion"}>
                  <Button
                    className={"button_register"}
                    text={"Facebook"}
                    size={"large"}
                    id={"facebook_button"}
                    accentColor={"#2174EE"}
                    icon={<FacebookFilled />}
                  />
                  <Button
                    className={"button_register"}
                    text={"Apple"}
                    size={"large"}
                    id={"apple_button"}
                    accentColor={"#202020"}
                    icon={<AppleFilled />}
                  />
                </div>
                {!props.onLogin && (
                  <div className={"register_div"}>
                    <div className={"register-catching"}>
                      {"Vous n'avez pas encore de compte ?"}
                    </div>
                    <Button
                      id={"register_button"}
                      className={"button_register"}
                      text={"S'inscrire"}
                      size={"large"}
                      htmlType={"submit"}
                      onClick={(): void => history.push("/Register")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
