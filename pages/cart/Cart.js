import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPlus,
  faMinus,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import {
  Navigate,
  NavigateWithData,
  Routes,
} from "../../navigation/NavigationLib";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { SGTechWebUrl } from "../../utils/AppSetting";
import { getAuthProps } from "../../utils/AuthenticationLibrary";
import Payment from "../payment/Payment";
import { Messages } from "../../utils/Messages";
import { isValidForm } from "../../utils/validations/CommonValidator";
import PageLoader from "../../components/common/pageLoader/PageLoader";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      pageLoading: false,
      quantity: 1,
      taskDetails: {
        userId: 0,
      },
      productDetails: {
        productId: 0,
        ProductCatagoryId: 0,
        searchProduct: "",
      },
      productDetailsList: [],
      totalSum: 0,
      gstAmount: 0,
      finalPrice: 0,
      paymentModel: false,
      userDetails: {
        userId: 0,
        isPaymentPopUpActive: false,
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
      },
      cardDetails: {
        cardNumber: "547856459865",
        cardHolderName: "Fenil Patel",
        expiryDate: "01/39",
        cvvCode: "100",
      },
      validationRules: {
        cardNumber: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "card number"
            ),
          },
        ],
        cardHolderName: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "card holder name"
            ),
          },
        ],
        expiryDate: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "expiry date"
            ),
          },
        ],
        cvvCode: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "CVV code"
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

  componentDidMount() {
    let details = getAuthProps();
    if (details != undefined) {
      if (details.userId != undefined && details.userId > 0) {
        let taskDetails = this.state.taskDetails;
        taskDetails.userId = details.userId;
        this.setState({ taskDetails: taskDetails }, () => {
          this.getAllProducts();
        });
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

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
    request.userId = this.state.taskDetails.userId
    this.dashboardServices.getAllProducts(request).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent.filter(
          (x) => x.isAddedToCart === true
        );
        details.map((x) => {
          x.productQuantity = 1;
        });
        let totalSum = details.reduce(
          (sum, product) => sum + Number(product.productPrice),
          0
        );
        this.setState({ totalSum: totalSum });
        this.setState({ productDetailsList: details }, () => {
          this.getDashboardDetailsById(this.state.taskDetails.userId);
        });
      } else {
        this.SwalServices.Error(response.message);
        this.getDashboardDetailsById(this.state.taskDetails.userId);
      }
      this.setState({ isLoading: false });
    });
  };

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

  incrementQuantity = (productId) => {
    this.setState(
      (prevState) => {
        const updatedProductDetailsList = prevState.productDetailsList.map(
          (product) => {
            if (product.productId === productId) {
              return {
                ...product,
                productQuantity: product.productQuantity + 1,
              };
            }
            return product;
          }
        );
        this.setState({ productDetailsList: updatedProductDetailsList });
      },
      () => {
        this.sumProductQuantity();
      }
    );
  };

  sumProductQuantity = () => {
    const finalSum = this.state.productDetailsList.reduce((sum, product) => {
      return sum + product.productQuantity * Number(product.productPrice);
    }, 0);
    this.setState({ totalSum: finalSum });
  };

  decrementQuantity = (productId) => {
    this.setState(
      (prevState) => {
        const updatedProductDetailsList = prevState.productDetailsList.map(
          (product) => {
            if (
              product.productId === productId &&
              product.productQuantity > 0
            ) {
              return {
                ...product,
                productQuantity: product.productQuantity - 1,
              };
            }
            return product;
          }
        );
        this.setState({ productDetailsList: updatedProductDetailsList });
      },
      () => {
        this.sumProductQuantity();
      }
    );
  };

  addToCartProductById = (productId) => {
    let id = [productId, false, this.state.userDetails.userId];
    this.dashboardServices.addToCartProductById(id).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent;
        details.userId = id;
        this.setState({ userDetails: details }, () => {
          this.getAllProducts();
        });
        this.SwalServices.Success("Product remove from cart successfully");
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.cardDetails;
    details[name] = value;
    this.setState({ cardDetails: details });
  };

  openTaskModel = (event) => {
    let gstAmount = this.state.totalSum * 0.08;
    let finalPrice = this.state.totalSum + gstAmount;
    this.setState({ gstAmount: gstAmount, finalPrice: finalPrice });

    let details = this.state.userDetails;
    details.isPaymentPopUpActive = false;
    this.setState({ userDetails: details });
    event.stopPropagation();
    this.setState({ paymentModel: true });
  };

  openPaymentPopUp = (popUp) => {
    let details = this.state.userDetails;
    details.isPaymentPopUpActive = popUp;
    this.setState({ userDetails: details });
  };

  isValidAllFields = () => {
    const newValidState = isValidForm(
      this.state.cardDetails,
      this.state.validationRules,
      this.state.validState
    );
    this.setState({ validState: newValidState });
    return newValidState.isValid;
  };

  productPayment = () => {
    let isValidAllFields = this.isValidAllFields();
    if (isValidAllFields) {
      this.setState({ pageLoading: true });
      let request = {};
      request.subTotalPrice = this.state.totalSum;
      request.gstAmount = this.state.gstAmount;
      request.totalAmount = this.state.finalPrice;
      request.productDetailsList = this.state.productDetailsList;
      request.userId = this.state.taskDetails.userId;
      this.dashboardServices.productPayment(request).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          this.SwalServices.Success('Your payment has been successfully processed. Please find the invoice attached in your email.')
          this.setState({ paymentModel: false });
          this.setState({ pageLoading: false });
        } else {
          this.SwalServices.Error(response.message);
          this.setState({ pageLoading: false });
        }
      });
    }
  };

  render() {
    return (
      <>
        {this.state.pageLoading === true ? (
          <PageLoader />
        ) : (
          <div className="cart-page">
            <h2>
              <FontAwesomeIcon icon={faCartShopping} />
              Your cart
            </h2>
            <div className="cart-inner">
              <div className="products-part">
                {this.state.productDetailsList &&
                this.state.productDetailsList.length > 0
                  ? this.state.productDetailsList.map((product, key) => (
                      <div className="product-card" key={key}>
                        <div className="card-img">
                          <img
                            src={SGTechWebUrl + product.productImage}
                            alt="iPhone"
                          />
                        </div>
                        <div className="card-inner">
                          <div className="card-content">
                            <h4>{product.productName}</h4>
                            <span className="avail">
                              ₹{product.productPrice}
                            </span>
                            <h5>Quantity</h5>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  this.decrementQuantity(product.productId)
                                }
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span>{product.productQuantity}</span>
                              <button
                                onClick={() =>
                                  this.incrementQuantity(product.productId)
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                          <div
                            className="remove-product"
                            onClick={() =>
                              this.addToCartProductById(product.productId)
                            }
                          >
                            <FontAwesomeIcon icon={faTrashCan} /> Remove
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="summary-part">
                <div className="pricing-sec">
                  <h5>Total:</h5>
                  <p>₹ {this.state.totalSum}</p>
                </div>
                <div className="address-sec">
                  <h5>Address</h5>
                  <p>Ahmedabad, Gujarat</p>
                  <h6
                    onClick={() =>
                      NavigateWithData(Routes.profile, {
                        userId: this.state.taskDetails.userId,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    Change address
                  </h6>
                </div>
                <button
                  onClick={(event) => this.openTaskModel(event)}
                  className="prm-blue"
                >
                  Pay now
                </button>
              </div>
            </div>
            <Payment
              paymentModel={this.state.paymentModel}
              setOpenModal={() => {
                this.setState({ paymentModel: false });
              }}
              onClose={(e) => {
                e.stopPropagation();
                this.setState({ paymentModel: false });
              }}
              userDetails={this.state.userDetails}
              openPaymentPopUp={this.openPaymentPopUp.bind(this)}
              productDetailsList={this.state.productDetailsList}
              totalSum={this.state.totalSum}
              cardDetails={this.state.cardDetails}
              handleChange={this.handleChange.bind(this)}
              productPayment={this.productPayment.bind(this)}
              validState={this.state.validState}
              pageLoading={this.state.pageLoading}
            />
          </div>
        )}
      </>
    );
  }
}

export default Cart;
