import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Navigate, Routes } from "../../navigation/NavigationLib";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password-page">
        <div className="container">
          <div className="forgot-password-inner">
            <div className="forgot-password-card">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <h4>Forgot password</h4>
              <p>Enter your email and we&apos;ll send you a link to reset your password.</p>
              <div className="forgot-password-form">
                    <div className="email">
                      <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <button type="submit" className="forgot-sbmt">Submit</button>
              </div>
              <a onClick={() => Navigate(Routes.signIn)}><FontAwesomeIcon icon={faChevronLeft}/> Back to login</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;