import React, { useState, useEffect } from 'react';
import { Divider, Header, Grid, Card, Icon, Container, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
 import { useSelector } from 'react-redux';
import JobAdvertisementService from '../../services/JobAdvertisementService';

const JobAdvertisementDetail = () => {
  const [jobAdvertDetail, setJobAdvertDetail] = useState(null);
 // const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { isArayanLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    let jobPostingService = new JobAdvertisementService();

    jobPostingService.getJobAdvertisementById(id).then((result) => {
      setJobAdvertDetail(result.data.data);
    });
  }, [id]);

  const handleApply = () => {
    if (isArayanLoggedIn) {
      toast.success('Başvuru yapıldı');
    } else {
      toast.info('Başvurmak için giriş yapınız');
    }
  };

//   const handleFavorite = () => {
//     setIsFavorite(!isFavorite);
//     toast.success('Favorilere eklendi');


    // Let favoriteJobService = new FavoriServis();
    // favoriteJobService.add({ employee: user, jobAdvertDetail }).then((result) =>
    //   toast.success(result.data.message)
    // );
//   };

  return (
    <div className="job-advert-detail" style={{ minHeight: '100vh' }}>
      <Container style={{ marginTop: '1em', backgroundColor: '#FBF7E4' }}>
        {jobAdvertDetail ? (
          <>
            <Header as="h1" textAlign="center">
              {jobAdvertDetail.jobPosition.jobName}
            </Header>
            <Divider />
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header as="h2">İş Tanımı</Header>
                <p>{jobAdvertDetail.explanation}</p>
                <Divider />
                <Header as="h2">Aranan Nitelikler</Header>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus iusto, totam tempore odit nam
                  quis officiis non! Id nostrum neque recusandae dolore maiores explicabo adipisci aliquam,
                  doloremque, atque, dolor illum!
                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header as="h2">Maaş Aralığı</Header>
                <Card.Group>
                  <Card color="blue">
                    <Card.Content>
                      <Card.Header>En Düşük Maaş</Card.Header>
                      <Card.Description>{jobAdvertDetail.salary}</Card.Description>
                    </Card.Content>
                  </Card>
                  <Card color="green">
                    <Card.Content>
                      <Card.Header>Ortalama Maaş</Card.Header>
                      <Card.Description>{jobAdvertDetail.salary}</Card.Description>
                    </Card.Content>
                  </Card>
                  <Card color="red">
                    <Card.Content>
                      <Card.Header>En Yüksek Maaş</Card.Header>
                      <Card.Description>{jobAdvertDetail.salary}</Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
                <Divider />
                <Header as="h2">Son Başvuru Tarihi</Header>
                <p>{jobAdvertDetail.endDate}</p>
              </Grid.Column>
            </Grid>
            <Divider />
            <Header as="h2">Firma</Header>
            <Card fluid color="teal">
              <Card.Content>
                <Card.Header>{jobAdvertDetail.employer.companyName}</Card.Header>
                <Card.Meta>{jobAdvertDetail.employer.website}</Card.Meta>
                <Card.Description>
                  <Icon name="phone" />
                  {jobAdvertDetail.employer.phoneNumber}
                </Card.Description>
              </Card.Content>
            </Card>
            <Divider />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <Button primary onClick={handleApply}>
          Başvur
        </Button>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default JobAdvertisementDetail;
