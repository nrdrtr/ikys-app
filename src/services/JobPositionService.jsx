import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/ispozisyonu/api/job-positions'; 

export default class JobPositionService {


  getJobPositions(page, size) {
    return axios.get(API_BASE_URL, {
      params: {
        page: page,
        size: size
      }
    });
  }
  
  getJobPositionById(id) {
    return axios.get(`http://localhost:8080/api/ispozisyonu/getBy/${id}`);
  }

  addJobPosition(values) {
    return  axios.post('http://localhost:8080/api/ispozisyonu/add', values)
  }
           
  getAll() {
    return axios.get(`http://localhost:8080/api/ispozisyonu/getall`);
  }


  getJobPositionsByPage(page, size) {
    return axios.get(`http://localhost:8080/api/ispozisyonu/pageable?page=${page}&size=${size}`);
                   
  }
}
 






 
