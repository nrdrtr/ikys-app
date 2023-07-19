import React, { useState, useEffect } from 'react';
import { 
  Divider, 
  Header, 
  Grid, 
  Card, 
  Icon, 
  Container, 
  Button, 
  Image, 
  Popup 
} from 'semantic-ui-react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import ApplicationService from '../../services/ApplicationService';
import FavoriService from "../../services/FavoriService";
import 'react-toastify/dist/ReactToastify.css';

const JobAdvertisementDetail = () => {
  const [jobAdvertDetail, setJobAdvertDetail] = useState(null);
  const [similarJobAdverts, setSimilarJobAdverts] = useState([]);
  const { id } = useParams();

  const { jobseekerLoggedIn, employerLoggedIn } = useSelector((state) => state.auth);
  const jobseeker = useSelector((state) => state.auth.jobSeeker);
  const employer = useSelector((state) => state.auth.employer);
  const applicationService = new ApplicationService();
  let jobPostingService = new JobAdvertisementService();

  useEffect(() => {
    jobPostingService.getJobAdvertisementById(id).then((result) => {
      setJobAdvertDetail(result.data.data);
    });

    jobPostingService.getByIsPozisyonId(id).then((result) => {
      setSimilarJobAdverts(result.data);
    });
  }, [id]);

  const addFavorite = (jobAdvertisementId, jobSeekerId) => {
    let favoriService = new FavoriService();
    favoriService.addFavorite(jobAdvertisementId, jobSeekerId).then((result) => {
      toast.success(result.data.message);
    }).catch((result) => {
      toast.error(result.response.data.message);
    })
  }

  const handleFavorite = (jobAdvertisementId) => {
    addFavorite(jobAdvertisementId, jobseeker.id);
  };

  const handleApply = () => {
    if (jobseekerLoggedIn && jobAdvertDetail) {
      const jobSeekerId = jobseeker.id;
      const jobAdvertisementId = jobAdvertDetail.id;

      applicationService
        .applyToJobAdvertisement(jobSeekerId, jobAdvertisementId)
        .then(() => {
          toast.success('Başvuru yapıldı');
        })
        .catch((error) => {
          toast.error('Başvuru sırasında bir hata oluştu');
          console.error(error);
        });
    } else {
      toast.info('Başvurmak için giriş yapınız');
    }
  };

  const renderActionButton = () => {
    if (jobseekerLoggedIn) {
      return (
        <Button color="green" onClick={handleApply}>
          Başvur
        </Button>
      );
    } else if (employerLoggedIn && jobAdvertDetail && employer.id === jobAdvertDetail.employer.id) {
      return (
        <Button primary>
          İlanı Düzenle
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="job-advert-detail">
      <Container style={{ marginTop: '1em', backgroundColor: '#FBF7E4' }}>
        {jobAdvertDetail ? (
          <>
            <Grid columns={2}>
              <Grid.Column width={12}>
                <Card fluid color="teal">
                  <Card.Content>
                    <Image
                      floated="left"
                      size="small"
                      src="https://example.com/company-logo.jpg" // Replace with the URL of the company logo image
                    />
                    <Card.Header>
                      <Link to={`/employer/${jobAdvertDetail.employer.id}`}>
                        {jobAdvertDetail.employer.companyName}
                      </Link>
                    </Card.Header>
                    <Card.Meta>
                      <Icon name="phone" />
                      {jobAdvertDetail.employer.phoneNumber}
                    </Card.Meta>
                    <Card.Description>{jobAdvertDetail.employer.website}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Icon name="map marker alternate" />
                    {jobAdvertDetail.city.cityName}
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card fluid color="teal">
                  <Card.Content>
                    <Header as="h4">Benzer İlanlar</Header>
                    {similarJobAdverts.map((advert) => (
                      <Card.Description key={advert.id}>
                        <Link to={`/job-adverts/${advert.id}`}>{advert.jobPosition.jobName}</Link>
                      </Card.Description>
                    ))}
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
            <Divider />
            <Header as="h2" textAlign="center">
              {jobAdvertDetail.jobPosition.jobName}
            </Header>
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Header as="h2" textAlign="left">Açıklama</Header>
                <p>{jobAdvertDetail.explanation}</p>
                <Header as="h3" textAlign="left">
                  İlan detayları
                </Header>
                <Grid columns={2}>
                  <Grid.Column width={6}>
                    <Header as="h4">Maaş:</Header>
                    <Header as="h4">Yayın Tarihi:</Header>
                    <Header as="h4">Açık Pozisyon Sayısı:</Header>
                    <Header as="h4">Son Başvuru Tarihi:</Header>
                    <Header as="h4">Çalışma Zamanı:</Header>
                    <Header as="h4">Çalışma Türü:</Header>
                    <Header as="h4">Çalışma Yeri:</Header>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <p>{jobAdvertDetail.salary}</p>
                    <p>{jobAdvertDetail.releaseDate}</p>
                    <p>{jobAdvertDetail.numberOfOpenPositions}</p>
                    <p>{jobAdvertDetail.endDate}</p>
                    <p>{jobAdvertDetail.workTime}</p>
                    <p>{jobAdvertDetail.workType}</p>
                    <p>{jobAdvertDetail.city.cityName}</p>
                  </Grid.Column>
                </Grid>

                {jobseekerLoggedIn && (
                  <Popup
                    trigger={
                      <Icon
                        name="heart"
                        color={jobAdvertDetail.isFavorite ? "red" : "grey"}
                        onClick={() => handleFavorite(jobAdvertDetail.id)}
                      />
                    }
                    content="Favorilere ekle"
                    position="top center"
                  />
                )}
              </Grid.Column>
            </Grid>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          {renderActionButton()}
        </div>
        <ToastContainer position="bottom-right" />
      </Container>
    </div>
  );
};

export default JobAdvertisementDetail;

