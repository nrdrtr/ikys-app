import React from "react";
import { Link } from "react-router-dom";
import { Grid, Segment, Container, Header, Button, Icon } from "semantic-ui-react";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FBF7E4", minHeight: "10vh" }}>
      <div style={{ padding: "10px" , backgroundColor: "#FBF7E4"}}>
        <Container text >
          <Header
            color="black"
            as="h1"
            content="İKYS"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginTop: "1.5em",
              color: "black",
            }}
          />

          <Header
            as="h2"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em",
            }}
          >
            Anlamlı ve yapmaya değer bir iş bulmanın uzun bir yolculuk olduğunu biliyoruz. Hedefimiz bu işlemi sizin için mümkün olduğu kadar kolaylaştırmak.
          </Header>
          <Button
            as={Link}
            to="/jobAdvertisements"
            primary
            size="huge"
            style={{ marginTop: "2em" }}
          >
            İş İlanlarını Görüntüle
            <Icon name="right arrow" />
          </Button>
        </Container>
      </div>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em", color: "#0C61F0" }}>
                Şirketlere Kolaylık Sağlıyoruz
              </Header>
              <p style={{ fontSize: "1.33em", color: "#0C61F0" }}>
                Kolay bir şekilde işveren olarak kayıt olun ve iş ilanlarınızı tek bir adımda iş arayan kişiler ile buluşturun.
              </p>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em", color: "#0C61F0" }}>
                İş Arayanlara Özel Filtreler
              </Header>
              <p style={{ fontSize: "1.33em", color: "#0C61F0" }}>
                Kolayca filtreleme yaparak hayal ettiğiniz mesleğe başvurun. CV'nizi oluşturun ve iş verenlerle paylaşın.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

       

      
    </div>
  );
}