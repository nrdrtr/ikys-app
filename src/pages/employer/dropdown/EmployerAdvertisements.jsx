import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const EmployerAdvertisements = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const employer = useSelector((state) => state.auth.employer);
  const history = useHistory();

  const fetchAdvertisements = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/jobAdvertisements/getByEmployerId?employerId=${employer.id}`);
      setAdvertisements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [employer.id]);

  const handleCreateAdvertisement = () => {
    history.push('/jobadvertisementAdd');
  };

  const setStatus = async (jobAdvertisementId, employerId, status) => {
    try {
      await axios.post(
        `http://localhost:8080/api/jobAdvertisements/setStatus?jobAdvertisementId=${jobAdvertisementId}&employerId=${employerId}&status=${status}`
      );
      fetchAdvertisements();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ height: '120vh', backgroundColor: "#FBF7E4" }}>
      <h3>İlanlarım</h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
            <Table.HeaderCell>Açıklama</Table.HeaderCell>
            <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Durum</Table.HeaderCell>
            <Table.HeaderCell>İşlem</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {advertisements.map((advertisement) => (
            <Table.Row key={advertisement.id}>
              <Link to={`/jobAdvertisements/getById/${advertisement.id}`}>
                <Table.Cell>{advertisement.jobPosition.jobName}</Table.Cell>
              </Link>
              <Table.Cell>{advertisement.explanation}</Table.Cell>
              <Table.Cell>{advertisement.endDate}</Table.Cell>
              <Table.Cell>{advertisement.active ? 'Aktif' : 'Pasif'}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => setStatus(advertisement.id, employer.id, !advertisement.active)}
                  color={advertisement.active ? 'red' : 'green'}
                  content={advertisement.active ? 'Pasifleştir' : 'Etkinleştir'}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Button onClick={handleCreateAdvertisement} color={'green'}>İlan Ver</Button>
    </Container>
  );
};

export default EmployerAdvertisements;
