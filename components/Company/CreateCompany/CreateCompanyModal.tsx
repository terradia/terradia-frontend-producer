import React, {ChangeEvent} from "react";
import Modal from "../../Ui/Modal";
import {Alert} from "antd";
import Input from "../../Ui/Input";
import {FormikErrors, FormikValues} from "formik";
import {CheckboxChangeEvent} from "antd/es/checkbox";

const inputStyle = {
    width: "400px",
    margin: "5px"
};

declare interface modalState {
    modalCreateCompany: boolean;
    confirmLoading: boolean;
    errorCreateComp: string;
}

declare interface CreateCompanyModalProps {
    modalState: modalState;
    closeModal: () => void;
    validateForm: (values?: any) => Promise<FormikErrors<FormikValues>>;
    submitForm: () => Promise<void>;
    handleSubmit: () => (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (((e: CheckboxChangeEvent) => void) & ((e: ChangeEvent<HTMLInputElement>) => void) | undefined);
    errors: {
        name: string;
        description: string;
        email: string;
        phone: number;
    }
}

export default function CreateCompanyModal(props: CreateCompanyModalProps) {
    return (
        <Modal
            title={"Create a Company"}
            centered
            visible={props.modalState.modalCreateCompany}
            confirmLoading={props.modalState.confirmLoading}
            onCancel={props.closeModal}
            destroyOnClose={true}
            onOk={() => props.validateForm().then(() => {
                props.submitForm();
            })}
        >
            <Alert message="There is an error. Please try again later" type="error"
                   style={{display: props.modalState.errorCreateComp}}/>

            <form onSubmit={props.handleSubmit}>
                <Input
                    name={'name'}
                    type={"default"}
                    style={{
                        color: props.errors.name ? 'red' : undefined,
                        borderColor: props.errors.name ? 'red' : undefined,
                        ...inputStyle
                    }}
                    placeholder={"Company's Name"}
                    id={'id_Name'}
                    onChange={props.handleChange}
                />
                {props.errors.name &&
                <div id="feedback" style={{color: "red"}}>{props.errors.name}</div>}

                <Input
                    name={'description'}
                    type={"default"}
                    style={{
                        color: props.errors.description ? 'red' : undefined,
                        borderColor: props.errors.description ? 'red' : undefined,
                        ...inputStyle
                    }}
                    placeholder={'Description'}
                    id={'id_Description'}
                    onChange={props.handleChange}
                />
                {props.errors.description &&
                <div id="feedback" style={{color: "red"}}>{props.errors.description}</div>}

                <Input
                    name={'email'}
                    type={"default"}
                    style={{
                        color: props.errors.email ? 'red' : undefined,
                        borderColor: props.errors.email ? 'red' : undefined,
                        ...inputStyle
                    }}
                    placeholder={'Email'}
                    id={'id_login'}
                    autoComplete={'email'}
                    onChange={props.handleChange}
                />
                {props.errors.email &&
                <div id="feedback" style={{color: "red"}}>{props.errors.email}</div>}

                <Input
                    name={'phone'}
                    type={"default"}
                    style={{
                        color: props.errors.phone ? 'red' : undefined,
                        borderColor: props.errors.phone ? 'red' : undefined,
                        ...inputStyle
                    }}
                    placeholder={'phone number'}
                    id={'id_Phone'}
                    autoComplete={'phone'}
                    onChange={props.handleChange}
                />
                {props.errors.phone &&
                <div id="feedback" style={{color: "red"}}>{props.errors.phone}</div>}
            </form>
        </Modal>
    )
}