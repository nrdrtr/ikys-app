import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CityService from '../../services/CityService';
import WorkTypesService from '../../services/WorkTypesService';
import JobPositionService from '../../services/JobPositionService';
import { Container, Form, Button, Checkbox, Card } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

const JobAdvertisementAdd = () => {
  const employer = useSelector((state) => state.auth.employer);

  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);

  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const jobPositionService = new JobPositionService();
        const response = await jobPositionService.getAll();
        setJobPositions(response.data.data);
      } catch (error) {
        console.error('İş pozisyonları alınırken hata oluştu:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const cityService = new CityService();
        const response = await cityService.getAll();
        setCities(response.data.data);
      } catch (error) {
        console.error('Şehirler alınırken hata oluştu:', error);
      }
    };

    const fetchWorkingTypes = async () => {
      try {
        const workingTypeService = new WorkTypesService();
        const response = await workingTypeService.getAll();
        const formattedWorkingTypes = response.data.data.map((wt) => ({
          id: wt.id,
          name: wt.name
        }));
        setWorkingTypes(formattedWorkingTypes);
      } catch (error) {
        console.error('Çalışma tipleri alınırken hata oluştu:', error);
      }
    };

    fetchJobPositions();
    fetchCities();
    fetchWorkingTypes();
  }, []);

  const [formData, setFormData] = useState({
    employerId: employer.id,
    jobPositionId: 0,
    cityId: 0,
    salary: 0,
    numberOfOpenPositions: 0,
    releaseDate: '',
    endDate: '',
    explanation: '',
    active: true,
    workTime: '',
    workType: 0
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/jobAdvertisements/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          toast.success('İş ilanı eklendi');
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
              <h1 style={{ margin: '0.2em' }}>İş İlanı Oluştur</h1>
            </Card.Header>

            <Card.Content style={{ textAlign: 'left' }}>
              <Form.Field>
                <label>İş Pozisyonu</label>
                <select
                  name="jobPositionId"
                  value={formData.jobPositionId}
                  onChange={handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  {jobPositions.map((jp) => (
                    <option value={jp.id} key={jp.id}>
                      {jp.jobName}
                    </option>
                  ))}
                </select>
              </Form.Field>

              <Form.Field>
                <label>Şehir</label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  {cities.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.cityName}
                    </option>
                  ))}
                </select>
              </Form.Field>

         

              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px' }}>
                <Form.Field>
               
                <label>Maaş Bilgisi</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
              
              </Form.Field>
                </div>
               
                <div style={{ marginRight: '10px' }}>
                  <Form.Field>
                    <label>Son Başvuru Tarihi</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <Form.Field>
                    <label>Pozisyon Sayısı</label>
                    <input
                      type="number"
                      name="numberOfOpenPositions"
                      value={formData.numberOfOpenPositions}
                      onChange={handleInputChange}
                    />
                  </Form.Field>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <Form.Field>
                    <label>Çalışma Türü</label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleInputChange}
                    >
                      <option value="">Seçiniz</option>
                      {workingTypes.map((wt) => (
                        <option value={wt.name} key={wt.id}>
                          {wt.name}
                        </option>
                      ))}
                    </select>
                  </Form.Field>
                </div>
                <div> <p><p><p></p></p></p>
                  <Form.Field>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <p><p></p></p>
                      <label style={{ marginTop: '20px' ,marginLeft: '10px', color:'black' }}>Aktiflik Durumu</label>
                      <Checkbox
                        label=""
                        name="active"
                        style={{ marginTop: '22px' ,marginLeft:'10px'}}
                        checked={formData.active}
                        onChange={(_, data) => setFormData({ ...formData, active: data.checked })}
                      />
                    </div>
                  </Form.Field>

                </div>
              </div><p><p></p></p>
<p><p></p></p>
<p></p>
              <Form.Field>
                <label> İlan Açıklaması</label>
                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleInputChange}
                ></textarea>
              </Form.Field>
            </Card.Content>
             
<p><p></p></p><p></p>
            <Card.Content>
              <Button color="green" type="submit">
                İlanı Yayınla
              </Button>
            </Card.Content>
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default JobAdvertisementAdd;
