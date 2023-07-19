import axios from "axios";
 
export default class FavoriServis {
  getFavoriteByJobSeekerId(id) {
    return axios.get(`http://localhost:8080/api/favori/getFavoriteByIsArayanId?id=${id}`);
  }


  addFavorite(jobAdvertisementId, jobSeekerId) {
    return axios.post("http://localhost:8080/api/favori/addFavorite", { jobAdvertisementId, jobSeekerId });
  }


  deleteFavorite(id) { 
    return axios.delete(`http://localhost:8080/api/favori/delete?id=${id}`);
  }
  
        

}
