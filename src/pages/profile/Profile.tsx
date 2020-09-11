import React from "react";
import { Route } from "react-router";
import ProfileView from "./ProfileView";
import InvitationsListCard from "../../components/Staff/InvitationsListCard";

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
