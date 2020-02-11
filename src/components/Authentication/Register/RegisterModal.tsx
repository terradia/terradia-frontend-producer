// import React from 'react'
// import Modal from '../../Ui/Modal'
// import Input from '../../Ui/Input'
// import {Alert} from "antd";
// // @ts-ignore
// import {RegisterModalProps} from "./RegisterModal.d"
//
// const inputStyle = {
//     width: "400px",
//     margin: "5px"
// };
//
// export default function RegisterModal(props: RegisterModalProps) {
//     return (
//         <Modal
//             title={"Register"}
//             centered
//             visible={props.modalState.modalRegister}
//             confirmLoading={props.modalState.confirmLoading}
//             onCancel={props.closeModal}
//             destroyOnClose={true}
//             onOk={() => props.validateForm().then(() => {
//                 props.submitForm();
//             })}
//         >
//             <Alert message="There is an error. Please try again later" type="error"
//                    style={{display: props.modalState.errorRegister}}/>
//
//             <form onSubmit={props.handleSubmit}>
//                 <Input
//                     name={'firstname'}
//                     type={"default"}
//                     style={{
//                         color: props.errors.firstname ? 'red' : undefined,
//                         borderColor: props.errors.firstname ? 'red' : undefined,
//                         ...inputStyle
//                     }}
//                     placeholder={'Firstname'}
//                     id={'id_firstname'}
//                     autoComplete={'given-name'}
//                     onChange={props.handleChange}
//                 />
//                 {props.errors.firstname &&
//                 <div id="feedback" style={{color: "red"}}>{props.errors.firstname}</div>}
//
//                 <Input
//                     name={'lastname'}
//                     type={"default"}
//                     style={{
//                         color: props.errors.lastname ? 'red' : undefined,
//                         borderColor: props.errors.lastname ? 'red' : undefined,
//                         ...inputStyle
//                     }}
//                     placeholder={'Lastname'}
//                     id={'id_lastname'}
//                     autoComplete={'family-name'}
//                     onChange={props.handleChange}
//                 />
//                 {props.errors.lastname &&
//                 <div id="feedback" style={{color: "red"}}>{props.errors.lastname}</div>}
//
//                 <Input
//                     name={'email'}
//                     type={"default"}
//                     style={{
//                         color: props.errors.email ? 'red' : undefined,
//                         borderColor: props.errors.email ? 'red' : undefined,
//                         ...inputStyle
//                     }}
//                     placeholder={'Email'}
//                     id={'id_login'}
//                     autoComplete={'email'}
//                     onChange={props.handleChange}
//                 />
//                 {props.errors.email &&
//                 <div id="feedback" style={{color: "red"}}>{props.errors.email}</div>}
//
//                 <Input
//                     name={'password'}
//                     type={"password"}
//                     style={{
//                         color: props.errors.password ? 'red' : undefined,
//                         borderColor: props.errors.password ? 'red' : undefined,
//                         ...inputStyle
//                     }}
//                     placeholder={'Password'}
//                     id={'id_password'}
//                     autoComplete={'new-password'}
//                     onChange={props.handleChange}
//                 />
//                 {props.errors.password &&
//                 <div id="feedback" style={{color: "red"}}>{props.errors.password}</div>}
//             </form>
//         </Modal>
//     )
// }

export default () => {
    return (<div><p>Register Modal</p></div>);
};