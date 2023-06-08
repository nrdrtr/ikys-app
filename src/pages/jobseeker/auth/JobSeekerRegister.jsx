import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,

} from 'mdb-react-ui-kit';
import JobSeekerService from '../../../services/JobSeekerService';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function JobSeekerRegister() {
  const notify = () => toast(
    'Kayıt işlemi başarılı! Lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayarak hesabınızı aktifleştirin.'
  );
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    identityNumber: '',
    password: '',
    passwordAgain: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let jobSeekerService = new JobSeekerService();
      let response = await jobSeekerService.registerJobSeeker(formData);
  
      console.log(response); // Log the successful response
  
      // Check if the registration was successful
      if (response.success) {
        toast.success('Kayıt işlemi başarılı! Lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayarak hesabınızı aktifleştirin.');
        history.push('/email-sent'); // Redirect to EmailSentPage
      } else {
        toast.error('Kayıt işlemi başarısız oldu.'); // Show error message for unsuccessful registration
      }
    } catch (error) {
      console.error(error); // Log the error
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Bir hata oluştu.');
      }
    }
  };
  


  return (

    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">İŞ ARAYAN KAYIT</h2>
          <form onSubmit={handleSubmit}>
            <div className='d-flex'>
              <MDBInput
                wrapperClass='mb-4 me-2'
                label='Ad'
                size='lg'
                id='name'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Soyad'
                size='lg'
                id='surname'
                type='text'
                name='surname'
                value={formData.surname}
                onChange={handleChange}
              />
            </div>

            <MDBInput
              wrapperClass='mb-4'
              label='E-posta'
              size='lg'
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='TC Kimlik Numarası'
              size='lg'
              id='identityNumber'
              type='text'
              name='identityNumber'
              value={formData.identityNumber}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Doğum Tarihi'
              size='lg'
              id='birthDate'
              type='date'
              name='birthDate'
              value={formData.birthDate}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Şifre'
              size='lg'
              id='password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Şifre Tekrarı'
              size='lg'
              id='passwordAgain'
              type='password'
              name='passwordAgain'
              value={formData.passwordAgain}
              onChange={handleChange}
            />
            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' onClick={notify}>Kayıt Ol</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>

  );
}

export default JobSeekerRegister;