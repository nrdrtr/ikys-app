import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Form, Input, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployerService from '../../../services/EmployerService';
import AddToImage from '../../../components/addToImage';
 

export default function UpdateEmployerAccount() {
  const history = useHistory();
  const employer = useSelector((state) => state.auth.employer);

  const [employerData, setEmployerData] = useState({
    email: '',
    companyName: '',
    website: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setEmployerData(employer);
  }, [employer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let employerService = new EmployerService();

    try {
      const result = await employerService.updateEmployer(employer.id, employerData);
      
        toast.success('Profil güncellendi.');
        history.push(`/employeraccount/${employer.id}`);
                            
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <Container style={{ height: '75vh', marginTop: '15px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Hesabını Güncelle</h2>
            <AddToImage id ={employer.id}/>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>E-posta</label>
                <Input type="email" name="email" value={employerData.email} onChange={handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Şirket Adı</label>
                <Input
                  type="text"
                  name="companyName"
                  value={employerData.companyName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Web Sitesi</label>
                <Input type="text" name="website" value={employerData.website} onChange={handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Telefon Numarası</label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={employerData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button primary type="submit">
                Güncelle
              </Button>
              <ToastContainer />
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}