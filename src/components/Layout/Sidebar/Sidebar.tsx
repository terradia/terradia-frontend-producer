import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import SidebarCompany from "./SidebarCompany";
import SidebarProfile from "./SidebarProfile";

interface Props {
  onClickOnElement?: () => void;
  isMobile?: boolean;
  collapsed?: boolean;
}

const Sidebar: React.FC<Props> = ({
  onClickOnElement,
  isMobile = false,
  collapsed = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Props) => {
  const currentUrl = useLocation().pathname;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(currentUrl);
  const [isProfile, setIsProfile] = useState(null);

  const OnClickedLink = (href: string) => {
    setCurrentPage(href);
    history.push(href);
    isMobile === true && onClickOnElement && onClickOnElement();
  };

  useEffect(() => {
    setIsProfile(currentUrl.match("profile"));
  }, [currentUrl]);

  if (isProfile !== null) {
    return (
      <SidebarProfile
        collapsed={collapsed}
        onClickedLink={OnClickedLink}
        currentPage={currentPage}
      />
    );
  } else {
    return (
      <SidebarCompany
        collapsed={collapsed}
        onClickedLink={OnClickedLink}
        currentPage={currentPage}
      />
    );
  }
};

export default Sidebar;
