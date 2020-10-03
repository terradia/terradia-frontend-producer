import React from "react";
import { Route } from "react-router";
import InvitationsListCard from "../../components/Staff/InvitationsListCard";
import ProfileView from "../../components/Profile/ProfileView";

const Profile = () => {
  return (
    <>
      <Route exact path={"/profile/userProfile"}>
        <ProfileView />
      </Route>
      <Route exact path={"/profile/company-invitations"}>
        <InvitationsListCard companyView={false} />
      </Route>
    </>
  );
};

export default Profile;