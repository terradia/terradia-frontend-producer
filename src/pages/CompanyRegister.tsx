import React from 'react';
import { ReactComponent as Logo } from '../assets/Logo/Terradia_white.svg';
import { Divider } from 'antd';
import ReturnButtonContainer from '../components/Authentication/Register/ReturnButtonContainer';
import RegisterForm from '../components/Authentication/Register/RegisterForm';

declare interface CompanyRegisterProps {
}

const CompanyRegister = (props: CompanyRegisterProps) => {
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
        <ReturnButtonContainer />
        <RegisterForm />
      </div>
    </div>
  );
};

export default CompanyRegister;