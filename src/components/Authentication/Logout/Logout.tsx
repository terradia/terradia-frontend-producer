import React from "react";
import { useApolloClient } from "@apollo/react-hooks";
import { LogoutOutlined } from "@ant-design/icons/lib";
import "../../../assets/Style/Layout/logout.less";

interface Props {
  collapsed?: boolean;
}

const Logout: React.FC<Props> = ({ collapsed = false, ...props }: Props) => {
  const client = useApolloClient();

  const onLogoutHandler = (): void => {
    localStorage.removeItem("token");
    client.resetStore().then(null);
  };

  return (
    <div className={"logout-button-container"} onClick={onLogoutHandler}>
      <span
        className={"icon-container" + (collapsed === true ? " collapsed" : "")}
      >
        <LogoutOutlined />
      </span>
      <span
        className={"label-container" + (collapsed === true ? " collapsed" : "")}
      >
        {"Se déconnecter"}
      </span>
    </div>
  );
};

export default Logout;
