import React, { Component } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import {
  GetRouteParams,
  Navigate,
  Routes,
} from "../../navigation/NavigationLib";
import { SGTechWebUrl } from "../../utils/AppSetting";
import { getAuthProps } from "../../utils/AuthenticationLibrary";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      userId: 0,
      productId: 0,
      productDetail: {
        isAddedToCart: false,
        productCategory: "",
        productDescription1: "",
        productDescription2: "",
        productId: 0,
        productImage: "",
        productName: "",
        productPrice: "",
        cartProductCount: 0,
      },
    };
  }

  componentDidMount() {
    let routeParam = GetRouteParams(true).productId;
    let details = getAuthProps();
    if (details != undefined) {
      if (routeParam) {
        let productId = Number(routeParam);
        if (productId) {
          this.setState({ productId: productId });
          // this.getProductDetailsByProductId(productId);
        } else {
          Navigate(Routes.signIn);
        }
      }
      if (details.userId != undefined && details.userId > 0) {
        let userId = details.userId;
        this.setState({ userId: userId }, () => {
          this.getProductDetailsByProductId();
        });
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

  getProductDetailsByProductId = () => {
    let request = [this.state.productId, this.state.userId];
    this.dashboardServices
      .getProductDetailsByProductId(request)
      .then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          let details = response.responseItem.responseContent;
          this.setState({ productDetail: details });
        } else {
          this.swalServices.Error(response.message);
        }
        this.setState({ isLoading: false });
      });
  };

  addToCartProductById = () => {
    let id = [this.state.productDetail.productId, true, this.state.userId];
    this.dashboardServices.addToCartProductById(id).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent;
        details.userId = id;
        this.setState({ userDetails: details }, () => {
          this.getProductDetailsByProductId(this.state.productDetail.productId);
        });
        this.SwalServices.Success("Product added to cart successfully");
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div className="productdetail-page">
        <div className="detail-heading">
          <h5 onClick={() => Navigate(Routes.product)}>
            <FontAwesomeIcon icon={faAngleLeft} />
            Back to productpage
          </h5>
          <button className="prm-blue" onClick={() => Navigate(Routes.Cart)}>
            <FontAwesomeIcon icon={faBagShopping} />
            View cart
            {this.state.cartProductCount > 0 ? (
              <span className="products-numbers">
                {this.state.cartProductCount}
              </span>
            ) : null}
          </button>
        </div>
        <div className="product-info">
          <div className="product-img">
            <img
              src={SGTechWebUrl + this.state.productDetail.productImage}
              alt="PC"
            />
          </div>
          <div className="product-description">
            <h3>{this.state.productDetail.productName}</h3>
            <div className="tag">
              {this.state.productDetail.productCategory}
            </div>
            <h4>₹{this.state.productDetail.productPrice}</h4>
            <div className="button">
              <button className="prm-blue">Buy now</button>
              {this.state.productDetail.isAddedToCart === false ? (
                <button
                  className="scn-teal"
                  onClick={() => this.addToCartProductById()}
                >
                  Add to cart
                </button>
              ) : (
                "This product already in cart"
              )}
            </div>
            <p>
              {this.state.productDetail.productDescription1}
              {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. */}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
