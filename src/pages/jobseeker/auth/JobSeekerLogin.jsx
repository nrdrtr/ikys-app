import React, { useState } from 'react';
import { Button, Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { jobseekerLogin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const JobSeekerLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const jobseekerLoggedIn = useSelector(state => state.auth.jobseekerLoggedIn);
  const loginError = useSelector(state => state.auth.error);


  const handleLogin = () => {
    dispatch(jobseekerLogin(email, password))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email.trim() === '' || password.trim() === '') {
      setError('Lütfen e-postanızı ve şifrenizi girin.');
      return;
    }

    handleLogin();
  };


  if (jobseekerLoggedIn) {
    history.push('/');
  }

  return (
<Container>
      <Grid textAlign='center' style={{ height: '50vh', marginTop: '10px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
            <h2 as='h2' textAlign='center'>
            İşveren Girişi <br />
          
          </h2>
              <div style={{ textAlign: 'left' }}>
                <label htmlFor="email" style={{ color: 'black' }}>E-Posta</label>
                <Form.Input
                
                 
                 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div><p></p>
              <div style={{ textAlign: 'left' }}>
                <label htmlFor="password" style={{ color: 'black' }}>Şifre</label>
                <Form.Input
                
                 
                
                  type='password'
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div><p></p>
              <Button color='green' fluid size='large' type='submit'>
                Giriş Yap
              </Button>
             
              <a href='forgot-password'>Şifremi Unuttum</a>

            </Segment>
          </Form>
          {error && <Message negative>{error}</Message>}
          {loginError && <Message negative>{loginError}</Message>}
          <Message>
            Hesabın yok mu? <a href='jobseekerregister'>Kayıt ol</a>
          </Message>
        </Grid.Column>
      </Grid>

    </Container>
  );
};

export default JobSeekerLogin;
