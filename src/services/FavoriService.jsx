import axios from "axios";

export default class FavoriServis {
  getFavoriteByJobSeekerId(id) {
    return axios.get("http://localhost:8080/api/favori/getFavoriteByIsArayanId?id={id}");
  }


  //http://localhost:8080/api/favori/save
  addFavorite(favori) {
    return axios.post("http://localhost:8080/api/favori/save", favori);
  }
        

}
