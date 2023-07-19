import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Container, Divider, Card, Image, Grid, Icon } from 'semantic-ui-react';
import EmployerService from '../../services/EmployerService';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ImageService from '../../services/ImageService';

const EmployerPage = () => {
  const { id } = useParams();
  const [employer, setEmployer] = useState({});
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [image, setImage] = useState('');
  const employerService = new EmployerService();
  const imageService = new ImageService();

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await employerService.getByEmployerId(id);
        if (response.data && response.data) {
          setEmployer(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchJobAdvertisements = async () => {
      try {
        const response = await employerService.getJobAdvertisementsByEmployerId(id);
        if (response.data && response.data) {
          setJobAdvertisements(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmployerImage = async () => {
      try {
        const response = await imageService.getByUserId(id);
        if (response.data && response.data.data && response.data.data.imageUrl) {
          setImage(response.data.data.imageUrl);
        } else {
          setImage('https://www.w3schools.com/howto/img_avatar.png');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployer();
    fetchJobAdvertisements();
    fetchEmployerImage();
  }, [id]);

  return (
    <Container>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" textAlign="center" style={{ color: 'black' }}>
              İşveren Detay Sayfası
            </Header>
            <Divider />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Header as="h2" style={{ color: 'black' }}>
              Şirket Bilgileri
            </Header>
            <Card fluid>
              <Image src={image} size="small" centered />
              <Card.Content>
                
                <Card.Header>{employer.companyName}</Card.Header>
                <Card.Meta>
                  <Icon name="map marker alternate" />
                  İSTANBUL
                </Card.Meta>
                <Card.Description>
                 
                  <strong>Web Sitesi:</strong> <a href={employer.website}>{employer.website}</a><br />
                  <strong>E-posta:</strong> {employer.email}<br />
                   <strong>Telefon Numarası:</strong> {employer.phoneNumber}<br />
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h2" textAlign="center" style={{ color: 'black' }}>
              {employer.companyName} İş İlanları
            </Header>
            <Card.Group itemsPerRow={3}>
              {jobAdvertisements.map(advertisement => (
                <Card
                key={advertisement.id}
                to={`/ispozisyonlari/${advertisement.id}`}
              >
                <Card.Content>
                  <Card.Meta style={{ color: 'black' }}>{advertisement.jobPosition?.jobName}</Card.Meta>
                </Card.Content>
              </Card>
              
              ))}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default EmployerPage;
