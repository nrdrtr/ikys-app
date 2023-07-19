import axios from "axios";

export default class JobAdvertisementService {

  //http://localhost:8080/api/jobAdvertisements/save
  addJobAdvertisement(jobAdvertisement) {
    return axios.post("http://localhost:8080/api/jobAdvertisements/save", jobAdvertisement);
  }
  
  getJobAdvertisements() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
  }

  getByIsActiveAdvertisements() {
    return axios.get(
      `http://localhost:8080/api/jobAdvertisements/getByIsActiveTrue`);
  }

  getByIsPozisyonId(id) {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getByJobPositionId?isPozisyonu=" + id);
  }   //http://localhost:8080/api/jobAdvertisements/getByJobPositionId?isPozisyonu=2


  getJobAdvertisementById(id) {
    return axios.get(`http://localhost:8080/api/jobAdvertisements/getById/${id}`);
  }

  getByCityName(cityName) {
    return axios.get(
      `http://localhost:8080/api/jobAdvertisements/getByCityName?cityName=${cityName}`
    );
  }

  //http://localhost:8080/api/jobAdvertisements/getByIsActiveTrue

  getByIsActiveTrue() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getByIsActiveTrue");

  

  }
  //http://localhost:8080/api/jobAdvertisements/getAllByPage?pageNo=1&pageSize=2
  getAllByPage(pageNo, pageSize) {
    return axios.get(
      `http://localhost:8080/api/jobAdvertisements/getAllByPage?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }


  //http://localhost:8080/api/jobAdvertisements/setStatus?jobAdvertisementId=45&employerId=33&status=false
  setStatus(jobAdvertisementId, employerId, status) {
    return axios.get(
      `http://localhost:8080/api/jobAdvertisements/setStatus?jobAdvertisementId=${jobAdvertisementId}&employerId=${employerId}&status=${status}`
    );
  }


  getByIsActiveTrueOrderByReleaseDateDesc() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getByIsActiveTrueOrderByReleaseDateDesc");
  }
}
