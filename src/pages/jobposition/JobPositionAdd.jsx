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
    jobName: Yup.string().required('Job Name is required'),
  });

  const onSubmit = (values) => {
    axios.post('http://localhost:8080/api/ispozisyonu/add', values)
      .then((response) => {
        console.log(response.data);
        // Başarılı işlem bildirimi veya diğer işlemler
      })
      .catch((error) => {
        console.error(error);
        // Hata durumunda hata bildirimi veya diğer işlemler
      });
  };
  //tosatify
  const add = (values) => {
    toast.success(`${values.jobName} added!`);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <ToastContainer />
      <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Add Job Position
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="briefcase"
                iconPosition="left"
                placeholder="Job Name"
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

              <Button color="teal" fluid size="large" type="submit" onClick={add}>
                iş Pozisyonu ekle
              </Button>
            </Segment>
          </Form>
        </Grid.Column>

      </Grid>
    </div>

  );
}
