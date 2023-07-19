import axios from "axios";
export default class ResumeService {
    getAll() {
        return axios.get("http://localhost:8080/api/resumes/getAll");
    }
    add(values) {
        return axios.post("http://localhost:8080/api/resumes/add", values);
    }
    delete(id) {
        return axios.delete(`http://localhost:8080/api/resumes/delete?id=${id}`);
    }
    update(values) {
        return axios.put("http://localhost:8080/api/resumes/update", values);
    }
    getById(id) {
        return axios.get(`http://localhost:8080/api/resumes/getById?id=${id}`);
    }
    getByCandidateId(jobseekerId) {//http://localhost:8080/api/resumes/getByEmployeeId?employeeId=6
        return axios.get(`http://localhost:8080/api/resumes/getByEmployeeId?employeeId=${jobseekerId}`);
        
    }


}