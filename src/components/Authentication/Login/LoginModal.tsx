import React from 'react'
import { Alert, Checkbox } from 'antd'
import Modal from '../../Ui/Modal'
import MyInput from '../../Ui/Input'
import { LoginModalProps } from '../../../../interfaces/Authentication/Login/LoginModal'

const inputStyle = {
  width: '400px',
  margin: '5px'
}

export default function LoginModal(props: LoginModalProps) {
  return (
    <Modal
      title={'Login'}
      centered
      visible={props.modalState.modalLogin}
      confirmLoading={props.modalState.confirmLoading}
      onCancel={props.closeModal}
      destroyOnClose={true}
      okText={'Login'}
      onOk={() => props.validateForm().then(props.submitForm)}
    >
      <Alert
        message="We cannot find an account with that email/password"
        type="error"
        style={{ display: props.modalState.errorLogin }}
      />

      <form onSubmit={props.handleSubmit}>
        <MyInput
          name={'email'}
          type={'default'}
          style={{
            color: props.errors.email ? 'red' : undefined,
            borderColor: props.errors.email ? 'red' : undefined,
            ...inputStyle
          }}
          placeholder={'Login'}
          id={'id_login'}
          autoComplete={'email'}
          onChange={props.handleChange}
        />
        {props.errors.email && (
          <div id="feedback" style={{ color: 'red' }}>
            {props.errors.email}
          </div>
        )}
        <MyInput
          name={'password'}
          type={'password'}
          style={{
            color: props.errors.password ? 'red' : undefined,
            borderColor: props.errors.password ? 'red' : undefined,
            ...inputStyle
          }}
          placeholder={'Password'}
          id={'id_password'}
          autoComplete={'current-password'}
          onChange={props.handleChange}
        />
        {props.errors.password && (
          <div id="feedback" style={{ color: 'red' }}>
            {props.errors.password}
          </div>
        )}

        <Checkbox name={'rememberMe'} onChange={props.handleChange}>
          Remember Me
        </Checkbox>
      </form>
    </Modal>
  )
}
