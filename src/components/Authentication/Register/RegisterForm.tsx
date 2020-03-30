import React from "react";
import {Formik} from "formik";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import {Checkbox, Divider} from "antd";
import {ReactComponent as FacebookLogo} from "../../../assets/Icon/company/facebook.svg";
import {ReactComponent as AppleLogo} from "../../../assets/Icon/company/apple.svg";
import * as Yup from "yup";
import {loader as graphqlLoader} from 'graphql.macro';
import {useMutation} from "@apollo/react-hooks";
import '../../../assets/Style/Register/registerForm.less';

const mutationRegister = graphqlLoader('../../../graphql/mutation/register.graphql');

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Votre adresse email est invalide')
        .required('Veuillez entrer votre adresse email')
    ,
    password: Yup.string()
        .required('Veuillez entrer votre mot de passe')
        .min(2, 'Votre mot de passe doit contenir plus de 2 caractère')
        .max(20, 'Votre mot de passe ne peut dépasser 20 caractère')
    ,
    lastname: Yup.string()
        .required('Veuillez entrer votre nom de famille')
    ,
    firstname: Yup.string()
        .required('Veuillez entrer votre prénom')
    ,
    phone: Yup.string()
        .required('Veuillez entrer votre numéro de téléphone')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Votre numéro de téléphone est invalide')
    ,
    acceptedCondition: Yup.bool()
        .oneOf([true], "Vous devez accepter les conditions générales d'utilisation.")
});

const RegisterForm = () => {
    const [register] = useMutation(mutationRegister);

    const OnErrorHandler = (data: { message: any; }) => {
        console.log(data.message);
    };

    const submitForm = (values: { email: string; password: string; lastname: string; firstname: string; phone: string }) => {
        register({
            variables: {
                email: values.email,
                password: values.password,
                lastName: values.lastname,
                firstName: values.lastname,
                phone: values.phone
            }
        }).then((data: any) => {
            if (data) {
                console.log(data);
            } else {
                OnErrorHandler(data);
            }
        });
    };

    return (
        <Formik
            initialValues={{firstname: '', lastname: '', email: '', password: '', phone: '', acceptedCondition: false}}
            validationSchema={RegisterSchema}
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
                    <div className={'register_box'}>
                        <div className={'register_form_div'}>
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
                                <Input
                                    name={'lastname'}
                                    className={'form_item input_item'}
                                    id={'input_login'}
                                    size={'large'}
                                    type={'default'}
                                    placeholder={'Nom'}
                                    style={
                                        {
                                            color: errors.lastname ? 'red' : undefined,
                                            borderColor: errors.lastname ? 'red' : undefined,
                                        }
                                    }
                                    onChange={handleChange}
                                />
                                {
                                    errors.lastname &&
                                    <div id="feedback" style={{color: "red"}}>{errors.lastname}</div>
                                }
                                <Input
                                    name={'firstname'}
                                    className={'form_item input_item'}
                                    id={'input_login'}
                                    size={'large'}
                                    type={'default'}
                                    placeholder={'Prénom'}
                                    style={
                                        {
                                            color: errors.firstname ? 'red' : undefined,
                                            borderColor: errors.firstname ? 'red' : undefined,
                                        }
                                    }
                                    onChange={handleChange}
                                />
                                {
                                    errors.firstname &&
                                    <div id="feedback" style={{color: "red"}}>{errors.firstname}</div>
                                }
                                <Input
                                    name={'phone'}
                                    className={'form_item input_item'}
                                    id={'input_login'}
                                    size={'large'}
                                    type={'default'}
                                    placeholder={'Numéro de téléphone'}
                                    style={
                                        {
                                            color: errors.phone ? 'red' : undefined,
                                            borderColor: errors.phone ? 'red' : undefined,
                                        }
                                    }
                                    onChange={handleChange}
                                />
                                {
                                    errors.phone &&
                                    <div id="feedback" style={{color: "red"}}>{errors.phone}</div>
                                }

                                <Checkbox name={'acceptedCondition'} onChange={handleChange} className={'form_item'}>
                                    J'ai lu et j'accepte les conditions générales d'utilisation
                                </Checkbox>
                                {
                                    errors.acceptedCondition &&
                                    <div id="feedback" style={{color: "red"}}>{errors.acceptedCondition}</div>
                                }

                                <Button
                                    text={'S\'enregistrer'}
                                    className={'form_item terradia_button'}
                                    id={'login_button'}
                                    size={'large'}
                                    htmlType={'submit'}
                                />
                            </form>
                        </div>
                        <Divider className={'auth_divider'}> OU </Divider>
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
                    </div>

                )
            }}
        </Formik>

    );
};

export default RegisterForm;
