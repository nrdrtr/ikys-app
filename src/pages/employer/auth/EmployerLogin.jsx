import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {  isgverenLogin} from '../../../store/actions/authActions';

const EmployerLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = () => {
    dispatch(isgverenLogin(email, password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Grid textAlign='center' style={{ height: '50vh', marginTop: '10px' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> isveren giris
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
              giris yap
            </Button>
          </Segment>
        </Form>
        <Message>
          yeni misin ? <a href='employerregister'>Kayıt ol</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default EmployerLogin;
