import axios from "axios";
export default class WorkTimeService {
  //http://localhost:8080/api/worktypes/getall

  getWorkTimes() {
    return axios.get("http://localhost:8080/api/worktypes/getall");
  }

}
