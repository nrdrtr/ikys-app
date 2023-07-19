import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import EmployerService from './../../../services/EmployerService';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function EmployerRegister() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordAgain: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let employerService = new EmployerService();
      let response = await employerService.registerEmployer(formData);
      console.log(response);

      if (response && response.status === 201) {
        toast.success('Kayıt işlemi başarılı oldu! Lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayarak hesabınızı aktifleştirin.');
        history.push('/email-sent');
      } else {
        toast.error('Kayıt işlemi başarısız oldu.');
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Bir hata oluştu.');
      }
    }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'>
        <h2 className="text-center mb-5">İşveren Kayıt Ol</h2>
      </div>
      <MDBCard className='m-5' style={{ maxWidth: '800px' }}>
        <MDBCardBody className='px-5'>
          <form onSubmit={handleSubmit}>
            <MDBRow className='mb-4'>
              <MDBCol size='6'>
              <p htmlFor='name' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>Şirket Adı</p>
                <MDBInput
                 
                  size='lg'
                  id='companyName'
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </MDBCol>
              <MDBCol size='6'>
              <p htmlFor='name' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>Web Adresi</p>
                <MDBInput
                 
                  size='lg'
                  id='website'
                  type='text'
                  name='website'
                  value={formData.website}
                  onChange={handleChange}
                />
              </MDBCol>
            </MDBRow>
            <p htmlFor='email' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>E-Posta Adresiniz</p>
            <MDBInput
              wrapperClass='mb-4'
             
              size='lg'
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <p htmlFor='phoneNumber' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>Telefon Numaranız</p>
            <MDBInput
              wrapperClass='mb-4'
              
              size='lg'
              id='phoneNumber'
              type='text'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <p htmlFor='password' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>Hesap Şifreniz</p>
            <MDBInput
              wrapperClass='mb-4'
            
              size='lg'
              id='password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <p htmlFor='passwordAgain' style={{ textAlign: 'left' ,marginBottom: '0px', color:'black'}}>Hesap Şifreniz (Tekrar)</p>
            <MDBInput
              wrapperClass='mb-4'
            
              size='lg'
              id='passwordAgain'
              type='password'
              name='passwordAgain'
              value={formData.passwordAgain}
              onChange={handleChange}
            />
            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Kayıt Ol</MDBBtn>
          </form>
          Hesabın var mı? <a href='/jobseeker/login'>Giriş Yap</a>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}

export default EmployerRegister;
