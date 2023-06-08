import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Icon, Image } from 'semantic-ui-react';
import JobSeekerService from './../../../services/JobSeekerService';

export default function JobSeekerAccount() {
  let { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    birthDate: "01/01/1990",
    identityNumber: "1234567890",
    profileImage:  "https://pbs.twimg.com/profile_images/1630252256300761088/Rjdh5uDd_400x400.jpg"
  });

  useEffect(() => {
    let employeeService = new JobSeekerService();
    employeeService.getById(id).then((result) => setEmployee(result.data.data));
  }, [id]);

  return (
    <div style={{ width: '400px' }} >
      <Card  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Image src={employee.profileImage} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{employee.name} {employee.surname}</Card.Header>
          <Card.Meta>{employee.email}</Card.Meta>
          <Card.Description>
            <p>Birth Date: {employee.birthDate}</p>
            <p>
              <Icon name='user' /> Identity Number: {employee.identityNumber}
            </p>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
