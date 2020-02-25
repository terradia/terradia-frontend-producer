import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {Checkbox, Divider} from "antd";
import {loader as graphqlLoader} from 'graphql.macro';
import {Formik} from "formik";
import * as Yup from 'yup';
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import {ReactComponent as AppleLogo} from "../../../../assets/Icon/company/apple.svg";
import {ReactComponent as FacebookLogo} from "../../../../assets/Icon/company/facebook.svg";
import '../../../../assets/Style/Login/loginForm.less';

const mutationLogin = graphqlLoader('../../../graphql/mutation/login.graphql');

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Votre adresse email est invalide')
        .required('Veuillez entrer votre adresse email')
    ,
    password: Yup.string()
        .required('Veuillez entrer votre mot de passe')
        .min(2, 'Votre mot de passe doit contenir plus de 2 caractère')
        .max(20, 'Votre mot de passe ne peut dépasser 20 caractère')
});

const LoginForm = () => {
    const [login, {data}] = useMutation(mutationLogin);
    const client = useApolloClient();
    const history = useHistory();

    const OnErrorHandler = (data: { message: string; }) => {
        console.log(data.message);
    };

    const submitForm = (values: { email: string; password: string; }) => {
        login({variables: {email: values.email, password: values.password}}).then((data: any) => {
            if (data) {
                localStorage.setItem('token', data.data.login.token);
                client.resetStore();
            } else {
                OnErrorHandler(data);
            }
        });
    };

    const OnRedirectHandler = (path) => {
        history.push(path);
    };
    // TODO Remember ME
    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: false}}
            validationSchema={SignInSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values) => {
                submitForm(values)
            }}
        >
            {({
                  errors,
                  handleChange,
                  handleSubmit,
              }) => {
                return (
                    <div className={'login_box'}>
                        <div className={'login_form_div'}>
                            <form
                                className={'auth_form'}
                                onSubmit={handleSubmit}>
                                <Input
                                    name={'email'}
                                    className={'form_item input_item'}
                                    id={'input_login'}
                                    size={'large'}
                                    type={'default'}
                                    placeholder={'Email'}
                                    style={
                                        {
                                            color: errors.email ? 'red' : undefined,
                                            borderColor: errors.email ? 'red' : undefined,
                                        }
                                    }
                                    autoComplete={'email'}
                                    onChange={handleChange}
                                />
                                {
                                    errors.email &&
                                    <div id="feedback" style={{color: "red"}}>{errors.email}</div>
                                }
                                <Input
                                    name={'password'}
                                    className={'form_item input_item'}
                                    id={'input_password'}
                                    size={'large'}
                                    type={"password"}
                                    placeholder={'Mot de passe'}
                                    style={{
                                        color: errors.password ? 'red' : undefined,
                                        borderColor: errors.password ? 'red' : undefined,
                                    }}
                                    autoComplete={'current-password'}
                                    onChange={handleChange}
                                />
                                {
                                    errors.password &&
                                    <div id="feedback" style={{color: "red"}}>{errors.password}</div>
                                }

                                <Checkbox name={'rememberMe'} onChange={handleChange} className={'form_item'}>
                                    Remember Me
                                </Checkbox>
                                <Button
                                    text={'Se connecter'}
                                    className={'form_item terradia_button'}
                                    id={'login_button'}
                                    size={'large'}
                                    htmlType={'submit'}
                                />
                                <p id={'forgot_password'} >
                                    <NavLink to="/ResetPassword" >
                                        Mot de passe oublié ?
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                        <Divider className={'auth_divider'}> OU </Divider>
                        <div className={"not_register"}>
                            <div className={'external_connexion'}>
                                <Button
                                    className={'button_register'}
                                    text={'Facebook'}
                                    size={'large'}
                                    id={'facebook_button'}
                                    icon={<FacebookLogo/>}
                                />
                                <Button
                                    className={'button_register'}
                                    text={'Apple'}
                                    size={'large'}
                                    id={'apple_button'}
                                    icon={<AppleLogo/>}
                                />
                            </div>
                            <div className={'register_div'}>
                                <p>Vous n'avez pas encore de compte ?</p>
                                <Button
                                    className={'button_register terradia_button'}
                                    text={"S'enregister"}
                                    size={'large'}
                                    id={'register_button'}
                                    htmlType={'submit'}
                                    onClick={() => OnRedirectHandler('/Register')}
                                />
                            </div>
                        </div>
                    </div>

                )
            }}
        </Formik>
    );
};

export default LoginForm;