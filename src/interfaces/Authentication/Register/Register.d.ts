import {MutationFunction} from '@apollo/react-common';
import {FormikErrors, FormikValues} from 'formik';
import {ChangeEvent} from 'react';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

export declare interface RegisterData {
    register: {
        token: string;
        userId: string;
        message: string;
    };
}

export declare interface RegisterDataResponse {
    data?: {
        register: {
            token: string;
            userId: string;
            message: string;
        };
    } | undefined;
}

export declare interface RegisterModalState {
    modalRegister: boolean;
    confirmLoading: boolean;
    errorRegister: undefined | string;
}

export declare interface FormikReturnProps {
    validateForm: (values?: any) => Promise<FormikErrors<FormikValues>>;
    submitForm: () => Promise<void>;
    handleSubmit: () => (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (((e: CheckboxChangeEvent) => void) & ((e: ChangeEvent<HTMLInputElement>) => void) | undefined);
    errors: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    };
}