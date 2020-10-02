import React from "react";
import { Route } from "react-router";
import ProfileView from "../../components/Profile/ProfileView";

const Profile = () => {
  return (
    <Route exact path={"/profile/userProfile"}>
      <ProfileView />
    </Route>
  );
};

export default Profile;
