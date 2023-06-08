import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import EmployerService from '../../../services/EmployerService';
import { Container } from 'semantic-ui-react';

export default function UpdateEmployerAccount() {
  const history = useHistory();

  const [employer, setEmployer] = useState({
    email: '',
    companyName: '',
    website: '',
    phoneNumber: '',
    userId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let employerService = new EmployerService();
    employerService.updateEmployer(employer).then((result) => {
      // Handle success or error case
      // You can redirect to another page or display a notification message
      history.push('/employer-account');
    });
  };

  return (
    <Container>
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Update Employer Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={employer.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={employer.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                className="form-control"
                name="website"
                value={employer.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={employer.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
    </Container>
  );
}
