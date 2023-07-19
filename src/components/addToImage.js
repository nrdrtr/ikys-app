import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Input, Button } from 'semantic-ui-react';

const AddToImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const employer = useSelector((state) => state.auth.employer);
  const jobseeker = useSelector((state) => state.auth.jobSeeker);
  const jobseekerLoggedIn = useSelector((state) => state.auth.jobseekerLoggedIn);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Lütfen bir resim dosyası seçin.');
      return;
    }

    const formData = new FormData();
    const kullaniciId = jobseekerLoggedIn ? jobseeker.id : employer.id;

    formData.append('kullaniciId', kullaniciId);
    formData.append('file', selectedFile);

    axios
      .post(`http://localhost:8080/api/resimler/upload/${kullaniciId}`, formData)
      .then((response) => {
        console.log(response.data);  
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="file" style={{ textAlign: 'left', color:'black' }}>Resim Dosyası:</label>
          <Input type="file" id="file" accept="image/*" onChange={handleFileChange} />
        </Form.Field>
        {/* <Button type="submit">Yükle</Button> */}
      </Form>
    </div>
  );
};

export default AddToImage;