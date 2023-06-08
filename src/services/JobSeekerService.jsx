import axios from "axios";

export default class JobSeekerService {

  
  getIsArayan() {
    return axios.get("http://localhost:8080/api/isarayan/getall");
  }
  registerJobSeeker(values) {
    return axios.post("http://localhost:8080/api/isarayan/save", values);
  }
  getById(id) {
    return axios.get("http://localhost:8080/api/isarayan/getById/" + id);
  }
 

}
 