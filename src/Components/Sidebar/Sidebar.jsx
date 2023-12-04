import React, { useState } from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import CollectionsIcon from "@mui/icons-material/Collections";
import GroupsIcon from '@mui/icons-material/Groups';
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <span className="h-rule"></span>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  active === "home"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("home")}
              >
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/achievements" className="link">
              <li
                className={
                  active === "achievements"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("achievements")}
              >
                <VerifiedIcon className="sidebarIcon" />
                Achievements
              </li>
            </Link>
            <Link to="/carouselimages" className="link">
              <li
                className={
                  active === "carouselImages"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("carouselImages")}
              >
                <BurstModeIcon className="sidebarIcon" />
                Carousel Images
              </li>
            </Link>
            <Link to="/mails" className="link">
              <li
                className={
                  active === "mails"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("mails")}
              >
                <EmailIcon className="sidebarIcon" />
                Contact Mails
              </li>
            </Link>
            <Link to="/galleryimages" className="link">
              <li
                className={
                  active === "galleryImages"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("galleryImages")}
              >
                <CollectionsIcon className="sidebarIcon" />
                Gallery Images
              </li>
            </Link>
            <Link to="/personnels" className="link">
              <li
                className={
                  active === "personnels"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("personnels")}
              >
                <GroupsIcon className="sidebarIcon" />
                Personnels
              </li>
            </Link>
            <Link to="/posts" className="link">
              <li
                className={
                  active === "posts"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("posts")}
              >
                <NewspaperIcon className="sidebarIcon" />
                Posts
              </li>
            </Link>
            <Link to="/schoolinfo/655f655470e556cc4a54f931" className="link">
              <li
                className={
                  active === "about"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("about")}
              >
                <InfoRoundedIcon className="sidebarIcon" />
                School Info
              </li>
            </Link>
            <Link to="/logout" className="link">
              <li
                className={
                  active === "logout"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={() => handleClick("logout")}
              >
                <LogoutIcon className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
