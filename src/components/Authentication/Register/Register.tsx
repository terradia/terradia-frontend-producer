import React, {useState} from "react";
import Button from "../../Ui/Button";
import {Formik} from "formik";
import {notification as _notification} from "antd";
import * as Yup from "yup";
import {RegisterModalState, FormikReturnProps, RegisterDataResponse} from "../../../interfaces/Authentication/Register/Register"
import RegisterModal from "./RegisterModal";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

// import React, {useState} from "react";
// import Button from "../../Ui/Button";
// import {Formik} from "formik";
// import {notification as _notification} from "antd";
// import * as Yup from "yup";
// import {RegisterModalState, FormikReturnProps, RegisterDataResponse} from "./Register.d"
// import RegisterModal from "./RegisterModal";
// import {useMutation} from "@apollo/react-hooks";
// import {gql} from "apollo-boost";
//
// const RegisterSchema = Yup.object().shape({
//     email: Yup.string()
//         .email('Your email is invalid')
//         .required('Your email is required')
//         .min(2, 'Your email must be longer than 2 character')
//     ,
//     password: Yup.string()
//         .required('Your password is required')
//         .min(2, 'Your password must be longer than 2 character')
//         .max(20, 'It is long password')
//     ,
//     lastname: Yup.string()
//         .required('Your Lastname is required')
//     ,
//     firstname: Yup.string()
//         .required('Your Lastname is required')
//
// });
//
// const REGISTER = gql`
//     mutation reg ($firstname: String!, $lastname: String!, $password: String!, $email: String!, $phone: String!) {
//         register (
//             firstName: $firstname
//             lastName: $lastname
//             password: $password
//             email: $email
//             phone: $phone
//         )
//         {
//             token
//             userId
//             message
//         }
//     }
// `;
//
//
// export default function Register() {
//     const [register] = useMutation(REGISTER);
//     const [modalState, setModalState] = useState<RegisterModalState>({
//         modalRegister: false,
//         confirmLoading: false,
//         errorRegister: 'None',
//     });
//
//     const openModal = () => {
//         setModalState(prevState => ({
//             ...prevState,
//             modalRegister: true,
//         }));
//     };
//
//     const closeModal = () => {
//         setModalState(prevState => {
//             return {
//                 ...prevState,
//                 modalRegister: false,
//             }
//         });
//     };
//
//     const RegisterDataHandler = (response: RegisterDataResponse) => {
//         if (response && response.data) {
//             closeModal();
//             successRegisterNotification();
//         } else {
//             setModalState(prevState => ({
//                 ...prevState,
//                 errorRegister: undefined,
//             }))
//         }
//         setModalState(prevState => ({
//             ...prevState,
//             confirmLoading: false
//         }));
//     };
//
//     const submitForm = (values: { firstname: string, lastname: string, email: string, password: string, phone: string }) => {
//         setModalState(prevState => ({
//             ...prevState,
//             confirmLoading: true,
//             errorRegister: 'None'
//         }));
//         register({
//             variables: {
//                 firstname: values.firstname,
//                 lastname: values.lastname,
//                 email: values.email,
//                 password: values.password,
//                 phone: values.phone
//             }
//         }).then(RegisterDataHandler);
//     };
//
//     const successRegisterNotification = () => {
//         _notification['success']({
//             message: 'Register Sucess',
//             description:
//                 'Please check your email and follow the instructions.',
//         });
//     };
//
//     return (
//         <div>
//             <Button color={"primary"} onClick={openModal} style={{margin: 0}}>
//                 Register
//             </Button>
//             <Formik
//                 initialValues={{firstname: '', lastname: '', email: '', password: '', phone: ''}}
//                 validationSchema={RegisterSchema}
//                 validateOnChange={false}
//                 validateOnBlur={true}
//                 onSubmit={submitForm}
//             >
//                 {(props: FormikReturnProps) => {
//                     return <RegisterModal {...props} closeModal={closeModal} modalState={modalState}/>
//                 }}
//             </Formik>
//         </div>
//     )
// }

export default () => {
    return (<div><p>Register</p></div>);
};