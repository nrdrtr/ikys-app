import React, { useState } from 'react';
import { Button, Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { isArayanLogin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const JobSeekerLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');

  const handleLogin = () => {
    dispatch(isArayanLogin(email, password));
    history.push('/home');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter your email and password.'); // Set error message
      return;
    }

    handleLogin();
  };

  return (
    <Container>
      <Grid textAlign='center' style={{ height: '25vh', marginTop: '10px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            İş Arayan Girişi
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button color='teal' fluid size='large' type='submit'>
                Giriş Yap
              </Button>
            </Segment>
          </Form>
          {error && <Message negative>{error}</Message>} {/* Display error message if there is an error */}
          <Message>
            Yeni misin? <a href='jobseekerregister'>Kayıt ol</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default JobSeekerLogin;
