import React from "react";
import { Link } from "react-router-dom";
import { Grid, Segment, Container, Header, Button, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const employer = useSelector((state) => state.auth.employer);

  return (
    <div style={{ backgroundColor: "#FBF7E4" }}>
      <div style={{ backgroundColor: "#FBF7E4" }}>
        <Container text>
          <Header
            color="black"
            as="h1"
            style={{
              fontSize: "2.2em",
              fontWeight: "bold",
              marginTop: "1em",
              color: "#0C61F0",
              textAlign: "center",
            }}
          >
            İNSAN KAYNAKLARI YÖNETİM SİSTEMİ
          </Header>
          <Header
            as="h2"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
               
            }}
          >
            Anlamlı ve yapmaya değer bir iş bulmanın uzun bir yolculuk olduğunu biliyoruz. Hedefimiz bu işlemi sizin için mümkün olduğu kadar kolaylaştırmak.
          </Header>
          {employer ? (
            <Button
              as={Link}
              to="/jobAdvertisementAdd"
              color="green"
              size="huge"
              style={{ marginTop: "1em" }}
            >
              İlan Ver
              <Icon name="right arrow" />
            </Button>
          ) : (
            <Button
              as={Link}
              to="/jobAdvertisements"
              color="green"
              size="huge"
              style={{ marginTop: "em" }}
            >
              İş İlanlarını Görüntüle
              <Icon name="right arrow" />
            </Button>
          )}
        </Container>
      </div>
      {employer && (
        <Segment  vertical>
          <Container>
            <Header as="h2" style={{ fontSize: "1em", color: "#0C61F0" }}>
              Hoş Geldiniz, {employer.companyName}
            </Header>
          </Container>
        </Segment>
      )}
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>

              <img
                src="https://odsdanismanlik.com/wp-content/uploads/2022/08/ODS_AK_22_1131_makale_agustos_gorselleri_toplu_ik_400x250_010822.png"
                alt=""
                className="homepage-image"
              />
              <Header as="h3" style={{ fontSize: "2em", color: "#0C61F0" }}>
                Şirketlere Kolaylık Sağlıyoruz
              </Header>
              <p style={{ fontSize: "1.33em", color: "black" }}>
                Kolay bir şekilde işveren, olarak kayıt olun ve iş ilanlarınızı tek bir adımda iş arayan kişiler ile buluşturun.
              </p>
            </Grid.Column>
            <Grid.Column width={8}>
              <img
                src="https://www.akgundefense.com/uploads/sectorproductsdigerfoto/160525664821e3.jpg"
                alt=""
                className="homepage-image"
              />
              <Header as="h3" style={{ fontSize: "2em", color: "#0C61F0" }}>
                İş Arayanlara Özel Filtreler
              </Header>
              <p style={{ fontSize: "1.33em", color: "black" }}>
                Kolayca filtreleme yaparak hayal ettiğiniz mesleğe başvurun. CV'nizi oluşturun ve iş verenlerle paylaşın.
              </p>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
