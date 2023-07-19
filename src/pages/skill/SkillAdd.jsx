import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Card, Container, Icon } from 'semantic-ui-react';
import * as Yup from 'yup';
import SkillService from '../../services/skillService';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';
import { useSelector } from 'react-redux';

function SkillAdd() {
  const jobSeeker = useSelector((state) => state.auth.jobSeeker);
  const history = useHistory();

  const initialValues = {
    programmingLanguage: '',
    technologyName: '',
  };

  const schema = Yup.object({
    programmingLanguage: Yup.string().required('Giriş yapınız'),
    technologyName: Yup.string().required('Giriş yapınız'),
  });

  const handleSkillSubmit = async (values) => {
    const { programmingLanguage, technologyName } = values;
    const skillData = {
      programmingLanguage,
      technologyName,
      curriculumVitaeId: 69, // Replace with the actual CV ID
      jobSeekerId: jobSeeker.id,
    };

    try {
      const skillService = new SkillService();
      const response = await skillService.add(skillData);
      toast.success(response.data.message);
      history.push('/skill');
    } catch (error) {
      toast.error('Bir hata oluştu');
      console.error(error);
    }
  };

  return (
    <Container style={{ marginBottom: '5em' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSkillSubmit}
      >
        <Form className="form ui">
          <Card fluid style={{ backgroundColor: '#FBF7E4' }}>
            <Card.Header>
              <h1 style={{ margin: '0.2em' }}>Yetenek Ekle</h1>
            </Card.Header>
            <Card.Content style={{ textAlign: 'left' }}>
              <label style={{ margin: '0.5em', color: 'black'  }}>Programlama  Dili</label>
              <HrmsTextInput
                name="programmingLanguage"
                placeholder="  Programlama dili"
              />
            </Card.Content>
            <Card.Content style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: 'black'  }}>Programlama Teknolojisi</label>
              <HrmsTextInput
                name="technologyName"
                placeholder="Teknoloji adı"
              />
            </Card.Content>
            <Card.Content extra>
              <Button type="submit" floated="right" icon labelPosition="right" color="green">
                Ekle
                <Icon name="add" />
              </Button>
            </Card.Content>
          </Card>
        </Form>
      </Formik>
    </Container>
  );
}

export default SkillAdd;
