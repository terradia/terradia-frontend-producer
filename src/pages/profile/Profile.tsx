import React from "react";
import { Route } from "react-router";
import CompanyInvitationsView from "./CompanyInvitationsView";
import ProfileView from "../../components/Profile/ProfileView";

const Profile = () => {
  return (
    <>
      <Route exact path={"/profile/userProfile"}>
        <ProfileView />
      </Route>
      <Route exact path={"/profile/company-invitations"}>
        <CompanyInvitationsView />
      </Route>
    </>
  );
};

export default Profile;
