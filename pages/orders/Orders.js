import React, { Component } from "react";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import SwalServices from "../../services/swal/SwalServices";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import { getAuthProps } from "../../utils/AuthenticationLibrary";
import { saveAs } from 'file-saver';
import { Navigate, Routes } from "../../navigation/NavigationLib";
import moment from 'moment'

class Orders extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      isLoading: false,
      userId: 0,
      orderList: [],
    };
  }

  componentDidMount() {
    let details = getAuthProps();
    if (details != undefined) {
      if (details.userId != undefined && details.userId > 0) {
        this.setState({ userId: details.userId }, () => {
          this.getAllRecentOrdersById();
        });
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

  getAllRecentOrdersById = () => {
    let request = this.state.userId;
    this.dashboardServices.getAllRecentOrdersById(request).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let orderList = response.responseItem.responseContent;
        this.setState({ orderList: orderList });
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  getPdf = (invoicePath) => {
    this.setState({ isLoadingPdf: true });
    let request = [
        "OrderPdf",
        invoicePath
    ]
    this.dashboardServices.getPDF(request).then((response) => {
        if (response.data != null && response.status === 200) {
            var file = new Blob([response.data], { type: "application/pdf" });
            URL.createObjectURL(file);
            saveAs(file, "Order" + ".pdf");
        } else {
            this.swalServices.Error(response.message);
        }
        this.setState({ isLoadingPdf: false });
    });
  }

  render() {
    return (
      <div className="orderpage">
        <h2>Your Orders</h2>
        <div className="form" method="post">
          {this.state.orderList && this.state.orderList.length > 0
            ? this.state.orderList.map((order, key) => (
                <div key={key}>
                  <div className="flex justify-between">
                    <div>
                      <p>Order Date :- {moment(order.createAt).format('DD MMM yyyy')}</p>
                      <p>Invoice No :- {order.invoiceNO}</p>
                      <p>SubTotal Price :- {order.subTotalAmount}</p>
                      <p>GST Amount :- {order.gstAmount}</p>
                      <p>Total Amount :- {order.totalAmount}</p>
                      <p>Payment Status :- {order.paymentStatus}</p>
                    </div>
                    <div>
                      {order.invoicePath && order.invoicePath !== "" ? (
                        <button
                          className="prm-blue"
                          onClick={() => this.getPdf(order.invoicePath)}
                        >
                          View Invoice
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            : "You haven't buy anything from our site"}
        </div>
      </div>
    );
  }
}

export default Orders;
