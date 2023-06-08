import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/resimler';

export default class ImageService {


   uploadImage(file, kullaniciId) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${BASE_URL}/upload/${kullaniciId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }


   getByUserId(userId) {
    return axios.get(`http://localhost:8080/api/resimler/getByUserId?userId=43`);
  }//${BASE_URL}/getByUserId?userId=${userId}
}


 
