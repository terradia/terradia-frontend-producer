import React from "react";
import { Avatar, Col, Form, Row } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons/lib";
import "../../assets/Style/Profil/userProfile.less";

const UserProfile = () => {
  const [form] = Form.useForm();

  return (
    <div className={"profile-card"}>
      <Form
        layout={"vertical"}
        form={form}
        name="control-hooks"
        onFinish={() => {
          console.log("finish");
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
            <Col>
              <EditOutlined className={"edit-profile-icon"} />
            </Col>
          </Row>
          <Row className={"row-name"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>NOM DE FAMILLE</div>
                <div>User</div>
              </Form.Item>
            </Col>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>PRENOM</div>
                <div>User</div>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"row-email"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>COURRIEL</div>
                <div>User</div>
              </Form.Item>
            </Col>
          </Row>
          <Row className={"row-name"}>
            <Col className={"col"}>
              <Form.Item>
                <div className={"label-profile"}>NUMERO DE TELEPHONE</div>
                <div>+33645454545</div>
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
      </Form>
    </div>
  );
};

export default UserProfile;
