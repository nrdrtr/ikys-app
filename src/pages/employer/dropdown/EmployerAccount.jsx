import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
 
import ImageService from "../../../services/ImageService";
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

export default function EmployerAccount() {
  const employer = useSelector((state) => state.auth.employer);
  const imageService = new ImageService();
  const [loading, setLoading] = useState(false);
  const [ employerImage, setEmployerImage ] = useState('');

  useEffect(() => {
    const fetchJobSeekerImage = async () => {
      try {
        const response = await imageService.getByUserId(employer.id);
        if (response.data && response.data.data.imageUrl) {
          setEmployerImage(response.data.data.imageUrl);
        } else {
          setEmployerImage('https://www.w3schools.com/howto/img_avatar.png');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      await fetchJobSeekerImage();
    };

    fetchData();
  }, [employer.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderJobSeekerImage = () => {
    if (employerImage) {
      return <img src={employerImage} alt="Job Seeker Avatar" className="rounded-circle img-fluid" />;
    } else {
      return <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Default Avatar" className="rounded-circle img-fluid" />;
    }
  };


  return (

    <div className="container" style={{ height: '60vh', marginTop: '10px' }}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="row" style={{ marginBottom: '10px' }}>
            <div className="col-md-4">
              <Link to = '/update-employer-account'>
              <button className="btn btn-success float-start">Profili Düzenle</button>
           </Link> </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  {renderJobSeekerImage()}
                </div>
                <div className="col-md-8">
                  <div className="mb-4">
                    <table className="table table-bordered2">
                      <tbody>


                        <tr>
                          <th scope="row" className="text-dark">Şirket Adı:</th>
                          <td>{employer.companyName}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-dark">E Posta:</th>
                          <td>{employer.email}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-dark">Website:</th>
                          <td>{employer.website}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-dark">Telefon Numarası:</th>
                          <td>{employer.phoneNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}
