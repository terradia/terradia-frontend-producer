import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import SidebarCompany from "./SidebarCompany";
import SidebarProfile from "./SidebarProfile";

const Sidebar = () => {
  const currentUrl = useLocation().pathname;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(currentUrl);
  const [isProfile, setIsProfile] = useState(null);

  const OnClickedLink = (href: string) => {
    setCurrentPage(href);
    history.push(href);
  };

  useEffect(() => {
    setIsProfile(currentUrl.match("profile"));
  }, [currentUrl]);

  if (isProfile !== null) {
    return (
      <SidebarProfile onClickedLink={OnClickedLink} currentPage={currentPage} />
    );
  } else {
    return (
      <SidebarCompany onClickedLink={OnClickedLink} currentPage={currentPage} />
    );
  }
};

export default Sidebar;
