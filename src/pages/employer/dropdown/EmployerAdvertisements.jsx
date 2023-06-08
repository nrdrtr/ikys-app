import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import axios from 'axios';

export default function EmployerAdvertisements() {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/jobAdvertisements/getByEmployerId?employerId=2');
        setAdvertisements(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     // Reklamı silmek için isteği burada gerçekleştirin
  //     await axios.delete(`http://localhost:8080/api/jobAdvertisements/deleteAdvertisementById?id=${id}`);
  //     setAdvertisements(advertisements.filter((advertisement) => advertisement.id !== id));
  //     console.log('Reklam başarıyla silindi.');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <Link to="/jobadvertisementAdd">
        <Button floated="right" primary style={{ marginTop: '10px', marginRight: '10px' }}>
          Add Position
        </Button>
      </Link>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Salary</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          
         
        </Table.Body>
      </Table>
    </div>
  );
}
