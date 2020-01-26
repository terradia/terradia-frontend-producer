import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {FormikReturnProps} from "../CreateCompany/CreateCompany";
import * as Yup from "yup";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import UserContext from "../../Context/UserContext";
import EditCompanyModal from "./EditCompanyModal";
import UPDATE_COMPANY from "../../../apollo/mutation/updateCompany";

const EditCompanySchema = Yup.object().shape({
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

declare interface modalState {
    modalEditCompany: boolean;
    confirmLoading: boolean;
    errorEditCompany: string;
}

const editCompany = (props: any) => {
    const {setEditModal, openEditModal} = props;
    const [updateCompany] = useMutation(UPDATE_COMPANY);
    const [modalState, setModalState] = useState<modalState>({
        modalEditCompany: openEditModal,
        confirmLoading: false,
        errorEditCompany: 'None',
    });
    const user = useContext(UserContext);
    let contextUpdater = undefined;
    let companyFields;

    useEffect(() => {
        setModalState(prevState => ({
            ...prevState,
            modalEditCompany: openEditModal
        }));
    }, [openEditModal]);

    if (user && user.company) {
        companyFields = {
            name: user.company.name,
            description: user.company.description,
            email: user.company.email,
            phone: user.company.phone
        }
    } else {
        companyFields = {
            name: '',
            description: '',
            email: '',
            phone: ''
        }
    }

    const CloseModal = () => {
        setEditModal(false);
        setModalState(prevState => ({
            ...prevState,
            modalEditCompany: false
        }));
    };

    const UpdateCompanyHandler = (response: any) => {
        setModalState(prevState => ({
            ...prevState,
            confirmLoading: false
        }));
        if (response && response.data && response.data.updateCompany) {
            user.company = response.data.updateCompany;
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
        if (user && user.company && user.company.id)
            updateCompany({variables: {id: user.company.id, ...values}}).then(UpdateCompanyHandler);
    };

    return (
        <div>
            {contextUpdater}
            <Formik
                initialValues={companyFields}
                validationSchema={EditCompanySchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={SubmitForm}
            >
                {(props: FormikReturnProps) => {
                    return <EditCompanyModal {...props} closeModal={CloseModal} modalState={modalState}/>
                }}
            </Formik>
        </div>
    )
};

export default editCompany