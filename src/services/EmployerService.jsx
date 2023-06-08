import axios from "axios";

export default class EmployerService{

    add(values) {
        return axios.post("http://localhost:8080/api/employer/save", values);
    }

    getByEmployerId(id) {
        return axios.get(`http://localhost:8080/api/employer/getById/33`);
    }                    //http://localhost:8080/api/employer/getById?id=${id}

    
    
}












































// const api = axios.create({
//     baseURL: 'http://localhost:8080/api',
// });

// export const employerLogin = async ({ email, password }) => {
//     try {
//         const response = await api.post('/employer/login', {
//             email,
//             password,
//         });

//         return response.data.status;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Giriş yapılamadı! Kullanıcı adı veya şifre yanlış.');
//     }
 


// update(values) {
//     return axios.put("http://localhost:8080/api/employers/update", values);
// }

// getById(id) {
//     return axios.get(`http://localhost:8080/api/employers/getById?id=${id}`);
// }

// confirm(companyStaffId, employerId, isConfirmed, userConfirmationTypeId) {
//     return axios.put(`http://localhost:8080/api/employers/confirm?companyStaffId=${companyStaffId}&employerId=${employerId}&isConfirmed=${isConfirmed}&userConfirmationTypeId=${userConfirmationTypeId}`);
// }

// getAllByIsConfirmedAndUserConfirmationTypeIdSortedByCompanyName(isConfirmed, userConfirmationTypeId) {
//     return axios.get(`http://localhost:8080/api/employers/getAllByIsConfirmedAndUserConfirmationTypeIdSortedByCompanyName?isConfirmed=${isConfirmed}&userConfirmationTypeId=${userConfirmationTypeId}`);
// }

// getAllOnesThatWaitingForAccountConfirmation() {
//     return axios.get("http://localhost:8080/api/employers/getAllOnesThatWaitingForAccountConfirmation")
// }

// getAllOnesThatWaitingForUpdateConfirmation() {
//     return axios.get("http://localhost:8080/api/employers/getAllOnesThatWaitingForUpdateConfirmation")
// }

// getOneThatWaitingForUpdateConfirmationById(id) {
//     return axios.get(`http://localhost:8080/api/employers/getOneThatWaitingForUpdateConfirmationById?id=${id}`);
// } 
 
// export default EmployerService;