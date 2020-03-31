import React from 'react';
import { ReactComponent as Logo } from '../assets/Terradia_white.svg';
import { Divider } from 'antd';
import '../assets/Style/Login-Register/loginRegisterPage.less';
import LoginForm from '../components/Authentication/Login/LoginForm';

const Login = () => {
  return (
    <div className={'loginPage'}>
      <div className={'presentation'}>
        <Logo className={'logo'} />
        <Divider className={'presentation-divider'} />
        <p className={'description'}>
          L’application qui facilite l’accès aux produits locaux
        </p>
      </div>
      <div className={'action-auth'}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
