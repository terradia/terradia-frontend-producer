import React from "react";
import { Form, Input, Modal } from "antd";
import "../../assets/Style/Profile/userProfile.less";
import { useMutation } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../../components/Ui/Button";
import { User } from "../../interfaces";

const getUserInformations = graphqlLoader(
  "../../graphql/query/getUser.graphql"
);
const updateUserMutation = graphqlLoader(
  "../../graphql/mutation/profile/updateUserDatas.graphql"
);

interface Props {
  visible: boolean;
  user: User;
  onClickToClose: () => void;
  onValidate: () => void;
}

const UserProfileModal = ({
  visible = false,
  user,
  onClickToClose,
  onValidate,
}: Props) => {
  const [form] = Form.useForm();

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

  if (user !== undefined) {
    return (
      <Modal
        visible={visible}
        onCancel={handleClose}
        className={"profile-card"}
        title={"Éditer le profil"}
        footer={[
          <div key={"footer"} className={"line"}>
            <Form.Item key={"validate"}>
              <Button
                type={"primary"}
                htmlType="submit"
                onClick={handleValidation}
              >
                Valider {/* TODO : Translate this. */}
              </Button>
            </Form.Item>
            <Button
              key={"close"}
              onClick={handleClose}
              className={"close-button"}
            >
              Fermer {/* TODO : Translate this. */}
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
          }}
          onFinish={(val) => {
            updateUser({
              variables: {
                lastName: val.lastName,
                firstName: val.firstName,
                email: val.email,
                password: val.password ? val.password : undefined,
                phone: val.phone,
              },
            }).catch((err) => {
              console.log(err);
            });
          }}
        >
          <Form.Item>
            <div className={"label"}>NOM</div>
            <Form.Item
              name={"lastName"}
              rules={[
                {
                  required: true,
                  message: "Votre nom de famille ne peut pas être vide.",
                },
                {
                  whitespace: true,
                  message: "Votre nom de famille ne peut pas être vide.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <div className={"label"}>PRENOM</div>
            <Form.Item
              name={"firstName"}
              rules={[
                {
                  required: true,
                  message: "Votre prénom ne peut pas être vide.",
                },
                {
                  whitespace: true,
                  message: "Votre prénom ne peut pas être vide.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <div className={"label"}>COURRIEL</div>
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vous devez fournir un email.",
                },
                {
                  whitespace: true,
                  message: "L'email ne peut pas être vide",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <div className={"label"}>NUMÉRO DE TELEPHONE</div>
            <Form.Item
              name={"phone"}
              rules={[
                {
                  required: true,
                  pattern: /^((\\\\+[1-9]{1,4}[ \\-]*)|(\\\\([0-9]{2,3}\\\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  message:
                    "Vous devez renseigner un numéro de téléphone valide.",
                },
                {
                  whitespace: true,
                  message: "Le numéro de téléphone ne peut pas être vide",
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
    return <div>Information not available</div>;
  }
};

export default UserProfileModal;
