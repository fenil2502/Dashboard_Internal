import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="contactpage">
        <h2>Contact Us</h2>
        <div className="form" method="post">
          <div className="name-sec">
            <div className="first-name">
              <label>First name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="last-name">
              <label>Last name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          <div className="contact-details">
            <div className="phone">
              <label>Phone number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="email">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="message">
            <label>Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message..."
            ></textarea>
          </div>
          <button className="prm-blue" type="submit">
            Send message
          </button>
        </div>
      </div>
    );
  }
}

export default Contact;
