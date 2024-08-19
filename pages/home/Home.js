import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { getAuthProps } from "../../utils/AuthenticationLibrary";
import {
  Navigate,
  NavigateWithData,
  Routes,
} from "../../navigation/NavigationLib";
import DateRangePickkerSelect from "../../components/datePicker/DateRangePickkerSelect";
import moment from "moment";
import { APIURL, getImage } from "../../services/axios/ApiEndPoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes, faTruck } from "@fortawesome/free-solid-svg-icons";
import PieChartComponent from "../../components/piechart/PieChartComponent";
import { SGTechWebUrl } from "../../utils/AppSetting";

const today = moment();

class Home extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isOpen: true,
      value: moment.range(today.clone().subtract(7, "days"), today.clone()),
      userDetails: {
        userId: 0,
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        profileImagePath: "",
        totalOrders : 0,
        totalProducts : 0,
        groceriesCount : 0,
        clothingCount : 0,
        electronicsCount : 0
      },
      formattedTime: "",
    };
  }

  componentDidMount() {
    let details = getAuthProps();
    this.getTime();
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
        this.setState({ userDetails: details });
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  onToggle = () => {
    this.setState({ isOpen: true });
  };

  changeIsOpenFalse = () => {
    this.setState({ isOpen: false });
  };

  getTime = () => {
    const today = moment();
    const formattedTime = today.format("h:mm a");
    this.setState({ formattedTime: formattedTime });
  };

  render() {
    return (
      <div className="homepage">
        <div className="details">
          <div className="top-card">
            <div className="wlc-user">
              <div className="wlc-bg">
                <h1>
                  Welcome,{" "}
                  {this.state.userDetails.firstName
                    ? this.state.userDetails.firstName
                    : "User"}
                </h1>
                <p>
                  It&apos;s great to see you here. Let&apos;s dive into what&apos;s new and
                  keep the momentum going.
                </p>
                <button className="prm-blue" onClick={() => Navigate(Routes.taskList)}>View Tasks</button>
              </div>
            </div>
            {/* <div className="user-profile">
              <div className="user-details">
                <img src={this.state.userDetails.profileImagePath !== "" ? APIURL + getImage + "?type=" + "profileImage" + "&&fileName=" + this.state.userDetails.profileImagePath : './Profile-pic.png'} alt="User Name" />
                <h5>
                  {this.state.userDetails.firstName +
                    " " +
                    this.state.userDetails.lastName}
                </h5>
                <p className="user-designation">{this.state.userDetails.designation ? this.state.userDetails.designation : ''}</p>
                <button
                  onClick={() =>
                    NavigateWithData(Routes.profile, {
                      userId: this.state.userDetails.userId,
                    })
                  }
                  className="scn-teal"
                >
                  View Profile
                </button>
              </div>
            </div> */}
          </div>
          <div className="product-order">
            <div className="total-product">
              <div className="product-icon">
                <FontAwesomeIcon icon={faCubes} />
              </div>
              <div className="product-text">
                <h5>Total Products</h5>
                <h4>{this.state.userDetails.totalProducts}</h4>
              </div>
            </div>
            <div className="total-order">
              <div className="order-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className="order-text">
                <h5>Total Orders</h5>
                <h4>{this.state.userDetails.totalOrders}</h4>
              </div>
            </div>
          </div>
          {/* <div className="recent-work">
            <div className="projects-tab">
              <h2>Recent Projects</h2>
            </div>
            <div className="work">
              <div className="work-tile">
                <img src="./Pionear-logo.png" alt="Pionear Pumps" />
                <h4>Pionear Pumps</h4>
                <button className="scn-teal">View</button>
              </div>
              <div className="work-tile">
                <img src="./Pionear-logo.png" alt="Pionear Pumps" />
                <h4>Pionear Pumps</h4>
                <button className="scn-teal">View</button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="category-rank">
          <div className="catagory-chart">
            <h4>Product Catagory</h4>
            <PieChartComponent 
            clothingCount = {this.state.userDetails.clothingCount}
            electronicsCount = {this.state.userDetails.electronicsCount}
            groceriesCount = {this.state.userDetails.groceriesCount}
            />
          </div>
          <div className="top-product">
            <h4>Most Seller</h4>
            <div className="product-list">
              <div className="product">
                <div className="product-img">
                  <img src="./Laptop.png" alt="Product" />
                </div>
                <div className="product-detail">
                  <div className="tag">Electronics</div>
                  <h5>Laptop</h5>
                  <span>$9999</span>
                  <div
                    onClick={() =>
                      NavigateWithData(Routes.product)}
                  >
                    <a>Buy now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
