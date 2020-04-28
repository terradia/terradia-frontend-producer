import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
} from '@apollo/react-hooks';
import { Checkbox, Divider, notification } from 'antd';
import { loader as graphqlLoader } from 'graphql.macro';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import '../../../assets/Style/Login-Register/loginForm.less';
import FacebookIcon from '../../Icons/FacebookIcon';
import AppleIcon from '../../Icons/AppleIcon';
import CreateCompanyButton from '../../Ui/CreateCompanyButton';
import UserContext from '../../Context/UserContext';

const mutationLogin = graphqlLoader('../../../graphql/mutation/login.graphql');
const getCompanies = graphqlLoader('../../../graphql/query/getCompanies.graphql');
const getUser = graphqlLoader('../../../graphql/query/getUser.graphql');

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Votre adresse email est invalide')
    .required('Veuillez entrer votre adresse email'),
  password: Yup.string()
    .required('Veuillez entrer votre mot de passe')
    .min(2, 'Votre mot de passe doit contenir plus de 2 caractère')
    .max(20, 'Votre mot de passe ne peut dépasser 20 caractère'),
});

const LoginForm = () => {
  const client = useApolloClient();
  const userContext = useContext(UserContext);
  const [redirect, setRedirect] = useState('');
  const [login, { loading: loginLoading }] = useMutation(mutationLogin);
  const [getUserQuery] = useLazyQuery(getUser);
  const [getCompaniesQuery, { loading: companiesLoading, data: companiesData, called }] = useLazyQuery(getCompanies);
  const history = useHistory();

  useEffect(() => {
    if (userContext)
      getCompaniesQuery();
  }, [getCompaniesQuery, userContext]);

  useEffect(() => {
    if (called && !companiesLoading) {
      if (companiesData && companiesData.getCompanies &&
        companiesData.getCompanies.length >= 1 &&
        (!!!localStorage.getItem('rememberCompany') ||
          localStorage.getItem('rememberCompany') === 'false')
      ) {
        setRedirect('CompanySelection');
      } else if (companiesData && companiesData.getCompanies) {
        if (companiesData.getCompanies.length >= 1 &&
          (!!localStorage.getItem('rememberCompany') &&
            localStorage.getItem('rememberCompany') === 'true')) {
          setRedirect('/home');
        } else {
          notification['warn']({
            message: 'Vous n\'avez pas d\'entreprise. ',
            btn: <CreateCompanyButton callback={() => setRedirect('/companyRegister')}/>,
          });
        }
      }
    }
  }, [called, companiesData, companiesLoading]);

  if (redirect !== '' && localStorage.getItem('token')) {
    console.log("redirect to: " + redirect);
    return <Redirect to={redirect}/>;
  }

  const OnErrorHandler = (data: { message: any }) => {
    console.log(data.message);
  };

  const submitForm = (values: { email: any; password: any; }) => {
    login({ variables: { email: values.email, password: values.password } }).then((loginData: any) => {
      if (loginData) {
        const prevToken = localStorage.getItem('token');
        localStorage.setItem('token', loginData.data.login.token);
        dispatchEvent(new StorageEvent('storage', {
          key: 'token',
          oldValue: prevToken,
          newValue: loginData.data.login.token
        }));
        client.resetStore().then(() => {
          getCompaniesQuery();
          getUserQuery();
        }).catch((error) => {
          console.log(error);
        });
      } else {
        OnErrorHandler(loginData);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={SignInSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={submitForm}
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
                  id={'input_email'}
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
                  <div id="feedback" style={{ color: 'red' }}>{errors.email}</div>
                }
                <Input
                  name={'password'}
                  className={'form_item input_item'}
                  id={'input_password'}
                  size={'large'}
                  type={'password'}
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
                  <div id="feedback" style={{ color: 'red' }}>{errors.password}</div>
                }

                <Checkbox name={'rememberMe'} onChange={handleChange} className={'form_item'}>
                  Remember Me
                </Checkbox>
                <Button
                  text={'Se connecter'}
                  className={'form_item button_login terradia_button'}
                  id={'login_button'}
                  size={'large'}
                  htmlType={'submit'}
                  isLoading={loginLoading || companiesLoading}
                />
                <p id={'forgot_password'}>
                  <NavLink to="/ResetPassword">
                    Mot de passe oublié ?
                  </NavLink>
                </p>
              </form>
            </div>
            <Divider className={'auth_divider'}> OU </Divider>
            <div className={'not_register'}>
              <div className={'external_connexion'}>
                <Button
                  className={'button_register'}
                  text={'Facebook'}
                  size={'large'}
                  id={'facebook_button'}
                  accentColor={'#2174EE'}
                  icon={<FacebookIcon/>}
                />
                <Button
                  className={'button_register'}
                  text={'Apple'}
                  size={'large'}
                  id={'apple_button'}
                  icon={<AppleIcon/>}
                />
              </div>
              <div className={'register_div'}>
                <p>Vous n'avez pas encore de compte ?</p>
                <Button
                  className={'button_register terradia_button'}
                  text={'S\'enregister'}
                  size={'large'}
                  id={'register_button'}
                  htmlType={'submit'}
                  onClick={() => history.push('/Register')}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
