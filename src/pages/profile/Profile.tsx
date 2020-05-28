import React from "react";
import { Route } from "react-router";
import UserProfileModal from "./UserProfileModal";
import ProfileView from "./ProfileView";

const Profile = () => {
  return (
    <Route exact path={"/profile/userProfile"}>
      <ProfileView />
      {/*<UserProfile />*/}
    </Route>
  );
};

export default Profile;
