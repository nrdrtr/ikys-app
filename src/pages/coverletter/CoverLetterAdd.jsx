import React, { useState } from 'react';
import { Card, Grid, GridColumn, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CoverLetterAdd() {
  const history = useHistory();

  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      description: "Bu bir özet açıklamadır.",
      employee: { id: 7 }
    },
    {
      id: 2,
      description: "Bu da başka bir özet açıklamadır.",
      employee: { id: 7 }
    }
  ]);

  const initialValues = {
    description: "",
    employeeId: "7", //to-do login den bilgi alacak
    educations: [
      {
        schoolName: "",
        departmentName: ""
      }
    ],
    jobExperiences: [
      {
        companyName: "",
        positionName: ""
      }
    ],
    jobseekerLanguages: [
      {
        languageName: "",
        languageLevel: ""
      }
    ],
    technologies: [
      {
        technologyName: ""
      }
    ]
  };

  const schema = Yup.object({
    description: Yup.string().required("Açıklama zorunludur"),
    educations: Yup.array().of(
      Yup.object().shape({
        schoolName: Yup.string().required("Okul adı zorunludur"),
        departmentName: Yup.string().required("Bölüm adı zorunludur")
      })
    ),
    jobExperiences: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().required("Şirket adı zorunludur"),
        positionName: Yup.string().required("Pozisyon adı zorunludur")
      })
    ),
    jobseekerLanguages: Yup.array().of(
      Yup.object().shape({
        languageName: Yup.string().required("Dil adı zorunludur"),
        languageLevel: Yup.number().required("Dil seviyesi zorunludur")
      })
    ),
    technologies: Yup.array().of(
      Yup.object().shape({
        technologyName: Yup.string().required("Teknoloji adı zorunludur")
      })
    )
  });

  const handleCoverLetterValue = (values) => {
    return {
      id: coverLetters.length + 1, // Generate a unique id for the new cover letter
      description: values.description,
      employee: { id: values.employeeId }
    };
  };

  const handleSubmit = (values) => {
    const newCoverLetter = handleCoverLetterValue(values);
    setCoverLetters([...coverLetters, newCoverLetter]);
    toast.success("Özet bilgi eklendi");
    history.push("/coverLetters");
  };

  const addCoverLetter = (values) => {
    axios.post("http://localhost:8080/api/coverLetters/add", values)
      .then((response) => {
        setCoverLetters([...coverLetters, response.data]);
        toast.success("Özet bilgi eklendi");
        history.push("/coverLetters");
      })
      .catch((error) => {
        toast.error("Özet bilgisi eklenirken bir hata oluştu");
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={addCoverLetter}
    >
      {({ values }) => (
        <Form className="ui form">
          <Card fluid>
            <Grid>
              <GridColumn width={10}>
                <Card.Header>
                  <h1 style={{ margin: "0.2em" }}>Summary</h1>
                </Card.Header>
              </GridColumn>
            </Grid>
            <Card.Content>
              <Card.Description>
                <Grid>
                  <GridColumn width={16}>
                    <h3>Açıklama</h3>
                    <Field name="description" as="textarea" placeholder="Açıklama" />
                    <ErrorMessage name="description" component="div" className="ui error message" />
                  </GridColumn>
                </Grid>

                {/* Rest of the code */}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button type="submit" floated="right" icon labelPosition="right" color="green">
                Ekle<Icon name="add" />
              </Button>
            </Card.Content>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default CoverLetterAdd;
