import { AddEditNewTask, AddToCartProductById, AddUser, EditUserDetails, GetAllProducts, GetDashboardDetailsById, GetProductDetailsByProductId, GetTaskbyUserId, ProductPayment, SendInquiry, StoreBase64Image, UserLogin } from "../ApiEndPoints";
import { axiosGetAuthorize, axiosGetMultiParams, axiosPostAuthorize, axiosPostWithoutEncryption } from "../AxiosRequests";


export default class DashboardServices {

    async addUser(request) {
        return axiosPostAuthorize(AddUser, request);
    }
    async userLogin(request) {
        return axiosPostAuthorize(UserLogin, request);
    }
    async getDashboardDetailsById(request) {
        return axiosGetAuthorize(GetDashboardDetailsById, request);
    }
    async editUserDetails(request) {
        return axiosPostAuthorize(EditUserDetails, request);
    }
    async storeBase64Image(request) {
        return axiosPostWithoutEncryption(StoreBase64Image, request, false);
    }
    async addEditNewTask(request) {
        return axiosPostAuthorize(AddEditNewTask, request);
    }
    async getTaskbyUserId(request) {
        return axiosGetMultiParams(GetTaskbyUserId, request);
    }
    async getAllProducts(request) {
        return axiosPostAuthorize(GetAllProducts, request);
    }
    async getProductDetailsByProductId(request) {
        return axiosGetMultiParams(GetProductDetailsByProductId, request);
    }
    async addToCartProductById(request) {
        return axiosGetMultiParams(AddToCartProductById, request);
    }
    async productPayment(request) {
        return axiosPostAuthorize(ProductPayment, request);
    }
    async sendInquiry(request) {
        return axiosPostAuthorize(SendInquiry, request);
    }
}
