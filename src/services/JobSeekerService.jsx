import axios from "axios";

export default class JobSeekerService {


  getIsArayan() {
    return axios.get("http://localhost:8080/api/isarayan/getall");
  }
  updateJobSeeker(values) {
    return axios.put("http://localhost:8080/api/isarayan/update", values);
  }

  registerJobSeeker(values) {
    return axios.post("http://localhost:8080/api/isarayan/save", values);
  }
  getById(id) {
    return axios.get(`http://localhost:8080/api/isarayan/getById/${id}`);
  }

  getApplicationsByJobSeekerId(id) {//http://localhost:8080/api/applications/getBy/{jobSeekerId}?jobSeekerId=6
    return axios.get(`http://localhost:8080/api/applications/getBy/{jobSeekerId}?jobSeekerId=${id}`);
  }
  //http://localhost:8080/api/applications/cancel/1
  cancelApplication(id) {
    return axios.delete(`http://localhost:8080/api/applications/cancel/${id}`);
  }




}
