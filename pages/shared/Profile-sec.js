import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faWhatsapp,
  } from "@fortawesome/free-brands-svg-icons";
  import {
    RiMailUnreadLine,
  } from "react-icons/ri";

function ProfileSec() {

  return (
    <div className="profile-section">
        <div className="profile-img">
          <img src="./profile-pic.png" alt="Fenil Patel" />
        </div>
        <div className="name-designation">
          <h3>Viren Patel</h3>
          <h6>Developer, Designer & Analyst</h6>
        </div>
        <div className="user-mail">
          <RiMailUnreadLine />
          <Link
            href="mailto:patelvirenb602@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            patelvirenb602@gmail.com
          </Link>
        </div>
        <span>© 2024 All rights are reserved.</span>
        <div className="social-media">
          <a
            href="https://www.facebook.com/profile.php?id=100007959032595"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com/f_e_n_i_l_patel/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/in/fenil-patel-6608b0207/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://wa.me/+919054527523"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </div>
        <button
          className="primary-btn"
          onClick={() => scrollToSection("contact")}
        >
          Contact Me
        </button>
      </div>
  );
}

export default ProfileSec;
