import React, {ChangeEvent, useContext, useState} from "react";
import Button from "../../Ui/Button";
import {notification as _notification} from "antd";
import CreateCompanyModal from "./CreateCompanyModal";
import {Formik, FormikErrors, FormikValues} from "formik";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import * as Yup from "yup";
import {useMutation} from "@apollo/react-hooks";
import UserContext from "../../Context/UserContext";
import CREATE_COMPANY from "../../../../GraphQl/mutation/createCompany";

const CreateCompanySchema = Yup.object().shape({
    name: Yup.string()
        .notRequired(/*"The name of the company is required"*/)
        .min(3, "The name must be longer than 2 character"),
    email: Yup.string()
        .email('Your email is invalid')
        .notRequired(/*'Your email is required'*/)
        .min(2, 'Your email must be longer than 2 character'),
    description: Yup.string()
        .notRequired(),
    phone: Yup.number()
        .notRequired()
        .min(10, "")
});

export declare interface FormikReturnProps {
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

const buttonStyle = {
    backgroundColor: '#5CC04A',
    borderColor: '#5CC04A',
    color: '#FFFFF',
    width: '400px',
    height: '45px',
    marginBottom: '20px'
};

declare interface modalState {
    modalCreateCompany: boolean;
    confirmLoading: boolean;
    errorCreateComp: string;
}

export default function CreateCompany() {
    const [createCompany] = useMutation(CREATE_COMPANY);
    const [modalState, setModalState] = useState<modalState>({
        modalCreateCompany: false,
        confirmLoading: false,
        errorCreateComp: 'None',
    });
    const user = useContext(UserContext);
    let contextUpdater = undefined;

    const CreateCompanySuccessNotification = () => {
        _notification['success']({
            message: 'Company creation success',
            description:
                'You can now add products to this company',
        });
    };

    const OpenModal = () => {
        setModalState(prevState => ({
            ...prevState,
            modalCreateCompany: true
        }))
    };

    const CloseModal = () => {
        setModalState(prevState => ({
            ...prevState,
            modalCreateCompany: false
        }))
    };

    const CreateCompanyHandler = (response: any) => {
        setModalState(prevState => ({
            ...prevState,
            confirmLoading: false
        }));
        if (response && response.data) {
            CreateCompanySuccessNotification();
            user.company = response.data.createCompany;
            contextUpdater = (
                <UserContext.Provider value={user}/>
            );
            CloseModal();
        }
    };

    const SubmitForm = (values: {name: string, description: string, email: string, phone: string}) => {
        setModalState(prevState => ({
            ...prevState,
            confirmLoading: true
        }));
        console.log(values);
        createCompany({variables: {...values}}).then(CreateCompanyHandler);
    };

    return (
        <div>
            {contextUpdater}
            <Button color={"primary"}
                    onClick={OpenModal}
                    style={buttonStyle}
                    text={'Créer une entreprise'}
            />
            <Formik
                initialValues={{name: '', description: '', email: '', phone: ''}}
                validationSchema={CreateCompanySchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={SubmitForm}
            >
                {(props: FormikReturnProps) => {
                    return <CreateCompanyModal {...props} closeModal={CloseModal} modalState={modalState}/>
                }}
            </Formik>
        </div>
    )
}










