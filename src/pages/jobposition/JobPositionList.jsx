import React, { useState, useEffect } from 'react';
import { Card, Container, Pagination, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobPositionService from '../../services/JobPositionService';

function JobPositionList() {
  const [jobPositions, setJobPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isgverenLoggedIn } = useSelector(
    (state) => state.auth
  );
 

  useEffect(() => {
    let jobPositionService = new JobPositionService();

    jobPositionService
      .getJobPositions(currentPage - 1, 21)
      .then((response) => {
        setJobPositions(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  function handlePageChange(event, { activePage }) {
    setCurrentPage(activePage);
  }


  return (
    <div>
      <Container textAlign="center">
        {isgverenLoggedIn && (
          <Button
            as={Link}
            to="/add-job-position"
            floated="right"
            primary
            style={{ marginTop: '10px', marginRight: '10px' }}
          >
            Add Position
          </Button>
        )}
      </Container>
      <br />

      <Container textAlign="center">
        <Card.Group itemsPerRow={3}>
          {jobPositions.map((jobPosition) => (
            <Card
              key={jobPosition.id}
              as={Link}
              to={`/ispozisyonlari/${jobPosition.id}`}
              header={jobPosition.jobName}
            />
          ))}
        </Card.Group>
      </Container>

      <Container textAlign="center">
        <Pagination
          activePage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          pointing
          secondary
        />
      </Container>
    </div>
  );
}

export default JobPositionList;
