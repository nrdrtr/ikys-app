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
    <Container style={{ marginBottom: '5em' }}>
      <div style={{ borderRadius: "25px", padding: "20px", backgroundColor: "#f9f9f9" }}>
        <Header as="h1" textAlign="center" style={{ marginBottom: "20px", color: "#333" }}>
          {jobPosition.data?.jobName} Ne İş Yapar?
        </Header>
        <Divider />
        <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
        {jobPosition.data?.jobName} Maaş Bilgileri
        </Header>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" style={{ color: "#000000" }}>En Düşük (Aylık)</Header>
              <h4> 9.350 ₺ </h4>
              
            </Grid.Column>
            <Grid.Column>
              <Header as="h3" style={{ color: "#000000" }}>Ortalama (Aylık)</Header>
              <h4>14.260 ₺</h4>
            </Grid.Column>
            <Grid.Column>
              <Header as="h3" style={{ color: "#000000" }}>En Yüksek (Aylık)</Header>
              <h4>19.170 ₺</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        {jobPosition.data?.jobName && (
          <div>
            <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
              {jobPosition.data?.jobName} Nedir?
            </Header>
            <p>Herhangi bir kurum veya kuruluşta bilgisayar ağlarını planlayan kişilere ağ mimarı denir. Ağ mimarları, devlet ya da özel sektörde istihdam edebilirler. Ağ mimarları, çalıştıkları firmanın ihtiyaçlarını iyi bir şekilde belirlemesi gerekmektedir. İş konularında sağlam bir kavrayışa sahip olmaları gerekmektedir. 
              Ağ mimarı, çalıştığı firmanın ihtiyacına göre güvenli bir şekilde ağ tasarımı yapmaktadır.</p>
          </div>
        )}
        <Divider />
        <Header as="h2" style={{ marginTop: "20px", color: "#333" }}>
        {jobPosition.data?.jobName} İş İlanları
        </Header>
    
        {relatedJobAdvertisements.length > 0 ? (
          <Card.Group itemsPerRow={3} stackable>
            {relatedJobAdvertisements.map((jobAd) => (
              <Card key={jobAd.id} style={{ backgroundColor: "#FBF7E4"  }}>
                <Link to={`/jobAdvertisements/getById/${jobAd.id}`}>
                  <Card.Content>
                    <Card.Header as="h4" style={{ color: "#0a0a0b" }}>{jobAd.jobPosition.jobName}</Card.Header>
                    <Card.Description style={{ color: "#0a0a0b" }}>{jobAd.city.cityName}</Card.Description>
                  </Card.Content>
                </Link>
              </Card>
            ))}
          </Card.Group>
        ) : (
          <p style={{ textAlign: "center" }}>İlgili iş ilanı bulunmamaktadır.</p>
        )}
      </div>
    </Container>
  );
}
