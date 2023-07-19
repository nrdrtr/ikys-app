import axios from "axios";

export default class EmployerService{

    registerEmployer(values) {
        return axios.post("http://localhost:8080/api/employer/save", values);
    }

    getByEmployerId(id) {
        return axios.get(`http://localhost:8080/api/employer/getById/${id}`);
    } 
    

    async updateEmployer(employerId, formData) {
        try {
            const response = await axios.put(`http://localhost:8080/api/employer/update/${employerId}`, formData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
      }
      
        getJobAdvertisementsByEmployerId(employerId) {//http://localhost:8080/api/jobAdvertisements/getByEmployerId?employerId=33
            return axios.get(`http://localhost:8080/api/jobAdvertisements/getByEmployerId?employerId=${employerId}`);
        }


    
    
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