import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Popup, Button, Grid, Table, Container } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filter from "../../components/Filter";
import { useSelector } from "react-redux";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import WorkTimeService from "../../services/WorkTimeService";

export default function JobAdvertisementList() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  const { isArayanLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    loadJobAdvertisements();
  }, []);

  const loadJobAdvertisements = () => {
    const jobAdvertisementService = new JobAdvertisementService();
    const workTimeService = new WorkTimeService();

    Promise.all([
      jobAdvertisementService.getJobAdvertisements(),
      workTimeService.getWorkTimes()
    ]).then((results) => {
      const jobAdvertisementsResult = results[0];
      const workTimesResult = results[1];

      setJobListings(jobAdvertisementsResult.data.data);
      setFilteredJobListings(jobAdvertisementsResult.data.data);
      setWorkTimes(workTimesResult.data);
    });
  };

  const addFavorite = (id) => {
    toast.success("Favorilere eklendi");
    const updatedListings = jobListings.map((listing) => {
      if (listing.id === id) {
        return { ...listing, isFavorite: true };
      }
      return listing;
    });
    setJobListings(updatedListings);
    setFilteredJobListings(updatedListings);
  };

 
  const handleFilter = (selectedFilters) => {
    const { city, jobPosition, workTypes } = selectedFilters;

    const filteredListings = jobListings.filter((listing) => {
      // Filter by city
      if (city && city !== listing.city?.cityName) {
        return false;
      }

      // Filter by job position
      if (jobPosition && jobPosition !== listing.jobPosition.jobName) {
        return false;
      }

      // Filter by work types
      if (workTypes.length > 0 && !workTypes.includes(listing.workType)) {
        return false;
      }

      return true;
    });

    setFilteredJobListings(filteredListings);
  };

  const handleFavorite = (id) => {
    toast.success("Favorilere eklendi");
    const updatedListings = jobListings.map((listing) => {
      if (listing.id === id) {
        return { ...listing, isFavorite: true };
      }
      return listing;
    });
    setJobListings(updatedListings);
    setFilteredJobListings(updatedListings);
  };

  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <Filter handleFilter={handleFilter} workTimes={workTimes} />
        </Grid.Column>
        <Grid.Column width={12}>
          <ToastContainer />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                <Table.HeaderCell>Genel İş Pozisyonu</Table.HeaderCell>
                <Table.HeaderCell>Açık Pozisyon Adedi</Table.HeaderCell>
                <Table.HeaderCell>Yayın Tarihi</Table.HeaderCell>
                <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                <Table.HeaderCell>Detaylar</Table.HeaderCell>
                {isArayanLoggedIn && <Table.HeaderCell />}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredJobListings.map((adverts) => (
                <Table.Row key={adverts.id}>
                  <Table.Cell>{adverts.employer.companyName}</Table.Cell>
                  <Table.Cell>{adverts.jobPosition.jobName}</Table.Cell>
                  <Table.Cell>{adverts.numberOfOpenPositions}</Table.Cell>
                  <Table.Cell>{adverts.releaseDate}</Table.Cell>
                  <Table.Cell>{adverts.endDate}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/jobPostings/getById/${adverts.id}`}>
                      <Button primary>
                        Detaylar <Icon name="arrow right" />
                      </Button>
                    </Link>
                  </Table.Cell>
                  {isArayanLoggedIn && (
                    <Table.Cell>
                      <Popup
                        trigger={
                          <Icon
                            name="heart"
                            color={adverts.isFavorite ? "red" : "grey"}
                            onClick={() => handleFavorite(adverts.id)}
                          />
                        }
                        content="Favorilere ekle"
                        position="top center"
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
