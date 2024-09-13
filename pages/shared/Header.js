import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faHeadset,
  faListCheck,
  faCartShopping,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, Routes } from "../../navigation/NavigationLib";
import { getAuthProps } from "../../utils/AuthenticationLibrary";
import { APIURL, getImage } from "../../services/axios/ApiEndPoints";
import { removeAllCookiesLogOut } from "../../utils/CookieHandler";

function Header() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    profileImagePath: "",
  });

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    let details = getAuthProps();
    if (details != undefined) {
      setUserDetails({
        firstName: details.FirstName,
        lastName: details.LastName,
        profileImagePath: details.ProfileImagePath,
      });
    }
  }, []);

  const signOut = () => {
    removeAllCookiesLogOut();
    Navigate(Routes.signIn);
  };

  const toggleHeaderMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div className={`header`}>
        <div className="nav-logo">
          <img src="./Logo.svg" alt="Dashboard" />
        </div>
        <div className="nav-menu">
          <div
            className="menu-links"
            onClick={() => Navigate(Routes.dashboard)}
          >
            <FontAwesomeIcon icon={faTableColumns} /> Home
          </div>
          <div className="menu-links" onClick={() => Navigate(Routes.taskList)}>
            <FontAwesomeIcon icon={faListCheck} /> Task list
          </div>
          <div className="menu-links" onClick={() => Navigate(Routes.product)}>
            <FontAwesomeIcon icon={faCartShopping} /> Shopping
          </div>
          <div className="menu-links" onClick={() => Navigate(Routes.contact)}>
            <FontAwesomeIcon icon={faHeadset} /> Contact
          </div>
        </div>
        <div className="profile-sec">
          <div className="log-out" onClick={() => signOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
          </div>
          <div className="nav-profile" onClick={() => Navigate(Routes.profile)}>
            <div className="profile-img">
              {/* <img src="./Profile-pic.png" alt="Profile"/> */}
              <img
                src={
                  userDetails.profileImagePath !== ""
                    ? APIURL +
                      getImage +
                      "?type=" +
                      "profileImage" +
                      "&&fileName=" +
                      userDetails.profileImagePath
                    : "./Profile-pic.png"
                }
                alt="Profile"
              />
            </div>
            <span>{userDetails.firstName + " " + userDetails.lastName}</span>
          </div>
        </div>
      </div>
      <div
        className="mobilemenu"
        onClick={() => toggleHeaderMenu()}
      >
        <div className="mobile-nav">
          <div className="mobile-logo">
            <img src="./Logo.svg" alt="Logo" />
          </div>
          {openMenu === true ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
        <div className={`${openMenu === true ? 'menu-slide' : 'displaynone'}`}>
          <div className="mobilenav-menu">
            <div
              className="mobilemenu-links"
              onClick={() => Navigate(Routes.dashboard)}
            >
              <FontAwesomeIcon icon={faTableColumns} /> Home
            </div>
            <div
              className="mobilemenu-links"
              onClick={() => Navigate(Routes.taskList)}
            >
              <FontAwesomeIcon icon={faListCheck} /> Task list
            </div>
           
            <div
              className="mobilemenu-links"
              onClick={() => Navigate(Routes.product)}
            >
              <FontAwesomeIcon icon={faCartShopping} /> Shopping
            </div>
            <div
              className="mobilemenu-links"
              onClick={() => Navigate(Routes.contact)}
            >
              <FontAwesomeIcon icon={faHeadset} /> Contact
            </div>
          </div>
          <div className="profile-sec">
            <div className="log-out" onClick={() => signOut()}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
            </div>
            <div
              className="nav-profile"
              onClick={() => Navigate(Routes.profile)}
            >
              <div className="profile-img">
                {/* <img src="./Profile-pic.png" alt="Profile"/> */}
                <img
                  src={
                    userDetails.profileImagePath !== ""
                      ? APIURL +
                        getImage +
                        "?type=" +
                        "profileImage" +
                        "&&fileName=" +
                        userDetails.profileImagePath
                      : "./Profile-pic.png"
                  }
                  alt="Profile"
                />
              </div>
              <span>{userDetails.firstName + " " + userDetails.lastName}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
