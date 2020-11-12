import React, { useState } from "react";
import { Formik } from "formik";
import Button from "../../Ui/Button";
import { Checkbox, Divider, Input } from "antd";
import * as Yup from "yup";
import { loader as graphqlLoader } from "graphql.macro";
import { useApolloClient, useMutation } from "@apollo/client";
import "../../../assets/Style/Login-Register/registerForm.less";
import { AppleFilled, FacebookFilled } from "@ant-design/icons/lib";
import { Redirect } from "react-router-dom";

const mutationRegister = graphqlLoader(
  "../../../graphql/mutation/register.graphql"
);

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Votre adresse email est invalide")
    .required("Veuillez entrer votre adresse email"),
  password: Yup.string()
    .required("Veuillez entrer votre mot de passe")
    .min(2, "Votre mot de passe doit contenir plus de 2 caractère")
    .max(20, "Votre mot de passe ne peut dépasser 20 caractère"),
  lastname: Yup.string().required("Veuillez entrer votre nom de famille"),
  firstname: Yup.string().required("Veuillez entrer votre prénom"),
  phone: Yup.string()
    .required("Veuillez entrer votre numéro de téléphone")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Votre numéro de téléphone est invalide"
    ),
  acceptedCondition: Yup.bool().oneOf(
    [true],
    "Vous devez accepter les conditions générales d'utilisation."
  ),
});

declare interface RegisterFormProps {
  onRegister?: () => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const [
    register,
    { loading: registerLoading, error: registerError },
  ] = useMutation(mutationRegister);
  const client = useApolloClient();
  const [redirect, setRedirect] = useState("");

  if (registerError) console.log(registerError);

  const OnErrorHandler = (data: { message: any }) => {
    console.log(data.message);
  };

  const submitForm = (values: {
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    phone: string;
  }) => {
    register({
      variables: {
        email: values.email,
        password: values.password,
        lastName: values.lastname,
        firstName: values.firstname,
        phone: values.phone,
      },
    }).then((data: any) => {
      if (data !== null && data.data.register !== undefined) {
        localStorage.setItem("token", data.data.register.token);
        client.resetStore();
        if (props.onRegister) {
          props.onRegister();
        }
        setRedirect("/login");
      } else {
        OnErrorHandler(data);
      }
    });
  };

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        acceptedCondition: false,
      }}
      validationSchema={RegisterSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {({ errors, handleChange, handleSubmit }) => {
        return (
          <div className={"register_form"}>
            <form className={"auth_form"} onSubmit={handleSubmit}>
              {errors.email && (
                <div id="feedback" className={"error-description error-email"}>
                  {errors.email}
                </div>
              )}
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
              {errors.password && (
                <div id="feedback" className={"error-description"}>
                  {errors.password}
                </div>
              )}
              <Input
                name={"password"}
                className={"form_item input_item"}
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
              <div className={"external_connexion"}>
                <span>
                  {errors.lastname && (
                    <div id="feedback" className={"error-description"}>
                      {errors.lastname}
                    </div>
                  )}
                  <Input
                    name={"lastname"}
                    className={"form_item input_item"}
                    id={"input_lastname"}
                    size={"large"}
                    type={"default"}
                    placeholder={"Nom"}
                    style={{
                      color: errors.lastname ? "red" : undefined,
                      borderColor: errors.lastname ? "red" : undefined,
                    }}
                    onChange={handleChange}
                  />
                </span>
                <Divider type={"vertical"} className={"invisible-divider"} />
                <span>
                  {errors.firstname && (
                    <div id="feedback" className={"error-description"}>
                      {errors.firstname}
                    </div>
                  )}
                  <Input
                    name={"firstname"}
                    className={"form_item input_item"}
                    id={"input_firstname"}
                    size={"large"}
                    type={"default"}
                    placeholder={"Prénom"}
                    style={{
                      color: errors.firstname ? "red" : undefined,
                      borderColor: errors.firstname ? "red" : undefined,
                    }}
                    onChange={handleChange}
                  />
                </span>
              </div>
              {errors.phone && (
                <div id="feedback" className={"error-description"}>
                  {errors.phone}
                </div>
              )}
              <Input
                name={"phone"}
                className={"form_item input_item"}
                id={"input_phone"}
                size={"large"}
                type={"default"}
                placeholder={"Numéro de téléphone"}
                style={{
                  color: errors.phone ? "red" : undefined,
                  borderColor: errors.phone ? "red" : undefined,
                }}
                onChange={handleChange}
              />
              {errors.acceptedCondition && (
                <div id="feedback" className={"error-description"}>
                  {errors.acceptedCondition}
                </div>
              )}
              <Checkbox
                name={"acceptedCondition"}
                onChange={handleChange}
                className={"form_item"}
              >
                {"J'ai lu et j'accepte les conditions générales d'utilisation"}
              </Checkbox>
              <Button
                isLoading={registerLoading}
                text={"S'inscrire"}
                className={"form_item"}
                id={"login_button"}
                size={"large"}
                htmlType={"submit"}
              />
            </form>
            <Divider className={"auth_divider"}>OU</Divider>
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
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
