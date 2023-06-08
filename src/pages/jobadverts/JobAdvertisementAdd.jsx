import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
 import CityService from '../../services/CityService';

const JobPostingForm = () => {
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [city, setCity] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [openPositions, setOpenPositions] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Şehir verilerini API'den al
    const fetchCities = async () => {
      try {
        const response = await CityService.getAll();
        setCities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      jobPosition,
      jobDescription,
      city,
      salaryMin,
      salaryMax,
      openPositions,
      applicationDeadline,
    };
    console.log(formData);
    // İş ilanı verilerini sunucuya gönderme veya işleme adımlarını burada gerçekleştirebilirsiniz.

    // Form alanlarını sıfırlama
    setJobPosition('');
    setJobDescription('');
    setCity('');
    setSalaryMin('');
    setSalaryMax('');
    setOpenPositions('');
    setApplicationDeadline('');
  };

  return (
    <Container style={{ marginTop: '3em' , backgroundColor: "#FBF7E4"}}  >
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Genel İş Pozisyonu:</label>
        <select
          value={jobPosition}
          onChange={(event) => setJobPosition(event.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          <option value="Java Developer">Java Developer</option>
          <option value="C# Developer">C# Developer</option>
        </select>
      </Form.Field>

      <Form.Field>
        <label>İş Tanımı:</label>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          required
        />
      </Form.Field>

      <Form.Field>
        <label>Şehir:</label>
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          required
        >
          <option value="">Seçiniz</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </Form.Field>

      <Form.Field>
        <label>Maaş Skalası (Opsiyonel):</label>
        <input
          type="number"
          value={salaryMin}
          onChange={(event) => setSalaryMin(event.target.value)}
        />
        {' - '}
        <input
          type="number"
          value={salaryMax}
          onChange={(event) => setSalaryMax(event.target.value)}
        />
      </Form.Field>

      <Form.Field>
        <label>Açık Pozisyon Adedi:</label>
        <input
          type="number"
          value={openPositions}
          onChange={(event) => setOpenPositions(event.target.value)}
          required
        />
      </Form.Field>

      <Form.Field>
        <label>Son Başvuru Tarihi:</label>
        <input
          type="date"
          value={applicationDeadline}
          onChange={(event) => setApplicationDeadline(event.target.value)}
          required
        />
      </Form.Field>

      <Button type="submit">İş İlanı Ekle</Button>
    </Form>
</Container>
  );
};

export default JobPostingForm;
