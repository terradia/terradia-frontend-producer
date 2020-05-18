import React, { useEffect, useState } from "react";
import { Avatar, Col, Form, Input, Row, Upload } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Profil/userProfile.less";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import Button from "../../components/Ui/Button";
import { RcFile } from "antd/lib/upload/interface";

const mutationUpdateUserAvatar = graphqlLoader(
  "../../graphql/mutation/updateUserAvatar.graphql"
);

const getUserInformations = graphqlLoader(
  "../../graphql/query/getUser.graphql"
);
const updateUserMutation = graphqlLoader(
  "../../graphql/mutation/profile/updateUserDatas.graphql"
);

const validImageTypes = ["image/jpeg", "image/png"];

declare interface ProfileData {
  getUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    validated: boolean;
    phone: string;
    password: string;
    avatar: string;
    companies: {
      id;
    };
  };
}

const UserProfile = () => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const { data: userData, loading, error } = useQuery<ProfileData>(
    getUserInformations,
    {
      fetchPolicy: "cache-only",
    }
  );

  const [updateUser] = useMutation(updateUserMutation, {
    refetchQueries: [
      {
        query: getUserInformations,
      },
    ],
  });

  useEffect(() => {
    if (userData && !loading && !error) {
      setImageUrl(userData.getUser.avatar);
    }
  }, [userData, loading, error]);

  const handleBeforeUpload = (file: RcFile): any => {
    // TODO save in hook the file list. that way, we can set the status of the upload when the mutation is done.
    if (validImageTypes.includes(file.type)) setImageList([file]);
  };

  const handleRemove = () => {
    setImageList(null);
  };

  const handleErrorUpload = () => {
    // TODO : put a notification showing the error of the server.
    imageList[0].status = "error";
  };

  const [mutationUpdateAvatar] = useMutation(mutationUpdateUserAvatar, {
    variables: {},
    onError: handleErrorUpload,
    refetchQueries: [
      {
        query: getUserInformations,
      },
    ],
  });

  const handleCustomRequest = (data): any => {
    setLoadingAvatar(true);
    if (data.file.status !== "uploading") return;
    const file: File = data.file.originFileObj;
    if (validImageTypes.includes(file.type)) {
      mutationUpdateAvatar({
        variables: {
          avatar: file,
        },
      })
        .then((data) => {
          setImageUrl(`${data.data.updateUserAvatar.avatar}`);
          setLoadingAvatar(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Error: File type");
      // TODO : the user needs to send ONLY png or jpeg => notify there is an error;
    }
  };

  if (userData !== undefined && !loading && !error) {
    return (
      <div className={"profile-card"}>
        <Form
          layout={"vertical"}
          form={form}
          name="control-hooks"
          initialValues={{
            lastName: userData.getUser.lastName,
            firstName: userData.getUser.firstName,
            email: userData.getUser.email,
            phone: userData.getUser.phone,
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
            <Row className={"row-avatar row"}>
              <Col>
                <Upload
                  listType={"picture-card"}
                  fileList={imageList}
                  beforeUpload={handleBeforeUpload}
                  onRemove={handleRemove}
                  onChange={handleCustomRequest}
                  multiple={false}
                  showUploadList={false}
                >
                  <Avatar
                    size={100}
                    icon={
                      loadingAvatar ? <LoadingOutlined /> : <UserOutlined />
                    }
                    src={
                      loadingAvatar
                        ? null
                        : imageUrl !== null
                        ? `https://media.terradia.eu/${imageUrl}`
                        : null
                    }
                  />
                </Upload>
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
                  <div className={"label-profile"}>PRENOM</div>
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
                  <div className={"label-profile"}>COURRIEL</div>
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
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col className={"col"}>
                <div className={"label-profile"}>
                  CONFIRMATION DU NOUVEAU MOT DE PASSE
                </div>
                <Form.Item
                  name={"confirm"}
                  dependencies={["password"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Les deux mots de passe ne sont pas les mêmes !"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row className={"row-name"}>
              <Col className={"col"}>
                <Form.Item>
                  <div className={"label-profile"}>NUMÉRO DE TELEPHONE</div>
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
              <Col className={"col"}>
                <Form.Item>
                  <div className={"label-profile"}>LANGUE</div>
                  <div>Français</div>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Modifier
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    return <div>Information not available</div>;
  }
};

export default UserProfile;
