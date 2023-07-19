import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function JobPositionAdd() {


  const initialValues = {
    jobName: '',
  };

  const validationSchema = Yup.object({
    jobName: Yup.string().required('Bu alanın doldurulması zorunludur.'),
  });

  const onSubmit = (values) => {
    axios.post('http://localhost:8080/api/ispozisyonu/add', values)
      .then((response) => {
        console.log(response.data);
         
      })
      .catch((error) => {
        console.error(error);
         
      });
  };
 
  const add = (values) => {
    toast.success(`${values.jobName} eklendi!`);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <ToastContainer />
      <Grid textAlign="center" verticalAlign="middle" style={{ height: '55vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
           İş Pozisyonu Ekle
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
             
            <Segment stacked> <label style={{ marginRight: '22em' }}>İş Pozisyonu:</label>
            <p></p>
              <Form.Input
                fluid
                icon="briefcase"
                iconPosition="left"
                placeholder=" İş Pozisyonu"
                name="jobName"
                value={formik.values.jobName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.jobName && formik.errors.jobName
                    ? { content: formik.errors.jobName, pointing: 'below' }
                    : null
                }
              />

              <Button color="green" fluid size="large" type="submit" onClick={add}>
                Ekle
              </Button>
            </Segment>
          </Form>
        </Grid.Column>

      </Grid>
    </div>

  );
}
