import React from "react";
import { Form, Input, Modal } from "antd";
import "../../../assets/Style/Profile/userProfile.less";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../../Ui/Button";
import { User } from "../../../interfaces";
import { useTranslation } from "react-i18next";

const getUserInformations = graphqlLoader(
  "../../../graphql/query/getUser.graphql"
);

const passwordValidation = graphqlLoader(
  "../../../graphql/mutation/passwordValidation.graphql"
);

const updateUserMutation = graphqlLoader(
  "../../../graphql/mutation/profile/updateUserDatas.graphql"
);

interface Props {
  visible: boolean;
  user: User;
  onClickToClose: () => void;
  onValidate: () => void;
}

const PasswordModal = ({
  visible = false,
  user,
  onClickToClose,
  onValidate,
}: Props) => {
  const [form] = Form.useForm();
  const isForgotPassword = localStorage.getItem("connectedAsPasswordForgot");

  const [updateUser] = useMutation(updateUserMutation, {
    refetchQueries: [
      {
        query: getUserInformations,
      },
    ],
  });

  const handleClose = () => {
    onClickToClose && onClickToClose();
  };

  const handleValidation = () => {
    form.submit();
    onClickToClose && onClickToClose();
    onValidate && onValidate();
  };

  const { t } = useTranslation("common");
  const [isPasswordValitdation] = useMutation(passwordValidation);

  if (user !== undefined) {
    return (
      <Modal
        visible={visible}
        onCancel={handleClose}
        className={"profile-card"}
        title={t("ProfilePage.editProfileModal.name")}
        footer={[
          <div key={"footer"} className={"line"}>
            <Form.Item key={"validate"}>
              <Button
                type={"primary"}
                htmlType="submit"
                onClick={handleValidation}
              >
                {t("ProfilePage.editProfileModal.validate")}
              </Button>
            </Form.Item>
            <Button
              key={"close"}
              onClick={handleClose}
              className={"close-button"}
            >
              {t("ProfilePage.editProfileModal.close")}
            </Button>
          </div>,
        ]}
      >
        <Form
          layout={"vertical"}
          form={form}
          name="control-hooks"
          initialValues={{
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            phone: user.phone,
            password: user.password,
          }}
          onFinish={(val) => {
            if (isForgotPassword !== "true")
              isPasswordValitdation({
                variables: {
                  password: val.actualPassword,
                },
              })
                ? Promise.resolve()
                : Promise.reject(
                    t("ProfilePage.deleteAccountModal.errorMessageNewPassword")
                  );
            updateUser({
              variables: {
                password: val.newPassword ? val.newPassword : undefined,
              },
            }).catch((err) => {
              console.log(err);
            });
          }}
        >
          {isForgotPassword === "true" ? null : (
            <Form.Item>
              <div className={"label"}>
                {t("ProfilePage.deleteAccountModal.actualPassword")}
              </div>
              <Form.Item
                name="actualPassword"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: t(
                      "ProfilePage.deleteAccountModal.messageActualPassword"
                    ),
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form.Item>
          )}
          <Form.Item>
            <div className={"label"}>
              {t("ProfilePage.deleteAccountModal.newPassword")}
            </div>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: t(
                    "ProfilePage.deleteAccountModal.messageNewPassword"
                  ),
                },
                () => ({
                  validator(rule, value) {
                    if (value.length > 2 && value.length < 20) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      t(
                        "ProfilePage.deleteAccountModal.errorMessageNewPassword"
                      )
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <div className={"label"}>
              {t("ProfilePage.deleteAccountModal.confirmNewPassword")}
            </div>
            <Form.Item
              name="confirmNewPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t(
                    "ProfilePage.deleteAccountModal.messageConfirmPassword"
                  ),
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      t("ProfilePage.deleteAccountModal.missmatchPassword")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    );
  } else {
    return <div>Information not available</div>;
  }
};

export default PasswordModal;
