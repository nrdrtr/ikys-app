import axios from "axios";

export default class JobAdvertisementService {
  getJobAdvertisements() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
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


  getByIsActiveTrueOrderByReleaseDateDesc() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisements/getByIsActiveTrueOrderByReleaseDateDesc");
  }
}
