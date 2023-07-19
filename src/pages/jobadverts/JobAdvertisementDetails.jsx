import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Card, Container, Grid } from 'semantic-ui-react';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import ApplicationService from '../../services/ApplicationService';
import FavoriService from '../../services/FavoriService';
import 'react-toastify/dist/ReactToastify.css';
import { persistReducer } from 'redux-persist';

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
    favoriService
      .addFavorite(jobAdvertisementId, jobSeekerId)
      .then((result) => {
        toast.success(result.data.message);
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

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
    <Container style={{ margin: '20px' }}>
      <Grid stackable>
        <Grid.Column width={12}>
          {jobAdvertDetail && (
            <Card fluid>
              <Card.Content style={{ backgroundColor: '#0000', color: 'black' }}>
                <h2>{jobAdvertDetail.jobPosition.jobName}</h2>
                <Card.Meta>
                  <div style={{ color: 'black' }}>
                    <Link to={`/employer/${jobAdvertDetail.employer.id}`} style={{ color: 'blue' }}>
                      {jobAdvertDetail.employer.companyName}
                    </Link>{' '}
                    {jobAdvertDetail.city.cityName}
                  </div>
                </Card.Meta>
                <p><p></p></p><p>
                  <h3>İş Tanımı</h3>
                </p>
                <p>Şirketimiz, büyüyen bulut altyapısı ihtiyaçları için deneyimli ve yetenekli bir Bulut Altyapı Mimarısı aramaktadır. Bu roldeki profesyonel, karmaşık bulut altyapı projelerini tasarlamak, uygulamak ve yönetmek için gereken teknik uzmanlığı ve liderlik becerilerini sergilemelidir.</p>
                <h3>Ek Bilgiler</h3>

                
                <Card.Meta style={{ color: 'black' }}>Yayınlanma Tarihi: {jobAdvertDetail.releaseDate}</Card.Meta>
                <Card.Meta style={{ color: 'black' }}>Son Başvuru Tarihi: {jobAdvertDetail.endDate}</Card.Meta>
                <Card.Meta style={{ color: 'black' }}>Maaş: {jobAdvertDetail.salary}</Card.Meta>
                <Card.Meta style={{ color: 'black' }}>Aranan Personel Sayısı: {jobAdvertDetail.numberOfOpenPositions}</Card.Meta>
                <Card.Meta style={{ color: 'black' }}>Çalışma Şekli: {jobAdvertDetail.workType}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                {renderActionButton()}
                <Button icon="heart" color="red" onClick={() => handleFavorite(jobAdvertDetail.id)}>Favorilere Ekle</Button>

              </Card.Content>
            </Card>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <Card fluid>
            <Card.Content>
              <p></p>
              <Card.Header  style={{ color: 'blue' }}>Benzer İlanlar</Card.Header>
            </Card.Content>
            {similarJobAdverts.map((similarJobAdvert) => (
              <Card key={similarJobAdvert.id}>
                <Card.Content>
                  <Link to={`/jobadverts/${similarJobAdvert.id}`} >
                  <Card.Header>{similarJobAdvert.jobPosition.jobName}</Card.Header>
                  </Link>
                  <Card.Meta  style={{ color: 'black' }}>
                    {similarJobAdvert.employer.companyName} - {similarJobAdvert.city.cityName}
                  </Card.Meta>
                  <Card.Description>{similarJobAdvert.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  
                </Card.Content>
              </Card>
            ))}
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default JobAdvertisementDetail;
