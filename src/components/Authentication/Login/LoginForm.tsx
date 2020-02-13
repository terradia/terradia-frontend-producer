import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {Checkbox, Divider, notification as _notification} from "antd";
import {loader as graphqlLoader} from 'graphql.macro';
import {Formik} from "formik";
import * as Yup from 'yup';
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import {ReactComponent as AppleLogo} from "../../../assets/Icon/company/apple.svg";
import {ReactComponent as FacebookLogo} from "../../../assets/Icon/company/facebook.svg";
import '../../../assets/Style/Login/loginForm.less';
import UserContext from "../../Context/UserContext";

const mutationLogin = graphqlLoader('../../../graphql/mutation/login.graphql');
const getUserDataCached = graphqlLoader("../../../../graphql/query/getUserDataCached.graphql");
const getUser = graphqlLoader('../../../../graphql/query/getUser.graphql');

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Your email is invalid')
        .required('Your email is required')
        .min(2, 'Your email must be longer than 2 character')
    ,
    password: Yup.string()
        .required('Your password is required')
        .min(2, 'Your password must be longer than 2 character')
        .max(20, 'It is long password')
});

const LoginForm = () => {
    const client = useApolloClient();
    const userId = useContext(UserContext);
    const [login, {data}] = useMutation(mutationLogin);
    const history = useHistory();

    const OnErrorHandler = (data: { message: any; }) => {
        console.log(data.message);
    };

    const successLoginNotification = () => {
        _notification['success']({
            message: 'Login Sucess',
            description:
                'You\'re now log in your account.',
        });
    };

    const submitForm = (values: { email: any; password: any; }) => {
        console.log(userId);
        const userData = client.readQuery({query: getUser/*, variables: {id: userId}*/});
        console.log(userData);
        login({variables: {email: values.email, password: values.password}}).then((data: any) => {
            if (data) {
                localStorage.setItem('token', data.data.login.token);
                client.resetStore();
                successLoginNotification();
                if (userData && userData.getUser && userData.getUser.companies && !localStorage.getItem("defaultCompany")) {
                    console.log("redirect to Company Selection");
                    history.push("/Company");
                } /*else {
                    console.log("redirect to home");
                    history.push("/Home");
                }*/
            } else {
                OnErrorHandler(data);
            }
        });
    };

    const OnRedirectHandler = (path) => {
        history.push(path);
    };

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
                    <div className={'right_box'}>
                        <div className={'form_div'}>
                            <form
                                className={'login_form'}
                                onSubmit={handleSubmit}>
                                <Input
                                    name={'email'}
                                    className={'form_item'}
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
                                    className={'form_item'}
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
                                    className={'form_item'}
                                    id={'login_button'}
                                    size={'large'}
                                    style={
                                        {
                                            borderColor: 'linear-gradient(90deg, #5CC04A 0%, #8FDD3D 100%)',
                                            width: '100%',
                                            color: 'linear-gradient(90deg, #5CC04A 0%, #8FDD3D 100%)',
                                        }
                                    }
                                    htmlType={'submit'}
                                />
                                <p id={'forgot_password'} className={'form_item'}>
                                    <NavLink to="/ResetPassword" >
                                        Mot de passe oublié ?
                                    </NavLink>
                                </p>
                            </form>
                        </div>
                        <Divider className={'login_divider'}> OU </Divider>
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
                                    className={'button_register'}
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