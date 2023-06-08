import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EmployerService from '../../../services/EmployerService';
import { useHistory } from 'react-router-dom';
import ImageService from '../../../services/ImageService';

 
export default function EmployerAccount() {
  let { id } = useParams();
  const history = useHistory();

  const [employer, setEmployer] = useState({
    email: '',
    companyName: '',
    website: '',
    phoneNumber: '',
    userId: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getByEmployerId(id).then((result) => {
      setEmployer(result.data);
    });
  }, [id]);

  useEffect(() => {
    let imageService = new ImageService();
    imageService.getByUserId(id).then((result) => {
      setImage(result.data);
    });
  }, [id]);

  const handleUpdateAccount = () => {
    history.push('/update-employer-account');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary" onClick={handleUpdateAccount}>
              Update Information
            </button>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  {image && image.data && image.data.imageUrl ? (
                    <img src={image.data.imageUrl} alt="Company Logo" className="img-fluid" />
                  ) : (
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Default Avatar" className="img-fluid" />
                  )}
                </div>
                <div className="col-md-8">
                  <p className="card-text">
                    <strong>Email:</strong> {employer.email}
                  </p>
                  <p className="card-text">
                    <strong>Company Name:</strong> {employer.companyName}
                  </p>
                  <p className="card-text">
                    <strong>Website:</strong> <a href={`https://${employer.website}`}>{employer.website}</a>
                  </p>
                  <p className="card-text">
                    <strong>Phone Number:</strong> {employer.phoneNumber}
                  </p>
                  <p className="card-text">
                    <strong>User ID:</strong> {employer.userId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
