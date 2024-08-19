import React, { Component } from "react";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { isValidForm, validate } from "../../utils/validations/CommonValidator";
import { Messages } from "../../utils/Messages";
import ValidationText from "../../utils/validations/ValidationText";
import ButtonLoader from "../../components/UIComponent/ButtonLoader";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isLoading: false,
      contactUsDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
      validationRules: {
        firstName: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "first name"
            ),
          },
        ],
        lastName: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "last name"
            ),
          },
        ],
        email: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "email"
            ),
          },
        ],
        phoneNumber: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "phone number"
            ),
          },
        ],
        message: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "message"
            ),
          },
        ],
      },
      validState: {
        isValid: true,
        error: {},
      },
    };
  }

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.contactUsDetails;
    details[name] = value;
    this.setState({ contactUsDetails: details });
  };

  validateField = (key) => {
    const newValidState = validate(
      key,
      this.state.contactUsDetails,
      this.state.validationRules,
      this.state.validState
    );
    this.setState({ validState: newValidState });
    return newValidState.isValid;
  };

  isAllvalidateField = () => {
    const newValidState = isValidForm(
      this.state.contactUsDetails,
      this.state.validationRules,
      this.state.validState
    );
    this.setState({ validState: newValidState });
    return newValidState.isValid;
  };

  sendInquiry = () => {
    let isAllvalidateField = this.isAllvalidateField();
    if (isAllvalidateField) {
      this.setState({ isLoading: true });
      let details = this.state.contactUsDetails;
      this.dashboardServices.sendInquiry(details).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          this.setState({ isLoading: false });
          this.SwalServices.Success('Message sent successfully, Our team will get back to you soon');
          let details = this.state.contactUsDetails;
          (details.firstName = ""),
            (details.lastName = ""),
            (details.email = ""),
            (details.phoneNumber = ""),
            (details.message = "");
          this.setState({ contactUsDetails: details});
        } else {
          this.SwalServices.Error(response.message);
          this.setState({ isLoading: false });
        }
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    return (
      <div className="contactpage">
        <h2>Contact Us</h2>
        <div className="form" method="post">
          <div className="name-sec">
            <div className="first-name">
              <label>First name*</label>
              <input
                type="text"
                id="first_name"
                name="firstName"
                placeholder="Enter your first name"
                value={this.state.contactUsDetails.firstName}
                onChange={(event) => this.handleChange(event, "firstName")}
                onBlur={() => this.validateField("firstName")}
              />
              <ValidationText error={this.state.validState.error.firstName} />
            </div>
            <div className="last-name">
              <label>Last name*</label>
              <input
                type="text"
                id="last_name"
                name="lastName"
                placeholder="Enter your last name"
                value={this.state.contactUsDetails.lastName}
                onChange={(event) => this.handleChange(event, "lastName")}
                onBlur={() => this.validateField("lastName")}
              />
              <ValidationText error={this.state.validState.error.lastName} />
            </div>
          </div>
          <div className="contact-details">
            <div className="phone">
              <label>Phone number*</label>
              <input
                type="tel"
                id="phone_number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={this.state.contactUsDetails.phoneNumber}
                onChange={(event) => this.handleChange(event, "phoneNumber")}
                onBlur={() => this.validateField("phoneNumber")}
              />
              <ValidationText error={this.state.validState.error.phoneNumber} />
            </div>
            <div className="email">
              <label>Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={this.state.contactUsDetails.email}
                onChange={(event) => this.handleChange(event, "email")}
                onBlur={() => this.validateField("email")}
              />
              <ValidationText error={this.state.validState.error.email} />
            </div>
          </div>
          <div className="message">
            <label>Message*</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message..."
              value={this.state.contactUsDetails.message}
              onChange={(event) => this.handleChange(event, "message")}
              onBlur={() => this.validateField("message")}
            ></textarea>
            <ValidationText error={this.state.validState.error.message} />
          </div>
          <div className="message-btn">
          {this.state.isLoading === true ? (
            <ButtonLoader />
          ) : (
            <button
              className="prm-blue"
              type="submit"
              onClick={() => this.sendInquiry()}
            >
              Send message
            </button>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
