import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, Button, Icon, Container } from 'semantic-ui-react';
import * as Yup from 'yup';
import JobExperienceService from '../../services/jobExperienceService';
import HrmsDateInput from '../../utilities/customFormControls/HrmsDateInput';
import HrmsLongTextInput from '../../utilities/customFormControls/HrmsLongTextInput';
import { useSelector } from 'react-redux';

function JobExperienceAdd() {
  const history = useHistory();
  const jobSeeker = useSelector((state) => state.auth.jobSeeker);
  let jobExperienceService = new JobExperienceService();

  const initialValues = {
    companyName: '',
    positionName: '',
    startDate: '',
    endDate: '',
    resumeId: 69, // Replace with the actual resume ID
    jobSeekerId: jobSeeker.id,
  };

  const schema = Yup.object({
    companyName: Yup.string().required('Bu alan zorunludur'),
    positionName: Yup.string().required('Bu alan zorunludur'),
    startDate: Yup.date().required('Bu alan zorunludur'),
    endDate: Yup.date(),
  });

  const handleJobExperienceSubmit = async (values) => {
    const jobExperienceData = {
      companyName: values.companyName,
      positionName: values.positionName,
      startDate: values.startDate,
      endDate: values.endDate,
      curriculumVitaeId: 69, // Replace with the actual curriculum vitae ID
      jobSeekerId: values.jobSeekerId,
    };

    try {
      const response = await jobExperienceService.add(jobExperienceData);
      toast.success('İş tecrübesi eklendi');
      history.push('/jobExperience');
    } catch (error) {
      toast.error('İş tecrübesi eklenirken bir hata oluştu');
    }
  };

  return (
    <Container style={{ marginBottom: '5em' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleJobExperienceSubmit}
      >
        <Form className="ui form">
          <Card fluid>
            <Card.Header style={{ backgroundColor: '#FBF7E4' }}>
              <h1 style={{ margin: '0.2em'}}  >İş Deneyimi Ekle</h1>
            </Card.Header>
            <Card.Content style={{ backgroundColor: '#FBF7E4' }}>
              <Card.Meta style={{ textAlign: 'left' }}>
                <label style={{  color :'black' , color: 'black'  }}>Şirket Adı</label>
                <HrmsLongTextInput name="companyName" placeholder="Şirket Adı" />
              </Card.Meta>
              <Card.Meta style={{ textAlign: 'left' }}>
                <label style={{ color :'black' }}>Pozisyon Adı</label>
                <HrmsLongTextInput name="positionName" placeholder="Pozisyon Adı" />
              </Card.Meta>
              <Card.Meta style={{ textAlign: 'left' }}>
                <label style={{color :'black' }}>İşe Başlama Tarihi</label>
                <HrmsDateInput name="startDate" placeholder="İşe Başlama Tarihi" />
              </Card.Meta>
              <Card.Meta style={{ textAlign: 'left' }}>
                <label style={{ color :'black'}}>İşten Ayrılma Tarihi</label>
                <HrmsDateInput name="endDate" placeholder="İşten Ayrılma Tarihi" />
              </Card.Meta>
              <Card.Content extra>
                <Button type="submit" floated="right" icon labelPosition="right" color="green">
                  Ekle
                  <Icon name="add" />
                </Button>
              </Card.Content>
            </Card.Content>
          </Card>
        </Form>
      </Formik>
    </Container>
  );
}

export default JobExperienceAdd;
