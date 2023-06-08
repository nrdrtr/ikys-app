import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Grid, Divider, Card, Container } from "semantic-ui-react";
import JobPositionService from "../../services/JobPositionService";
import JobAdvertisementService from "../../services/JobAdvertisementService";

export default function JobPositionPage() {
  const { id } = useParams();
  const [jobPosition, setJobPosition] = useState({});
  const [relatedJobAdvertisements, setRelatedJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByIsPozisyonId(id)
      .then((result) => setRelatedJobAdvertisements(result.data));

    let jobPositionService = new JobPositionService();
    jobPositionService.getJobPositionById(id).then((result) => setJobPosition(result.data));
  }, [id]);

  return (
    <Container >
    <div style={{ borderRadius: "25px", marginTop: "12 px", padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: "20px", color: "#333" }}>
        {jobPosition.data?.jobName}
      </Header>
      <Divider />
      <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
        Pozisyon Detayları
      </Header>
      <Grid columns={3} stackable>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3" style={{ color: "#777" }}>En Düşük Maaş</Header>
            <p>{jobPosition.data?.salary}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3" style={{ color: "#777" }}>Ortalama Maaş</Header>
            <p>2000</p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3" style={{ color: "#777" }}>En Yüksek Maaş</Header>
            <p>3000</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      {jobPosition.data?.jobName && (
        <div>
          <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
            İş Tanımı
          </Header>
          {/* <p>{jobPosition.data?.explanation}</p> */}
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo quas perferendis nulla repudiandae corrupti architecto eum voluptate commodi eveniet. Error dolores aspernatur asperiores.</p>
        </div>
      )}
      <Divider />
      <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
        İlgili İş İlanları
      </Header>
    
      <Card.Group itemsPerRow={3} stackable>
        {relatedJobAdvertisements.map((jobAd) => (
          <Card key={jobAd.id} style={{ backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>  <Link to={`/jobPostings/getById/${jobAd.id}`}>
            <Card.Content>
              <Card.Header style={{ color: "#333" }}>{jobAd.jobPosition.jobName}</Card.Header>
              <Card.Description style={{ color: "#777" }}>{jobAd.city.cityName}</Card.Description>
            </Card.Content></Link>
          </Card>
        ))}
      </Card.Group>
    </div>
    </Container>
  );
}