import {FormikErrors, FormikValues} from "formik";
import {ChangeEvent} from "react";
import {CheckboxChangeEvent} from "antd/es/checkbox";

export declare interface LoginModalProps {
    modalState: {
        modalLogin: boolean;
        confirmLoading: boolean;
        errorLogin: string | undefined;
    };
    closeModal: () => void;
    validateForm: (values?: any) => Promise<FormikErrors<FormikValues>>;
    submitForm: () => Promise<void>;
    handleSubmit: () => (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (((e: CheckboxChangeEvent) => void) & ((e: ChangeEvent<HTMLInputElement>) => void) | undefined);
    errors: {
        email: string;
        password: string;
    };
}