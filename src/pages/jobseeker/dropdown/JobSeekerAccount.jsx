import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ImageService from '../../../services/ImageService';
import { Button, Container, Form, Icon, Input } from 'semantic-ui-react';
import AddToImage from './../../../components/addToImage';

export default function JobSeekerAccount() {
  const jobSeeker = useSelector((state) => state.auth.jobSeeker);
  const imageService = new ImageService();
  const [loading, setLoading] = useState(false);
  const [jobSeekerImage, setJobSeekerImage] = useState(null);
  const [formData, setFormData] = useState({
    name: jobSeeker.name,
    surname: jobSeeker.surname,
    email: jobSeeker.email,
    identityNumber: jobSeeker.identityNumber,
    birthDate: jobSeeker.birthDate
  });

  useEffect(() => {
    const fetchJobSeekerImage = async () => {
      try {
        const response = await imageService.getByUserId(jobSeeker.id);
        if (response.data && response.data.data.imageUrl) {
          setJobSeekerImage(response.data.data.imageUrl);
        } else {
          setJobSeekerImage('https://www.w3schools.com/howto/img_avatar.png');
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
  }, [jobSeeker.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Güncelleme işlemleri burada gerçekleştirilebilir
    console.log("Profil güncellendi:", formData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderJobSeekerImage = () => {
    if (jobSeekerImage) {
      return <img src={jobSeekerImage} alt="Job Seeker Avatar" className="rounded-circle img-fluid" />;
    } else {
      return <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Default Avatar" className="rounded-circle img-fluid" />;
    }
  };

  return (
    <Container style={{ height: '100vh', marginTop: '10px', width :'30%'}}>
      <h2>Hesabını Güncelle</h2>
      <p></p>
       
      <Form  >
        <AddToImage></AddToImage>
      </Form  >

      <div style={{ display: 'flex', justifyContent: 'space-around'}}>
    <Form>
      <Form.Field>
        <label htmlFor="name" style={{ textAlign: 'left', color: 'black' }}>Adı:</label>
        <Input type="text" id="name" name="name" onChange={handleInputChange} />
      </Form.Field>
    </Form>
    <Form>
      <Form.Field>
        <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>Soyadı:</label>
        <Input type="text" id="surname" name="surname" onChange={handleInputChange} />
      </Form.Field>
    </Form>
  </div>

  
      <Form>
        <Form.Field  >
          <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>Doğum Tarihi:</label>
          <Input type='date'    id="name" name="name"   onChange={handleInputChange} />
        </Form.Field>
      </Form>
      <Form>
        <Form.Field  >
          <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>E Posta:</label>
          <Input type="mail"   id="name" name="name"   onChange={handleInputChange} />
        </Form.Field>
      </Form>
      <Form>
        <Form.Field  >
          <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>T.C. Kimlik Numarası:</label>
          <Input type="text"   id="name" name="name"   onChange={handleInputChange} />
        </Form.Field>
      </Form>
      <Form>
        <Form.Field  >
          <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>Şifre:</label>
          <Input type='password'    id="name" name="name"   onChange={handleInputChange} />
        </Form.Field>
      </Form>
      <Form>
        <Form.Field  >
          <label htmlFor="file" style={{ textAlign: 'left', color: 'black' }}>Şifre Tekrar:</label>
          <Input type='password'   id="name" name="name"   onChange={handleInputChange} />
        </Form.Field>
      </Form>
<p></p>
      <ToastContainer />
      <Button   type="submit" color="green" onClick={handleUpdateProfile}>
      Güncelle
     </Button>
    </Container>


  );
}
