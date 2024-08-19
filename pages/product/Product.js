import React, { Component } from "react";
import Link from "next/link";
import ValidationText from "../../utils/validations/ValidationText";
import DropdownSelect from "../../components/inputs/Dropdown";
import SwalServices from "../../services/swal/SwalServices";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { Messages } from "../../utils/Messages";
import {
  NavigateWithData,
  Routes,
  Navigate,
} from "../../navigation/NavigationLib";
import { SGTechWebUrl } from "../../utils/AppSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { getAuthProps } from "../../utils/AuthenticationLibrary";

class Product extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      userId : 0,
      productCatagoryOptions: [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Groceries" },
      ],
      productDetails: {
        productId: 0,
        ProductCatagoryId: 0,
        searchProduct: "",
      },
      cartProductCount : 0,
      productDetailsList: [],
    };
  }

  componentDidMount() {
    let details = getAuthProps();
    if (details != undefined) {
      if (details.userId != undefined && details.userId > 0) {
        this.setState({ userId : details.userId },() => {
          this.getAllProducts();
        })
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

  setFilterParameters = (id, drpIdentity) => {
    let productDetails = this.state.productDetails;
    if (drpIdentity === "ProductCatagory") {
      productDetails.ProductCatagoryId = id;
    }
    this.setState({ productDetails: productDetails }, () => {
      this.getAllProducts();
    });
  };

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.productDetails;
    if (name === "searhTask") {
      details.searchProduct = value;
      this.setState({ productDetails: details }, () => {
        this.getAllProducts();
      });
    }
  };

  getAllProducts = () => {
    let request = this.state.productDetails;
    if (request.ProductCatagoryId > 0) {
      request.productCatagory = this.state.productCatagoryOptions.find(
        (x) => x.id === request.ProductCatagoryId
      ).name;
    } else {
      request.productCatagory = "";
    }
    request.isAddedToCart = 0;
    request.userId = this.state.userId
    this.dashboardServices.getAllProducts(request).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent;

        let count = details[0].cartProductCount;
        this.setState({ productDetailsList: details, cartProductCount : count });
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div className="product-page">
        <h3>Buy what ever you want:</h3>
        <div className="product-selector">
          <div className="product-filter">
            <div className="product-search">
              <input
                className="search"
                type="text"
                id="searhTask"
                name="searhTask"
                placeholder="Searh product"
                value={this.state.searhTask}
                onChange={(event) => this.handleChange(event, "searhTask")}
                autoComplete="off"
              />
            </div>
            <div className="product-catagory">
              <DropdownSelect
                optionArray={this.state.productCatagoryOptions}
                setFilterParameters={this.setFilterParameters.bind(this)}
                value={this.state.productDetails.ProductCatagoryId}
                drpIdentity="ProductCatagory"
              />
            </div>
          </div>
          <button className="prm-blue" onClick={() => Navigate(Routes.Orders)}>
            <FontAwesomeIcon icon={faBagShopping} />
            View Orders
          </button>
          <button className="prm-blue" onClick={() => Navigate(Routes.Cart)}>
            <FontAwesomeIcon icon={faBagShopping} />
            View cart<span className="products-numbers">
            {this.state.cartProductCount > 0
                ? this.state.cartProductCount
                : null}
            </span>
          </button>
        </div>
        <div className="product-listing">
          {this.state.productDetailsList &&
          this.state.productDetailsList.length > 0
            ? this.state.productDetailsList.map((detail, key) => (
                <div className="product" key={key}>
                  <div className="product-img">
                    <img
                      src={SGTechWebUrl + detail.productImage}
                      alt="Product"
                    />
                  </div>
                  <div className="product-detail">
                    <div className="tag">{detail.productCategory}</div>
                    <h5>{detail.productName}</h5>
                    <span>₹{detail.productPrice}</span>
                    <div
                      onClick={() =>
                        NavigateWithData(Routes.productDetail, {
                          productId: detail.productId,
                        })
                      }
                    >
                      <a>Buy now</a>
                    </div>
                  </div>
                </div>
              ))
            : null}
          {/* <div className="product">
            <div className="product-img">
              <img src="./Product.png" alt="Product" />
            </div>
            <div className="product-detail">
              <div className="detail-left">
                <div className="tag">High</div>
                <h5>Product one</h5>
                <Link href="#">
                  <a>Buy now</a>
                </Link>
              </div>
              <div className="detail-right">
                <span>$99</span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-img">
              <img src="./Product.png" alt="Product" />
            </div>
            <div className="product-detail">
              <div className="detail-left">
                <div className="tag">Low</div>
                <h5>Product one</h5>
                <Link href="#">
                  <a>Buy now</a>
                </Link>
              </div>
              <div className="detail-right">
                <span>$99</span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-img">
              <img src="./Product.png" alt="Product" />
            </div>
            <div className="product-detail">
              <div className="detail-left">
                <div className="tag">High</div>
                <h5>Product one</h5>
                <Link href="#">
                  <a>Buy now</a>
                </Link>
              </div>
              <div className="detail-right">
                <span>$99</span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-img">
              <img src="./Product.png" alt="Product" />
            </div>
            <div className="product-detail">
              <div className="detail-left">
                <div className="tag">Mid</div>
                <h5>Product one</h5>
                <Link href="#">
                  <a>Buy now</a>
                </Link>
              </div>
              <div className="detail-right">
                <span>$99</span>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="product-img">
              <img src="./Product.png" alt="Product" />
            </div>
            <div className="product-detail">
              <div className="detail-left">
                <div className="tag">Mid</div>
                <h5>Product one</h5>
                <Link href="#">
                  <a>Buy now</a>
                </Link>
              </div>
              <div className="detail-right">
                <span>$99</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Product;
