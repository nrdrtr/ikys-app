import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Card, Icon } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import LanguageService from '../../services/LanguageService';
import { styled } from 'styled-components';
 
const EmployeeLanguageAdd = () => {
  const jobseeker = useSelector((state) => state.auth.jobSeeker);

  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({
    languageLevel: 0,
    languageId: 0,
    curriculumVitaeId: 69,
    jobSeekerId: jobseeker.id
  });

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languageService = new LanguageService();
        const response = await languageService.getAll();
        setLanguages(response.data.data);
      } catch (error) {
        console.error('Diller alınırken hata oluştu:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/employeelanguages/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Dil eklendi');
          console.log(response);
        } else {
          toast.error('Gerekli alanları doldurun');
          console.error('Hata:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Hata:', error);
      });
  };

  return (
    <Container className="main">
    <Card fluid style={{ backgroundColor: '#FBF7E4' }}>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Card.Header>
            <h1 style={{ margin: "0.2em" }}> Yabancı Dil Ekle</h1>
          </Card.Header>

          <Card.Content style={{ textAlign: 'left' }}>
            <Form.Field>
              <label> Yabancı Dil Adı</label>
              <select
                name="languageLevel"
                value={formData.languageLevel}
                onChange={handleInputChange}
              >
                <option value={0}>Seçiniz</option>
                <option value={1}>Başlangıç</option>
                <option value={2}>Orta</option>
                <option value={3}>İyi</option>
                <option value={4}>Çok İyi</option>
                <option value={5}>Ana Dil</option>
              </select>
            </Form.Field>

            <Form.Field>
              <label>Yabancı Dil Seviyesi</label>
              <select
                name="languageId"
                value={formData.languageId}
                onChange={handleInputChange}
              >
                <option value={0}>Seçiniz</option>
                {languages.map((language) => (
                  <option value={language.id} key={language.id}>
                    {language.languageName}
                  </option>
                ))}
              </select>
            </Form.Field>
          </Card.Content>

          <Card.Content>
          <Button
                style={{ margin: "0.5em" }}
                type="submit"
                floated="right"
                icon
                labelPosition="right"
                color="green"
              >
                Ekle <Icon name="add" />
              </Button>
          </Card.Content>
        </Form>
      </Card.Content>
    </Card>
  </Container>
  );
};

export default EmployeeLanguageAdd;
