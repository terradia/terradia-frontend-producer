import React, {useState} from "react";
import Button from "../../Ui/Button";
import {Formik} from "formik";
import {notification as _notification} from "antd";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import * as Yup from "yup";
import LoginModal from "./LoginModal";
import {LoginDataResponse, LoginModalState, FormikReturnProps} from './Login.d'
import {gql} from "apollo-boost";

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

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            userId
        }
    }
`;

export default function LoginForm() {
    const client = useApolloClient();
    const [login] = useMutation(LOGIN);
    const [modalState, setModalState] = useState<LoginModalState>({
        modalLogin: false,
        confirmLoading: false,
        errorLogin: 'None',
        password: "",
        email: ""
    });

    const openModal = () => {
        setModalState({
            ...modalState,
            modalLogin: true
        });
    };

    const closeModal = () => {
        setModalState({
            ...modalState,
            confirmLoading: false,
            modalLogin: false
        });
    };

    const loginDataHandler = (response: LoginDataResponse) => {
        if (response && response.data) {
            closeModal();
            successLoginNotification();
            localStorage.setItem('token', response.data.login.token);
            setModalState({
                ...modalState,
                confirmLoading: false
            });
            client.resetStore();
        } else {
            setModalState({
                ...modalState,
                errorLogin: undefined
            })
        }
    };

    const submitForm = (values: { email: any; password: any; }) => {
        setModalState({
            ...modalState,
            confirmLoading: true,
            errorLogin: 'None'
        });
        login({variables: {email: values.email, password: values.password}}).then(loginDataHandler);
    };

    const successLoginNotification = () => {
        _notification['success']({
            message: 'Login Sucess',
            description:
                'You\'re now log in your account.',
        });
    };

    return (
        <div>
            <Button color={"primary"} onClick={openModal} style={{margin: '0px'}}>Login</Button>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validationSchema={SignInSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={(values) => {
                    submitForm(values)
                }}
            >
                {(props: FormikReturnProps) => {
                    return <LoginModal {...props} closeModal={closeModal} modalState={modalState}/>
                }}
            </Formik>
        </div>
    )
}