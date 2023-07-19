import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Popup, Button, Grid, Table, Container } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "../../components/Filter";
import { useSelector } from "react-redux";
import WorkTypesService from "../../services/WorkTypesService";
import JobAdvertisementService from "../../services/JobAdvertisementService";

export default function JobAdvertisementList() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  const jobseeker = useSelector((state) => state.auth.jobSeeker);

  useEffect(() => {
    loadJobAdvertisements();
  }, []);

  const loadJobAdvertisements = () => {
    const jobAdvertisementService = new JobAdvertisementService();
    const workTimeService = new WorkTypesService();

    Promise.all([
      jobAdvertisementService.getByIsActiveAdvertisements(),
      workTimeService.getAll()
    ]).then((results) => {
      const jobAdvertisementsResult = results[0];
      const workTimesResult = results[1];

      setJobListings(jobAdvertisementsResult.data.data);
      setFilteredJobListings(jobAdvertisementsResult.data.data);
      setWorkTimes(workTimesResult.data);
    });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options).replace(/\//g, ".");
  };

  const handleFilter = (selectedFilters) => {
    const { city, jobPosition, workTypes } = selectedFilters;

    const filteredListings = jobListings.filter((listing) => {
      if (city && city !== listing.city?.cityName) {
        return false;
      }

      if (jobPosition && jobPosition !== listing.jobPosition.jobName) {
        return false;
      }

      if (workTypes.length > 0 && !workTypes.includes(listing.workType)) {
        return false;
      }

      return true;
    });

    setFilteredJobListings(filteredListings);
  };

  const formatWorkInfo = (workType, workTime) => {
    return `${workType} / ${workTime}`;
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <Grid stackable>
        <Grid.Column width={4}>
          <Filter handleFilter={handleFilter} workTimes={workTimes} />
          <ToastContainer />
        </Grid.Column>

        <Grid.Column width={12}>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>YayınTarihi</Table.HeaderCell>
                <Table.HeaderCell>Çalışma Şekli</Table.HeaderCell>
                <Table.HeaderCell>Şehir</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredJobListings.map((adverts) => (
                <Table.Row key={adverts.id}>
                  <Table.Cell>{adverts.employer.companyName}</Table.Cell>
                  <Table.Cell>{adverts.jobPosition.jobName}</Table.Cell>
                  <Table.Cell>{formatDate(adverts.releaseDate)}</Table.Cell>
                  <Table.Cell>{adverts.workType}</Table.Cell>
                  <Table.Cell>{adverts.city.cityName}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/jobAdvertisements/getById/${adverts.id}`}>
                      <Button primary style={{ display: "flex", alignItems: "center" }}>
                        Detaylar
                        <Icon name="arrow right" style={{ marginLeft: "0.5em" }} />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
