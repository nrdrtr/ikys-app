import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'semantic-ui-react';

const JobSeekerFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/favori/getFavoriteByIsArayanId?id=6');
        setFavorites(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Favoriyi silmek için isteği burada gerçekleştirin
      await axios.delete(`http://localhost:8080/api/favori/deleteFavoriteById?id=${id}`);
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
      console.log('Favori başarıyla silindi.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <Container style={{ marginTop: '3em' }} textAlign="center">
      <h1>favorilerin</h1>
      
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Favorite ID</Table.HeaderCell>
            <Table.HeaderCell>Job Advertisement Explanation</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>Employer Company Name</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {favorites.map((favorite) => (
            <Table.Row key={favorite.id}>
              <Table.Cell>{favorite.id}</Table.Cell>
              <Table.Cell>{favorite.jobAdvertisement.explanation}</Table.Cell>
              <Table.Cell>{favorite.jobAdvertisement.jobPosition.jobName}</Table.Cell>
              <Table.Cell>{favorite.jobAdvertisement.employer.companyName}</Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleDelete(favorite.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </Container>
    </div>
  );
};

export default JobSeekerFavorites;
