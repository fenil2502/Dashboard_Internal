import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { getAuthProps, setAuthProps } from "../../utils/AuthenticationLibrary";
import { Navigate, Routes } from "../../navigation/NavigationLib";
import ImageCropperWithUpload from "../../components/ImageUpload/UploadImage";
import ButtonLoader from "../../components/UIComponent/ButtonLoader";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.swalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isOpen: true,
      isButtonLoader: false,
      userDetails: {
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        mobileNo: "",
        addressLine1: "",
        addressLine2: "",
        profileImagePath: "",
      },
    };
  }

  componentDidMount() {
    let details = getAuthProps();
    if (details != undefined) {
      if (details.userId != undefined && details.userId > 0) {
        this.getDashboardDetailsById(details.userId);
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

  getDashboardDetailsById = (id) => {
    this.dashboardServices.getDashboardDetailsById(id).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent;
        details.userId = id;
        let userDetails = {
          userId: response.responseItem.responseContent.userId,
          Email: response.responseItem.responseContent.email,
          FirstName: response.responseItem.responseContent.firstName,
          LastName: response.responseItem.responseContent.lastName,
          ProfileImagePath:
            response.responseItem.responseContent.profileImagePath,
        };

        setAuthProps(userDetails);
        this.setState({ userDetails: details });
      } else {
        this.swalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.userDetails;
    details[name] = value;
    this.setState({ userDetails: details });
  };

  editUserDetails = () => {
    this.setState({ isButtonLoader: true });
    let request = this.state.userDetails;
    if (
      request.firstName === "" ||
      request.lastName === "" ||
      request.email === ""
    ) {
      this.swalServices.Alert("Please enter all details");
    } else if (request.password !== request.confirmPassword) {
      this.swalServices.Alert("Please enter same passwords");
    } else {
      this.dashboardServices.editUserDetails(request).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          if (response.responseItem.responseContent.errorColumn === "") {
            this.swalServices.Success("Details Updated successfully");
            this.setState({ isButtonLoader: false });
          }
        } else {
          this.swalServices.Error(response.message);
          this.setState({ isButtonLoader: false });
        }
        this.setState({ isButtonLoader: false });
      });
    }
  };

  saveMainImage = (file, keyId, imageIdentity) => {
    file.storagePath = imageIdentity;
    this.dashboardServices.storeBase64Image(file).then((response) => {
      if (response != null) {
        this.swalServices.Success("Photo Uploaded");
        if (file.storagePath === "profileImage") {
          let detail = this.state.userDetails;
          detail["profileImagePath"] = response.fileName;
          this.setState({ userDetails: { ...detail } });
        }
      } else {
        this.swalServices.Error(response.message);
      }
    });
  };

  render() {
    return (
      <div className="profile">
        <div className="profile-img">
          {/* <img src="./Profile-pic.png" alt="User Name" /> */}
          {/* <button className="edit-img">
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit photo
          </button> */}

          <div className="lg:w-[350px] lg:mx-0 mx-auto">
            <ImageCropperWithUpload
              key="Main"
              height={190}
              width={190}
              isCheckValidation={true}
              MaxFileSize={2097152}
              MaxFileSizeMessage={"2MB"}
              onSaveImage={this.saveMainImage.bind(this)}
              aspactRatio={140 / 140}
              imageIdentity="profileImage"
              intitImage={this.state.userDetails.profileImagePath}
              uploadBtn={"Upload Image"}
              dimensionText={""}
            />
          </div>

          {/* <button className="remove-img">
            <FontAwesomeIcon icon={faXmark} />
            Remove
          </button> */}
        </div>
        <div className="profile-details">
          <div className="personal-details">
            <h4>Personal details:</h4>
            <div className="details-input">
              <div className="first-name">
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={this.state.userDetails.firstName}
                  onChange={(event) => this.handleChange(event, "firstName")}
                  autoComplete="off"
                />
              </div>
              <div className="last-name">
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={this.state.userDetails.lastName}
                  onChange={(event) => this.handleChange(event, "lastName")}
                  autoComplete="off"
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.userDetails.email}
                  onChange={(event) => this.handleChange(event, "email")}
                  autoComplete="off"
                />
              </div>
              <div className="mobile">
                <label htmlFor="mobile">Mobile no:</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="\d*"
                  id="mobileNo"
                  name="mobileNo"
                  value={this.state.userDetails.mobileNo}
                  onChange={(event) => this.handleChange(event, "mobileNo")}
                  autoComplete="off"
                />
              </div>
              <div className="designation">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={this.state.userDetails.designation}
                  onChange={(event) => this.handleChange(event, "designation")}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="address">
            <h4>Address:</h4>
            <div className="address-input">
              <div className="line-1">
                <label htmlFor="line-1">Address Line 1:</label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={this.state.userDetails.addressLine1}
                  onChange={(event) => this.handleChange(event, "addressLine1")}
                  autoComplete="off"
                />
              </div>
              <div className="line-2">
                <label htmlFor="line-2">Address Line 2:</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={this.state.userDetails.addressLine2}
                  onChange={(event) => this.handleChange(event, "addressLine2")}
                  autoComplete="off"
                />
              </div>
              <div className="clock-btns">
                {this.state.isButtonLoader === true ? (
                  <ButtonLoader />
                ) : (
                  <button
                    className="checkin-btn"
                    onClick={() => this.editUserDetails()}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
