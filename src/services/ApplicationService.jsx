import axios from 'axios';

class ApplicationService {
  constructor() {
    this.baseUrl = 'http://localhost:8080/api/applications';
  }

  applyToJobAdvertisement(jobSeekerId, jobAdvertisementId) {
    const url = `${this.baseUrl}/apply`;
    const data = {
      jobSeekerId: jobSeekerId,
      jobAdvertisementId: jobAdvertisementId
    };

    return axios.post(url, data);
  }

  approveToJobAdvertisement(applicationId) {
    const url = `${this.baseUrl}/approve/${applicationId}`;
    return axios.put(url);
  }

  rejectToJobAdvertisement(applicationId) {
    const url = `${this.baseUrl}/reject/${applicationId}`;
    return axios.put(url);
  }



  getApplicationsByEmployerId(employerId) {//http://localhost:8080/api/applications/employerId/33
    return axios.get(`http://localhost:8080/api/applications/employerId/${employerId}`);

  }


}

export default ApplicationService;
