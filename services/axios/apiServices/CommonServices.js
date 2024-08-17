import { axiosGet, axiosPostWithoutEncryption } from '../AxiosRequests';
import { GetAllEmployee, GetEmployeeDetailsById, uploadPDF } from '../ApiEndPoints';

export default class CommonServices {
    async uploadPDF(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        formData.append("filename", request.filename);

        return axiosPostWithoutEncryption(uploadPDF, formData, true);
    }

    async getAllEmployee(request) {
        return axiosGet(GetAllEmployee, request);
    }

    async getEmployeeDetailsById(request) {
        return axiosGet(GetEmployeeDetailsById, request);
    }

}