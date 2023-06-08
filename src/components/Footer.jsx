import React from "react";
import { Container, Grid, Header, List, Segment, Button } from "semantic-ui-react";

export default function Footer() {

  const footerStyle = {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  };
  


  return (
    <div className="footer">
      <Segment inverted vertical style={{ padding: "5em 0em"   ,footerStyle}}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Hakkında" />
                <List link inverted>
                  <List.Item as="a">Site Haritası</List.Item>
                  <List.Item as="a">İletişim</List.Item>
                  <List.Item as="a">Kullanım Şartları</List.Item>
                  <List.Item as="a">Gizlilik Politikası</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Hizmetler" />
                <List link inverted>
                  <List.Item as="a">İş İlanları</List.Item>
                  <List.Item as="a">Özgeçmiş Oluşturucu</List.Item>
                  <List.Item as="a">Başvuru Takibi</List.Item>
                  <List.Item as="a">Performans Yönetimi</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  İKYS Sistemi - İnsan Kaynakları Yönetim Sistemi
                </Header>
                <p>
                  Kapsamlı İKYS çözümümüzle insan kaynakları süreçlerinizi basitleştirin ve yetenek yönetimini optimize edin. İşe alım ve onboarding'den performans değerlendirmesine ve çalışan kayıtlarının yönetimine kadar ihtiyaç duyduğunuz her şey burada.
                </p>
                <Button circular color="facebook" icon="facebook" />
                <Button circular color="twitter" icon="twitter" />
                <Button circular color="linkedin" icon="linkedin" />
                <Button circular color="google plus" icon="google plus" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}