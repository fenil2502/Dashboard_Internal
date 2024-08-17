import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Navigate, Routes } from '../../navigation/NavigationLib';

function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="footer-inner">
                <div className="footer-col-1">
                    <div className="footer-logo">
                        <img src="./Pionear-footer.svg" alt="Pionear pumps"/>
                    </div>
                    <p>Experience excellence with Pionear Pumps. Discover our top-tier products and services tailored to meet your industrial needs effortlessly.</p>
                </div>
                <div className="footer-clo-2">
                    <h5>Quick Links</h5>
                    <ul className="footer-menu">
                        <li><FontAwesomeIcon icon={faAnglesRight} /><div onClick={() => Navigate(Routes.home)}>Home</div></li>
                        <li><FontAwesomeIcon icon={faAnglesRight} /><div onClick={() => Navigate(Routes.about)}>About</div></li>
                        <li><FontAwesomeIcon icon={faAnglesRight} /><div onClick={() => Navigate(Routes.product)}>Products</div></li>
                        <li><FontAwesomeIcon icon={faAnglesRight} /><div onClick={() => Navigate(Routes.contact)}>Contact</div></li>
                    </ul>
                </div>
                <div className="footer-col-3">
                    <h5>Connect With Us</h5>
                    <ul className="footer-contact">
                        <li><div className="phone-icon"><FontAwesomeIcon icon={faPhone} /></div><a href="tel:+919825085876" target="_blank" rel="noopener noreferrer">+91 9825085876</a></li>
                        <li><div className="mail-icon"><FontAwesomeIcon icon={faEnvelope} /></div><a href="mailto:ratneshwarieng810@gmail.com" target="_blank" rel="noopener noreferrer">ratneshwarieng810@gmail.com</a></li>
                    </ul>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=100071311974089" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="https://www.instagram.com/pionearpump/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright">
            <div className="container">
                <div className="copyright-inner">
                    <p> © 2024 - All rights are reserved by <span>Pionear Pumps</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer