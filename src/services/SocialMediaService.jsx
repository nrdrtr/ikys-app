import axios from "axios";

//http://localhost:8080/api/employeesocialmedias/getAllByEmployeeId?employeeId=6
export default class SocialMediaService {
    
    getByJobSeekerIdSocialMedia(employeeId) {
        return axios.get("http://localhost:8080/api/employeesocialmedias/getAllByEmployeeId?employeeId=" + employeeId)
    }
}
