import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons/lib";
import { Avatar, Divider, Tooltip, Upload } from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import { User } from "../../interfaces";
import { RcFile } from "antd/lib/upload/interface";
import "../../assets/Style/Profile/profileView.less";
import Button from "../../components/Ui/Button";
import UserProfileModal from "./Modal/UserProfileModal";
import UserDeleteModal from "./Modal/UserDeleteModal";
import { useTranslation } from "react-i18next";
import PasswordModal from "./Modal/PasswordModal";
import FlagIconFactory from "react-flag-icon-css";
import i18n from "../../i18n";

// QUERIES
const getUserData = graphqlLoader("../../graphql/query/getUser.graphql");

// MUTATIONS
const mutationUpdateUserAvatar = graphqlLoader(
  "../../graphql/mutation/updateUserAvatar.graphql"
);

// CODE
const validImageTypes = ["image/jpeg", "image/png"];

declare interface ProfileData {
  getUser: User;
}

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

const ProfileView: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [deleteModaleVisible, setDeleteModalVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalUserProfileVisible, setModalUserProfileVisible] = useState(false);

  const { data: userData, loading, error } = useQuery<ProfileData>(
    getUserData,
    {
      fetchPolicy: "cache-only",
    }
  );

  useEffect(() => {
    if (userData && !loading && !error) {
      setImageUrl(userData.getUser.avatar);
      setLoadingAvatar(false);
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
    refetchQueries: [{ query: getUserData }],
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

  const { t } = useTranslation("common");

  return (
    <div>
      <div className={"card user-profile-data-card"}>
        <div className={"content"}>
          <div className={"first-element"}>
            <Upload
              listType={"picture-card"}
              className={"avatar-picker"}
              fileList={imageList}
              customRequest={() => {
                return;
              }}
              beforeUpload={handleBeforeUpload}
              onRemove={handleRemove}
              onChange={handleCustomRequest}
              showUploadList={false}
            >
              <Tooltip
                title={
                  imageUrl === null
                    ? t("ProfilePage.labels.tooltip.addImage")
                    : t("ProfilePage.labels.tooltip.editImage")
                }
                arrowPointAtCenter={true}
                placement={"top"}
              >
                {imageUrl !== null ? (
                  <div className={"avatar-container"}>
                    <Avatar
                      icon={
                        loadingAvatar ? <LoadingOutlined /> : <UserOutlined />
                      }
                      src={
                        loadingAvatar
                          ? null
                          : `https://media.terradia.eu/${imageUrl}`
                      }
                    />
                  </div>
                ) : (
                  <div className={"no-avatar-icon-container"}>
                    <UserOutlined />
                  </div>
                )}
              </Tooltip>
              <Tooltip
                title={
                  imageUrl === null
                    ? t("ProfilePage.labels.tooltip.addImage")
                    : t("ProfilePage.labels.tooltip.editImage")
                }
                arrowPointAtCenter={true}
                placement={"top"}
              >
                <div className={"avatar-info-icon-container"}>
                  <InfoCircleOutlined />
                </div>
              </Tooltip>
            </Upload>
          </div>
          <div className={"second-element"}>
            <div className={"data-container"}>
              <div className={"data-label"}>
                {t("ProfilePage.labels.lastName")}
              </div>
              <div className={"data"}>
                {userData.getUser.firstName +
                  " " +
                  userData.getUser.lastName.toUpperCase()}
              </div>
            </div>
            <div className={"data-container"}>
              <div className={"data-label"}>
                {t("ProfilePage.labels.email")}
              </div>
              <div className={"data"}>{userData.getUser.email}</div>
            </div>
            <div className={"data-container"}>
              <div className={"data-label"}>
                {t("ProfilePage.labels.phone")}
              </div>
              <div className={"data"}>{userData.getUser.phone}</div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"languages"}>
          {t("ProfilePage.labels.chooseLanguage")}
          <div className={"flags"}>
            <div onClick={() => i18n.changeLanguage("en")}>
              <FlagIcon code={"gb"} />
            </div>
            <div onClick={() => i18n.changeLanguage("fr")}>
              <FlagIcon code={"fr"} />
            </div>
          </div>
        </div>
        <Divider />
        <div className={"action-bar"}>
          <Button
            icon={<EditOutlined />}
            onClick={() => setModalPasswordVisible(!modalPasswordVisible)} //stateModalPasswordVisible
          >
            {t("ProfilePage.buttons.editPassword")}
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => setModalUserProfileVisible(!modalUserProfileVisible)}
          >
            {t("ProfilePage.buttons.edit")}
          </Button>
          <Button
            className={"delete-button"}
            icon={<DeleteOutlined />}
            danger={true}
            onClick={() => setDeleteModalVisible(!deleteModaleVisible)}
          >
            {t("ProfilePage.buttons.delete")}
          </Button>
        </div>
        <PasswordModal
          visible={modalPasswordVisible}
          user={userData.getUser}
          onClickToClose={() => setModalPasswordVisible(false)}
          onValidate={() => console.log("validated")}
        />
        <UserProfileModal
          visible={modalUserProfileVisible}
          user={userData.getUser}
          onClickToClose={() => setModalUserProfileVisible(false)}
          onValidate={() => console.log("validated")}
        />
        <UserDeleteModal
          visible={deleteModaleVisible}
          user={userData.getUser}
          onClickToClose={() => setDeleteModalVisible(false)}
          onValidate={() => console.log("validated")}
        />
      </div>
    </div>
  );
};

export default ProfileView;
