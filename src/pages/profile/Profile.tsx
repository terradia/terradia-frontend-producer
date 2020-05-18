import React from "react";
import { Route } from "react-router";
import UserProfile from "./UserProfile";

const Profile = () => {
  return (
    <Route exact path={"/profile/userProfile"}>
      <UserProfile />
    </Route>
  );
};

export default Profile;
