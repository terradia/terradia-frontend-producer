import React from "react";
import { Form, Input, Modal } from "antd";
import "../../../assets/Style/Profile/userProfile.less";
import { useMutation } from "@apollo/react-hooks";
import Button from "../../Ui/Button";
import { User } from "../../../interfaces";
import { useTranslation } from "react-i18next";
import { loader as graphqlLoader } from "graphql.macro";
import { DeleteOutlined } from "@ant-design/icons/lib";

const mutationDeleteUser = graphqlLoader(
  "../../../graphql/mutation/profile/deleteUser.graphql"
);

interface Props {
  visible: boolean;
  user: User;
  onClickToClose: () => void;
  onValidate: () => void;
}

const UserDeleteModal = ({
  visible = false,
  user,
  onClickToClose,
  onValidate,
}: Props) => {
  const [form] = Form.useForm();

  const [deleteUserMutation] = useMutation(mutationDeleteUser, {});

  const handleClose = () => {
    onClickToClose && onClickToClose();
  };

  const handleValidation = () => {
    form.submit();
    onClickToClose && onClickToClose();
    onValidate && onValidate();
  };

  const { t } = useTranslation("common");

  if (user !== undefined) {
    return (
      <Modal
        visible={visible}
        onCancel={handleClose}
        className={"profile-card"}
        title={t("ProfilePage.deleteAccountModal.name")}
        footer={[
          <div key={"footer"} className={"line"}>
            <Form.Item key={"validate"}>
              <Button
                htmlType="submit"
                onClick={handleValidation}
                className={"delete-button"}
                icon={<DeleteOutlined />}
                danger={true}
              >
                {t("ProfilePage.deleteAccountModal.delete")}
              </Button>
            </Form.Item>
            <Button
              key={"close"}
              onClick={handleClose}
              className={"close-button"}
            >
              {t("ProfilePage.deleteAccountModal.close")}
            </Button>
          </div>,
        ]}
      >
        <Form
          layout={"vertical"}
          form={form}
          name="control-hooks"
          onFinish={(val) => {
            deleteUserMutation({
              variables: {
                password: val.userPassword,
              },
            }).catch((err) => {
              console.log(err);
            });
          }}
        >
          <Form.Item>
            <div className={"label"}>
              {t("ProfilePage.deleteAccountModal.password")}
            </div>
            <Form.Item
              name={"userPassword"}
              rules={[
                {
                  required: true,
                  message: "Votre mot de passe ne peut pas être vide.",
                },
                {
                  whitespace: true,
                  message: "Votre mot de passe ne peut pas être vide.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    );
  } else {
    return <div>Informations not available</div>;
  }
};

export default UserDeleteModal;
