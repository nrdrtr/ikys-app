import React, { useState, useEffect } from 'react';
import { Card, Button, Icon, Container } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import EmployeeSocialMediaService from '../../services/employeeSocialMediaService';
import HrmsSelectInput from '../../utilities/customFormControls/HrmsSelectInput';
import SocialMediaService from '../../services/socialMediaService';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';
import { useSelector } from 'react-redux';

function EmployeeSocialMediaAdd() {
  const history = useHistory();
  const [socialMediaNames, setSocialMediaNames] = useState([]);
  const jobSeeker = useSelector(state => state.auth.jobSeeker)


  useEffect(() => {
    const fetchSocialMediaNames = async () => {
      try {
        const socialMediaService = new SocialMediaService();
        const response = await socialMediaService.getAllSocialMedias();
        setSocialMediaNames(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSocialMediaNames();
  }, []);

  const socialMediaNameOptions = socialMediaNames.map((socialMediaName, index) => ({
    key: index,
    text: socialMediaName.socialMediaName,
    value: socialMediaName.id,
  }));

  const initialValues = {
    socialMediaId: "",
    socialMediaAdress: "",
    employeeId: jobSeeker.id,
    resumeId: 68,
  };

  const validationSchema = Yup.object({
    socialMediaId: Yup.number().required("Giriş zorunludur"),
    socialMediaAdress: Yup.string().required("Giriş zorunludur"),
  });

  const handleValue = (values) => {
    return {
      socialMediaAdress: values.socialMediaAdress,
      socialMedia: { id: values.socialMediaId },
      employee: { id: values.employeeId },
      resume: { id: values.resumeId },
    };
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const employeeSocialMediaService = new EmployeeSocialMediaService();
      const response = await employeeSocialMediaService.add(handleValue(values));
      toast.success(response.data.message);
      history.push("/employeeSocialMedia");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ marginBottom: "5em" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form ui">
          <Card fluid style={{ backgroundColor: '#FBF7E4' }}>
            <Card.Header>
              <h1 style={{ margin: "0.2em" }}> Sosyal Medya Ekle </h1>
            </Card.Header>
            <Card.Content style={{ textAlign: 'left' }}>
              <label style={{ color: 'black' }}> Sosyal Medya Adı </label>
              <HrmsSelectInput
                options={socialMediaNameOptions}
                name="socialMediaId"
                placeholder=" Seçiniz"

              />
            </Card.Content>
            <Card.Content style={{ textAlign: 'left' }}>
              <label style={{ color: 'black' }}> Sosyal Medya Adresi </label>

              <HrmsTextInput
                name="socialMediaAdress"
                placeholder="Sosyal Medya Adresi"
              />
            </Card.Content>
            <Card.Content >
              <Button
                style={{ margin: "0.5em" }}
                type="submit"
                floated="right"
                icon
                labelPosition="right"
                color="green"
              >
                Ekle <Icon name="add" />
              </Button>
            </Card.Content>
          </Card>
        </Form>
      </Formik>
    </Container>
  );
}

export default EmployeeSocialMediaAdd;
