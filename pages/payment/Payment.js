import React from "react";
import ModalBasic from "../../components/Model/ModalBasic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigateWithData, Routes } from "../../navigation/NavigationLib";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ValidationText from "../../utils/validations/ValidationText";

export default function TaskList(props) {
  let gstAmount = props.totalSum * 0.08;
  let finalPrice = props.totalSum + gstAmount;

  return (
    <>
      <ModalBasic
        id="solution-categorisation-model"
        modalOpen={props.paymentModel}
        setModalOpen={props.setOpenModal}
      >
        <div className="paymentpage">
          <div className="payment">
            {props.userDetails.isPaymentPopUpActive === false ? (
              <div className="buyer-details">
                <h2>Buyer Information</h2>
                <p>
                  {props.userDetails.firstName +
                    " " +
                    props.userDetails.lastName}
                </p>
                <p>{props.userDetails.email}</p>
                <p>{props.userDetails.mobileNo}</p>
                <p>
                  {props.userDetails.addressLine1 +
                    "," +
                    props.userDetails.addressLine2}
                </p>
                <h6
                  className="mt-6"
                  onClick={() =>
                    NavigateWithData(Routes.profile, {
                      userId: props.userDetails.userId,
                    })
                  }
                >
                  <p className="w-5">
                    <FontAwesomeIcon icon={faPencil} />
                  </p>
                  <p>Change details</p>
                </h6>
                <table>
                  <tr>
                    <th>No.</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {props.productDetailsList &&
                  props.productDetailsList.length > 0
                    ? props.productDetailsList.map((product, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{product.productName}</td>
                          <td>{product.productQuantity}</td>
                          <td>
                            {'₹'+Number(product.productPrice) *
                              product.productQuantity}
                          </td>
                        </tr>
                      ))
                    : null}
                </table>
                <p>
                  Sub-Total Price :{" "}
                  {props.totalSum ? '₹'+props.totalSum.toFixed(2) : "0.00"}
                </p>
                <p>Total Discount : {"₹0.00"}</p>
                <p>GST(8%) : {gstAmount ? '₹'+gstAmount.toFixed(2) : "0.00"}</p>
                <p>
                  Total Price : {finalPrice ? '₹'+finalPrice.toFixed(2) : "0.00"}
                </p>

                <button
                  type="button"
                  onClick={() => props.openPaymentPopUp(true)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="credit-card">
                <h2>Credit Card Details</h2>
                <input
                  type="number"
                  name="cardNumber"
                  placeholder="Card Number"
                  onChange={(event) => props.handleChange(event, "cardNumber")}
                  value={props.cardDetails.cardNumber}
                />
                <ValidationText error={props.validState.error.cardNumber} />
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="Card Holder Name"
                  onChange={(event) =>
                    props.handleChange(event, "cardHolderName")
                  }
                  value={props.cardDetails.cardHolderName}
                />
                <ValidationText error={props.validState.error.cardHolderName} />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  onChange={(event) => props.handleChange(event, "expiryDate")}
                  value={props.cardDetails.expiryDate}
                />
                <ValidationText error={props.validState.error.expiryDate} />
                <input
                  type="number"
                  name="cvvCode"
                  placeholder="CVV"
                  onChange={(event) => props.handleChange(event, "cvvCode")}
                  value={props.cardDetails.cvvCode}
                />
                <ValidationText error={props.validState.error.cvvCode} />
                <button
                  onClick={() => props.openPaymentPopUp(false)}
                  type="button"
                >
                  Back
                </button>
                <button onClick={props.productPayment}>Pay</button>
              </div>
            )}
          </div>
        </div>
      </ModalBasic>
    </>
  );
}
