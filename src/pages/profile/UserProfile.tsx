import React from "react";
import { Avatar, Col, Form, Row, Input } from "antd";
import { UserOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Profil/userProfile.less";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../../components/Ui/Button";


declare interface ProfileData {
  getUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    phone: string;
    password: string;
    companies: {
      id;
    }
  }
}

const getUserInformations = graphqlLoader("../../graphql/query/getUser.graphql");
const updateUserMutation = graphqlLoader("../../graphql/mutation/profile/updateUserDatas.graphql");

const UserProfile = () => {
  const [form] = Form.useForm();
  const { data } = useQuery<ProfileData>(getUserInformations, {
    fetchPolicy: "cache-first"
  });
    const [updateUser] = useMutation(updateUserMutation, {
        refetchQueries: [{
            query: getUserInformations
        }]
    });
  console.log(data);

  return (
    <div className={"profile-card"}>
      <Form
        layout={"vertical"}
        form={form}
        name="control-hooks"
        initialValues={{
          lastName: data.getUser.lastName,
          firstName: data.getUser.firstName,
          email: data.getUser.email,
          phone: data.getUser.phone,
        }}
        onFinish={(val) => {
            console.log(val);
            updateUser({
                variables: {
                    lastName: val.lastName,
                    firstName: val.firstName,
                    email: val.email,
                    password: val.password? val.password : undefined,
                    phone: val.phone,
                }
            }).catch((err) => {
                console.log(err)
            });
        }}
      >
        <Col className={"main-col"}>
          <Row className={"row-avatar row"}>
            <Col>
              <Avatar size={100} icon={<UserOutlined />} />
            </Col>
            <Col>
              <div className={"member-informations"}>
                Membre de Terradia depuis le XX-XX-XXXX
              </div>
            </Col>
          </Row>
          <Row className={"row-name"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>NOM DE FAMILLE</div>
                <Form.Item
                    name={"lastName"}
                    rules={[
                      {
                        required: true,
                        message: "Votre nom de famille ne peut pas être vide."
                      },
                      {
                        whitespace: true,
                        message: "Votre nom de famille ne peut pas être vide.",
                      },
                    ]}>
                  <Input/>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>PRENOM</div>
                <Form.Item
                    name={"firstName"}
                    rules={[
                      {
                        required: true,
                        message: "Votre prénom ne peut pas être vide."
                      },
                      {
                        whitespace: true,
                        message: "Votre prénom ne peut pas être vide.",
                      },
                    ]}>
                  <Input/>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"row-email"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>COURRIEL</div>
                <Form.Item
                    name={"email"}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Vous devez fournir un email."
                      },
                      {
                        whitespace: true,
                        message: "L'email ne peut pas être vide",
                      },
                    ]}>
                  <Input/>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
            <Row className={"row-name"}>
                <Col className={"col"}>
                    <Form.Item>
                        <div className={"label-profile"}>MOT DE PASSE</div>
                        <Form.Item
                            name={"password"}
                            rules={[
                                {
                                    required: false,
                                },
                                {
                                    whitespace: true,
                                    message: "Votre mot de passe ne peut pas être vide.",
                                },
                            ]}>
                            <Input.Password/>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col className={"col"}>
                        <div className={"label-profile"}>CONFIRMATION DU NOUVEAU MOT DE PASSE</div>
                        <Form.Item
                            name={"confirm"}
                            dependencies={["password"]}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        console.log(getFieldValue("password"));
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Les deux mots de passe ne sont pas les mêmes!");
                                    },
                                }),
                            ]}>
                            <Input.Password/>
                        </Form.Item>
                </Col>
            </Row>
          <Row className={"row-name"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>NUMERO DE TELEPHONE</div>
                <Form.Item
                    name={"phone"}
                    rules={[
                      {
                        required: true,
                        pattern: /^((\\\\+[1-9]{1,4}[ \\\\-]*)|(\\\\([0-9]{2,3}\\\\)[ \\\\-]*)|([0-9]{2,4})[ \\\\-]*)*?[0-9]{3,4}?[ \\\\-]*[0-9]{3,4}?$/,
                        message: "Vous devez renseigner un numéro de téléphone valide."
                      },
                      {
                        whitespace: true,
                        message: "Le numéro de téléphone ne peut pas être vide",
                      },
                    ]}>
                  <Input/>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>LANGUE</div>
                <div>Français</div>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Form.Item>
          <Button type="primary" htmlType="submit">Modifier</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
