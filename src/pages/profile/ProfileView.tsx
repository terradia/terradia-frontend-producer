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
import "../../assets/Style/Profil/profileView.less";
import Button from "../../components/Ui/Button";
import UserProfileModal from "./UserProfileModal";

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

const ProfileView: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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
                    ? "Cliquer ici pour ajouter une image"
                    : "Cliquer ici pour modifier l'image" // TODO : translate this.
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
                    ? "Cliquer ici pour ajouter une image"
                    : "Cliquer ici pour modifier l'image" // TODO : translate this.
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
                {"Nom" /* TODO : translate this. */}
              </div>
              <div className={"data"}>
                {userData.getUser.firstName +
                  " " +
                  userData.getUser.lastName.toUpperCase()}
              </div>
            </div>
            <div className={"data-container"}>
              <div className={"data-label"}>
                {"E-mail" /* TODO : translate this. */}
              </div>
              <div className={"data"}>{userData.getUser.email}</div>
            </div>
            <div className={"data-container"}>
              <div className={"data-label"}>
                {"Numéro de téléphone" /* TODO : translate this. */}
              </div>
              <div className={"data"}>{userData.getUser.phone}</div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={"action-bar"}>
          <Button
            icon={<EditOutlined />}
            onClick={() => setModalVisible(!modalVisible)}
          >
            {"Modifier mon compte" /* TODO : Translate this */}
          </Button>
          <Button
            className={"delete-button"}
            icon={<DeleteOutlined />}
            danger={true}
          >
            {"Supprimer mon compte" /* TODO : Translate this */}
          </Button>
        </div>
        <UserProfileModal
          visible={modalVisible}
          user={userData.getUser}
          onClickToClose={() => setModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default ProfileView;
