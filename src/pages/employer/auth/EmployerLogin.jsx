import React, { useState } from 'react';
import { Button, Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { employerLogin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const EmployerLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const employerLoggedIn = useSelector(state => state.auth.employerLoggedIn);
  const loginError = useSelector(state => state.auth.error);


  const handleLogin = () => {
    dispatch(employerLogin(email, password));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (email.trim() === '' || password.trim() === '') {
      setError('Lütfen e-postanızı ve şifrenizi girin.');
      return;
    }
    handleLogin();
  };


  if (employerLoggedIn) {
    history.push('/');
  }

  return (
    <Container>
      <Grid textAlign='center' style={{ height: '50vh', marginTop: '10px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          
          <Form size='large' onSubmit={handleSubmit}>
          <h2 className="text-center mb-5"> İşveren Girişi</h2>
            <Segment stacked>

              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-posta adresi'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Şifre'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button color='teal' fluid size='large' type='submit'>
                Giriş Yap
              </Button>
              <p></p>
              <a href='forgot-password'>Şifremi Unuttum</a>

            </Segment>
          </Form>
          {error && <Message negative>{error}</Message>}
          {loginError && <Message negative>{loginError}</Message>}
          <Message>
            Hesabın yok mu? <a href='employer-register'>Kayıt ol</a>
          </Message>



        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default EmployerLogin;
