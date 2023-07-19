import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Container } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast module
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ApplicationService from '../../../services/ApplicationService';

const EmployerNotifications = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const employer = useSelector((state) => state.auth.employer);

  let applicationService = new ApplicationService();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (approved) {
      toast.success('Başvuru Onaylandı'); 
      setApproved(false);
    }
    if (rejected) {
      toast.error('Başvuru Reddedildi');  
      setRejected(false);
    }
  }, [approved, rejected]);

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getApplicationsByEmployerId(employer.id);
      setBasvurular(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveToJobAdvertisement = async (applicationId) => {
    try {
      const response = await applicationService.approveToJobAdvertisement(applicationId);
      if (response.data) {
        setApproved(true);
        fetchApplications(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectToJobAdvertisement = async (applicationId) => {
    try {
      const response = await applicationService.rejectToJobAdvertisement(applicationId);
      if (response.data) {
        setRejected(true);
        fetchApplications();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container textAlign="center"  style={{ height: '75vh', margin: '20px', backgroundColor: "#FBF7E4" }} >
      <h2 style={{ marginBottom: '20px',marginRight: '200px' }}>Bildirimlerim</h2>
      <Card.Group>
        {basvurular.map((basvuru) => (
          <Card key={basvuru.id}>
            <Card.Content>
              <Link to={`/jobSeekerPage/${basvuru.jobSeeker.id}`}>
                <Card.Header>{basvuru.jobSeeker.name} {basvuru.jobSeeker.surname}</Card.Header>
              </Link>
              <Card.Description style = {{color : 'black'}}>Başvurduğu İlanınız: {basvuru.jobAdvertisement.jobPosition.jobName}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button positive onClick={() => approveToJobAdvertisement(basvuru.id)}>Onayla</Button>
              <Button negative onClick={() => rejectToJobAdvertisement(basvuru.id)}>Reddet</Button>
              <ToastContainer /> 
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default EmployerNotifications;