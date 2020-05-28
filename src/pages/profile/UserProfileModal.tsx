import React, { useEffect, useState } from "react";
import { Avatar, Col, Form, Input, Modal, Row, Upload } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Profil/userProfile.less";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../../components/Ui/Button";
import { RcFile } from "antd/lib/upload/interface";
import Paragraph from "antd/lib/typography/Paragraph";
import { User } from "../../interfaces";

const mutationUpdateUserAvatar = graphqlLoader(
  "../../graphql/mutation/updateUserAvatar.graphql"
);

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
}

const UserProfileModal = ({
  visible = false,
  user,
  onClickToClose,
  ...props
}: Props) => {
  const [form] = Form.useForm();

  const [updateUser] = useMutation(updateUserMutation, {
    refetchQueries: [
      {
        query: getUserInformations,
      },
    ],
  });

  if (user !== undefined) {
    return (
      <Modal
        visible={visible}
        onCancel={onClickToClose}
        footer={[
          <Button key={"close"}>Fermer</Button>,
          <Form.Item key={"validate"}>
            <Button type={"primary"} htmlType="submit">
              Valider
            </Button>
          </Form.Item>,
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
          <Col className={"main-col"}>
            <Row className={"row-name"}>
              <Col className={"col"}>
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
              </Col>
              <Col className={"col"}>
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
              </Col>
            </Row>
            <Row className={"row-email"}>
              <Col className={"col"}>
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
              </Col>
            </Row>
            <Row className={"row-name"}>
              <Col className={"col"}>
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
              </Col>
            </Row>
          </Col>
        </Form>
      </Modal>
    );
  } else {
    return <div>Information not available</div>;
  }
};

export default UserProfileModal;
