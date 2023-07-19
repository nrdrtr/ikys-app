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

      console.log(response);

      if (response && response.status === 201) {
        toast.success('Kayıt işlemi başarılı oldu! Lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayarak hesabınızı aktifleştirin.');
        history.push('/email-sent'); // Redirect to EmailSentPage
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
        <h2 className="text-center mb-5">İş Arayan Kayıt Ol</h2>
      </div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <form onSubmit={handleSubmit}>
            <div className='d-flex flex-column'>
            <div className='d-flex'>
              <div className='me-2'>
                <p htmlFor='name' style={{ textAlign: 'left' ,marginBottom: '0px'}}>Adınız</p>
                <MDBInput
                  wrapperClass='mb-4'
                  size='lg'
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p htmlFor='surname' style={{ textAlign: 'left',marginBottom: '0px' }}>Soyadınız</p>
                <MDBInput
                  wrapperClass='mb-4'
                  size='lg'
                  id='surname'
                  type='text'
                  name='surname'
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>

              <label htmlFor='email'style={{ textAlign: 'left' }}>E-posta adresi</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor='identityNumber' style={{ textAlign: 'left' }}>TC Kimlik Numarası</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='identityNumber'
                type='text'
                name='identityNumber'
                value={formData.identityNumber}
                onChange={handleChange}
              />

              <label htmlFor='birthDate' style={{ textAlign: 'left' }}>Doğum Tarihi</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='birthDate'
                type='date'
                name='birthDate'
                value={formData.birthDate}
                onChange={handleChange}
              />

              <label htmlFor='password' style={{ textAlign: 'left' }}>Şifre</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />

              <label htmlFor='passwordAgain' style={{ textAlign: 'left' }}>Şifre Tekrarı</label>
              <MDBInput
                wrapperClass='mb-4'
                size='lg'
                id='passwordAgain'
                type='password'
                name='passwordAgain'
                value={formData.passwordAgain}
                onChange={handleChange}
              />
            </div>

            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' onClick={handleSubmit}>Kayıt Ol</MDBBtn>
          </form>
          Hesabın var mı? <a href='/jobseeker/login'>Giriş Yap</a>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}

export default JobSeekerRegister;




































// import React, { useState } from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,

// } from 'mdb-react-ui-kit';
// import JobSeekerService from '../../../services/JobSeekerService';
// import { useHistory } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

// function JobSeekerRegister() {

//   const history = useHistory();
//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     birthDate: '',
//     identityNumber: '',
//     password: '',
//     passwordAgain: '',
//     email: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let jobSeekerService = new JobSeekerService();
//       let response = await jobSeekerService.registerJobSeeker(formData);

//       console.log(response);

     
//       if (response && response.status === 201) {
//         toast.success('Kayıt işlemi başarılı oldu! Lütfen e-posta adresinize gönderilen aktivasyon linkine tıklayarak hesabınızı aktifleştirin.');
//         history.push('/email-sent'); // Redirect to EmailSentPage
//       } else {
//         toast.error('Kayıt işlemi başarısız oldu.');  
//       }

//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error('Bir hata oluştu.');
//       }
//     }
//   };
//   const styles = {
//     labelWrapper: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-start',
//       marginBottom: '1rem',
//     },
//     label: {
//       marginBottom: '0.25rem',
//     },
//   };



//   return (

//     <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
       
//       <MDBCard className='m-5' style={{ maxWidth: '600px' }}>  
       
     
//         <MDBCardBody className='px-5'> <h2 className="text-center mb-5">İş Arayan Kayıt Ol</h2>
//           <form onSubmit={handleSubmit}>
          
//           <div style={styles.labelWrapper}><div className='d-flex'>
            
//             <label htmlFor='name' >Adınız</label>
//               <MDBInput
//                 wrapperClass='mb-4 me-2'
//                 label='Ad'
//                 size='lg'
//                 id='name'
//                 type='text'
//                 name='name'
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//              <label htmlFor='surname'>Soyadınız</label>
//               <MDBInput
//                 wrapperClass='mb-4'
//                 label='Soyad'
//                 size='lg'
//                 id='surname'
//                 type='text'
//                 name='surname'
//                 value={formData.surname}
//                 onChange={handleChange}
//               />
//               </div>
           
//             <label htmlFor='mail'>E Posta Adresiniz</label>
//             <MDBInput
//               wrapperClass='mb-4'
//               label='E-posta'
//               size='lg'
//               id='email'
//               type='email'
//               name='email'
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <label>Kimlik Bilgileriniz</label>
//             <MDBInput
//               wrapperClass='mb-4'
//               label='TC Kimlik Numarası'
//               size='lg'
//               id='identityNumber'
//               type='text'
//               name='identityNumber'
//               value={formData.identityNumber}
//               onChange={handleChange}
//             />
//             <label>Doğum Tarihiniz</label>
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Doğum Tarihi'
//               size='lg'
//               id='birthDate'
//               type='date'
//               name='birthDate'
//               value={formData.birthDate}
//               onChange={handleChange}
//             />
//             <label>Şifreniz</label>
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Şifre'
//               size='lg'
//               id='password'
//               type='password'
//               name='password'
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <label>Şifreniz Tekrar</label>
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Şifre Tekrarı'
//               size='lg'
//               id='passwordAgain'
//               type='password'
//               name='passwordAgain'
//               value={formData.passwordAgain}
//               onChange={handleChange}
//             />
//             <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' onClick={handleSubmit}>Kayıt Ol</MDBBtn>
//            </div> </form>
        
//           Hesabın var mı? <a href='/jobseeker/login'>Giriş Yap</a>
//         </MDBCardBody>
//       </MDBCard>
//       <ToastContainer />
      
//     </MDBContainer>
    

//   );
// }

// export default JobSeekerRegister;