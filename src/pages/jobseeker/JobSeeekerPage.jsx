import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import JobSeekerDetails from './JobSeekerDetails ';

const JobSeekerPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <JobSeekerDetails id={id} />
    </Container>
  );
};

export default JobSeekerPage;
