import {Formik} from "formik";
import MyInput from "../../Ui/Input";
import {Checkbox, notification as _notification} from "antd";
import React, {useState} from "react";
import * as Yup from 'yup';
import Button from "../../Ui/Button";
// import LoginModal from "../../../../terradia-frontend/components/Authentication/Login/LoginModal";
import ApolloClient from "apollo-client";
import {Mutation} from "@apollo/react-components";
import LoginMutation from "../../../graphql/mutation/login.graphql";
import {useMutation} from '@apollo/react-hooks';


declare interface LoginData {
    login: {
        token: string;
        userId: string;
    }
}

declare interface GetUserData {
    getUser: {
        firstName: string;
        lastName: string;
    }
}

declare interface LoginProps {
    data: GetUserData | undefined;
    client: ApolloClient<object>;
    login?: Function
}


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

const LoginForm = (props: LoginProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const OnCompletedHandler = (client: ApolloClient<object>, data: LoginData) => {
        localStorage.setItem('token', data.login.token);
        client.resetStore();
    };

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


    // TODO Verif si deja login

    const [testLogin, {data}] = useMutation(LoginMutation);

    const submitForm = (values: { email: any; password: any; }) => {
        console.log('submitForm', values);

        // return (
        //     <Mutation<LoginData> mutation={LoginMutation} onCompleted={(data) => {
        //         OnCompletedHandler(client, data)
        //     }} onError={OnLoginErrorHandler}>
        //         {(login) => (<LoginForm client={client} data={data} login={login}/>
        //         )
        //         }
        //     </Mutation>
        // )

        testLogin({variables: {email: values.email, password: values.password}}).then((data: any) => {
            console.log('data', data);
            if (data) {
                successLoginNotification();
            } else {
                console.log('Error !!');
            }
        });

        // props.login({variables: {email: values.email, password: values.password}}).then((data: any) => {
        //     console.log('data', data);
        //     if (data) {
        //         successLoginNotification();
        //     } else {
        //         console.log('Error !!');
        //     }
        // });

        // this.setState({
        //     confirmLoading: true,
        //     errorLogin: 'None'
        // });
        // this.props.login({variables: {email: values.email, password: values.password}}).then((data: any) => {
        //     if (data) {
        //         this.closeModal();
        //         this.successLoginNotification();
        //     } else {
        //         this.setState({
        //             errorLogin: undefined
        //         })
        //     }
        //     this.setState({confirmLoading: false});
        // });
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
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => {
                return (
                    <
                        form
                        onSubmit={handleSubmit}>
                        < MyInput
                            name={'email'}
                            type={'default'}
                            style={
                                {
                                    color: errors.email ? 'red' : undefined,
                                    borderColor: errors.email ? 'red' : undefined,
                                }
                            }
                            placeholder={'Login'}
                            id={'id_login'}
                            autoComplete={'email'}
                            onChange={handleChange}
                        />
                        {
                            errors.email &&
                            <div id="feedback" style={{color: "red"}}>{errors.email}</div>
                        }
                        <MyInput
                            name={'password'}
                            type={"password"}
                            style={{
                                color: errors.password ? 'red' : undefined,
                                borderColor: errors.password ? 'red' : undefined,
                            }}
                            placeholder={'Password'}
                            id={'id_password'}
                            autoComplete={'current-password'}
                            onChange={handleChange}
                        />
                        {
                            errors.password &&
                            <div id="feedback" style={{color: "red"}}>{errors.password}</div>
                        }

                        <Checkbox name={'rememberMe'} onChange={handleChange}>
                            Remember Me
                        </Checkbox>
                        < Button
                            text={'Se connecter'}
                            size={'large'}
                            style={
                                {
                                    backgroundImage: 'linear-gradient(90deg, #5CC04A 0%, #8FDD3D 100%)',
                                    width: '100%',
                                    color: 'white',
                                }
                            }
                            htmlType={'submit'}
                        />
                    </form>
                )
            }}
        </Formik>
    );
};

export default LoginForm;