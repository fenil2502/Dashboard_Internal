import React, { Component } from "react";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { Navigate, Routes } from "../../navigation/NavigationLib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "../../components/UIComponent/ButtonLoader";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isButtonloader: true,
      showPassword: true,
      userDetails: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationrules: {},
    };
  }

  togglePasswordVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.userDetails;
    details[name] = value;
    this.setState({ userDetails: details });
  };

  addUser = () => {
    let request = this.state.userDetails;
    if (
      request.firstName === "" ||
      request.lastName === "" ||
      request.email === "" ||
      request.password === "" ||
      request.confirmPassword === ""
    ) {
      this.SwalServices.Alert("Please enter all details");
    } else if (request.password !== request.confirmPassword) {
      this.SwalServices.Alert("Please enter same passwords");
    } else {
      this.setState({ isButtonLoader: true });
      this.dashboardServices.addUser(request).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          if (response.responseItem.responseContent.errorColumn === "Email") {
            this.SwalServices.Alert(
              "Email already exists. Please try with another email"
            );
            this.setState({ isButtonLoader: false });
          } else {
            this.SwalServices.Success(
              "Your Application Added successfully. Please login"
            );
            this.setState({ isButtonLoader: false });
            setTimeout(() => {
              Navigate(Routes.signIn);
            }, 1000);
          }
        } else {
          this.SwalServices.Error(response.message);
          this.setState({ isButtonLoader: false });
        }
        this.setState({ isButtonLoader: false });
      });
    }
  };

  render() {
    return (
      <div className="signup">
        <div className="container">
          <div className="signup-inner">
            <div className="signup-card">
              <h3>Sign Up</h3>
              <div className="signup-form">
                <div className="name">
                  <div className="first-name">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={this.state.userDetails.firstName}
                      onChange={(event) =>
                        this.handleChange(event, "firstName")
                      }
                      autoComplete="off"
                    />
                  </div>
                  <div className="last-name">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={this.state.userDetails.lastName}
                      onChange={(event) => this.handleChange(event, "lastName")}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.userDetails.email}
                    onChange={(event) => this.handleChange(event, "email")}
                    autoComplete="off"
                  />
                </div>
                <div className="password">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.userDetails.password}
                    onChange={(event) => this.handleChange(event, "password")}
                    autoComplete="off"
                  />
                </div>
                <div className="confirm-password">
                  <input
                    type={
                      this.state.confirmPasswordVisible ? "text" : "password"
                    }
                    id="reEnterPassword"
                    name="reEnterPassword"
                    placeholder="Re-enter password"
                    value={this.state.userDetails.confirmPassword}
                    onChange={(event) =>
                      this.handleChange(event, "confirmPassword")
                    }
                    autoComplete="off"
                  />
                  <FontAwesomeIcon
                    onClick={this.toggleConfirmPasswordVisibility}
                    className="view-password-btn"
                    icon={
                      this.state.confirmPasswordVisible ? faEyeSlash : faEye
                    }
                  />
                </div>
                <div className="signup-loader">
                {this.state.isButtonLoader === true ? (
                    <ButtonLoader />
                  ) : (
                  <button
                    type="submit"
                    className="signup-btn"
                    onClick={() => this.addUser()}
                  >
                    Sign up
                  </button>
                  )}
                </div>
              </div>
              <p>
                Already have an account?{" "}
                <a onClick={() => Navigate(Routes.signIn)}>Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
