import axios from "axios";

export default class WorkTypesService {
  

  getAll() {
    return axios.get("http://localhost:8080/api/worktypes/getall");
  }

}
