import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { LogoutOutlined } from "@ant-design/icons/lib";
import "../../../assets/Style/Layout/logout.less";

const Logout = ({ ...props }: {}) => {
  const client = useApolloClient();

  const onLogoutHandler = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("collapsedCategory");
    client.resetStore().then(null);
  };

  return (
    <div className={"button-container"} onClick={onLogoutHandler}>
      <span className={"icon-container"}>
        <LogoutOutlined />
      </span>
      <span className={"label-container"}>{"Se déconnecter"}</span>
    </div>
  );
};

export default Logout;
