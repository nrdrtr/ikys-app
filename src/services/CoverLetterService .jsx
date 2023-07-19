import axios from "axios";

export default class CoverLetterService {

    add(values) {
        return axios.post("http://localhost:8080/api/coverLetters/add", values);
    }
    delete(id) {
        return axios.delete(`http://localhost:8080/api/coverLetters/delete?id=${id}`);
    }

    getAllByCandidateId(candidateId) {
        return axios.get(`http://localhost:8080/api/coverLetters/getAllByCandidateId?candidateId=${candidateId}`);
    }
    getAllResumesDetailsByActivatedCandidate() {
        return axios.get("http://localhost:8080/api/resumes/getAllResumesDetailsByActivatedCandidate");
    }

    getAllByEmployeeId(employeeId) {
        return axios.get("http://localhost:8080/api/coverletters/getAllByEmployeeId?employeeId=" + employeeId);
    }

    getById(id) {
        return axios.get("http://localhost:8080/api/coverletters/getById?id=" + id);
    }
    update(values) {
        return axios.put("http://localhost:8080/api/coverletters/update", values);
    }

}