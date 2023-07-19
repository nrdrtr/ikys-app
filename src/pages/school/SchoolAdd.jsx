import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Input, Select, Card, Icon } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SchoolAdd = () => {
  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const jobSeeker = useSelector((state) => state.auth.jobSeeker);

  const [formData, setFormData] = useState({
    jobSeekerId: jobSeeker.id,
    curriculumVitaeId: 68,
    schoolId: 0,
    departmentId: 0,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/okullar/getall');
        setSchools(response.data);
      } catch (error) {
        console.error('Okullar alınırken hata oluştu:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bolumler/getall');
        setDepartments(response.data.data);
      } catch (error) {
        console.error('Bölümler alınırken hata oluştu:', error);
      }
    };

    fetchSchools();
    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/education/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Okul bilgisi eklendi');
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
        <Card.Header>
              <h1 style={{ margin: "0.2em" }}> Eğitim Bilgisi Ekle</h1>
            </Card.Header>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label style={{ textAlign: 'left' }}>Okul Adı</label>
              <Form.Select
                name="schoolId"
                value={formData.schoolId}
                onChange={handleInputChange}
                placeholder="Seçiniz"
                options={schools.map((school) => ({
                  key: school.id,
                  value: school.id,
                  text: school.schoolName
                }))}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: 'left' }}>Bölüm</label>
              <Form.Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleInputChange}
                placeholder="Seçiniz"
                options={departments.map((department) => ({
                  key: department.id,
                  value: department.id,
                  text: department.departmentName
                }))}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: 'left' }}>Başlangıç Tarihi</label>
              <Form.Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: 'left' }}>Bitiş Tarihi</label>
              <Form.Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </Form.Field>

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
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default SchoolAdd;
