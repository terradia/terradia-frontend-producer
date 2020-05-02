import {FormikErrors, FormikValues} from "formik";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import {ChangeEvent} from "react";

export declare interface RegisterModalProps {
    modalState: {
        modalRegister: boolean;
        confirmLoading: boolean;
        errorRegister: string | undefined;
    };
    closeModal: () => void;
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