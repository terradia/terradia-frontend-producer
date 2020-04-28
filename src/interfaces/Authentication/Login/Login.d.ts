import {MutationFunction} from '@apollo/react-common';
import {FormikErrors, FormikValues} from 'formik';
import {ChangeEvent} from 'react';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

export declare interface LoginData {
    login: {
        token: string;
        userId: string;
    };
}

export declare interface LoginDataResponse {
    data?: {
        login: {
            token: string;
            userId: string;
        };
    } | undefined;
}

export declare interface LoginModalState {
    modalLogin: boolean;
    confirmLoading: boolean;
    errorLogin: undefined | string;
    password: string;
    email: string;
}

export declare interface FormikReturnProps {
    validateForm: (values?: any) => Promise<FormikErrors<FormikValues>>;
    submitForm: () => Promise<void>;
    handleSubmit: () => (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (((e: CheckboxChangeEvent) => void) & ((e: ChangeEvent<HTMLInputElement>) => void) | undefined);
    errors: {
        email: string;
        password: string;
    };
}