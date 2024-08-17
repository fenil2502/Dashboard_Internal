import React, { Component } from "react";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { Navigate, Routes } from "../../navigation/NavigationLib";
import { setAuthProps } from "../../utils/AuthenticationLibrary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "../../components/UIComponent/ButtonLoader";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isButtonLoader: false,
      passwordVisible: false,
      loginDetials: {
        email: "fenil@gmail.com",
        password: "Fenil@123",
      },
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.loginDetials;
    details[name] = value;
    this.setState({ loginDetials: details });
  };

  userLogin = () => {
    let request = this.state.loginDetials;
    if (request.email === "") {
      this.SwalServices.Alert("Please enter email");
    } else if (request.password === "") {
      this.SwalServices.Alert("Please enter password");
    } else {
      this.setState({ isButtonLoader: true });
      this.dashboardServices.userLogin(request).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          if (
            response.responseItem.responseContent.userId > 0 &&
            response.responseItem.responseContent.errorColumn === ""
          ) {
            let userDetails = {
              userId: response.responseItem.responseContent.userId,
              Email: response.responseItem.responseContent.email,
              FirstName: response.responseItem.responseContent.firstName,
              LastName: response.responseItem.responseContent.lastName,
              ProfileImagePath:
                response.responseItem.responseContent.profileImagePath,
            };
            setAuthProps(userDetails);
            Navigate(Routes.dashboard);
            this.setState({ isButtonLoader: false });
          } else if (
            response.responseItem.responseContent.errorColumn === "Password"
          ) {
            this.SwalServices.Alert(
              response.responseItem.responseContent.message
            );
            this.setState({ isButtonLoader: false });
          } else if (
            response.responseItem.responseContent.errorColumn === "Email"
          ) {
            this.SwalServices.Alert(
              response.responseItem.responseContent.message
            );
            this.setState({ isButtonLoader: false });
          }
        } else {
          this.SwalServices.Error(response.message);
          this.setState({ isButtonLoader: false });
        }
        this.setState({ isButtonLoader: false });
      });
    }
  };

  // userLogin = () => {
  //   Navigate(Routes.dashboard);
  // };

  render() {
    return (
      <div className="signin">
        <div className="container">
          <div className="signin-inner">
            <div className="signin-card">
              <h3>Log in</h3>
              <div className="signin-form">
                <div className="email">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.loginDetials.email}
                    onChange={(event) => this.handleChange(event, "email")}
                    autoComplete="off"
                  />
                </div>
                <div className="password">
                  <input
                    type={this.state.passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.loginDetials.password}
                    onChange={(event) => this.handleChange(event, "password")}
                    autoComplete="off"
                  />
                  <FontAwesomeIcon
                    className="view-password-btn"
                    icon={this.state.passwordVisible ? faEyeSlash : faEye}
                    onClick={this.togglePasswordVisibility}
                  />
                </div>
                <div className="forgot-password">
                  <a href="">Forgot password?</a>
                </div>
                <div className="login-loader">
                  {this.state.isButtonLoader === true ? (
                    <ButtonLoader />
                  ) : (
                    <button
                      onClick={() => this.userLogin()}
                      type="submit"
                      className="login-btn"
                    >
                      Log in
                    </button>
                  )}
                </div>
              </div>
              <p>
                Don&apos;t have an account?{" "}
                <a onClick={() => Navigate(Routes.signUp)}>Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
