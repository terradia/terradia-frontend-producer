import React from "react";
import { ReactComponent as User } from "../../assets/Icon/user.svg";
import Button from "./Button";

const textStyle = {
  fontFamily: "Montserrat",
  fontWeight: 400,
  color: "#5CC04A",
  fontSize: 16,
};

const UserViewButton = () => {
  return (
    <Button
      style={{
        display: "flex",
        marginRight: 24,
        borderColor: "#5CC04A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <User width={25} height={25} />
      <span style={textStyle}>Aperçu utilisateur</span>
    </Button>
  );
};

export default UserViewButton;
