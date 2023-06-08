
import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
//import HrmsLongTextInput from '../../utilities/customFormControls/HrmsLongTextInput'
import { Card, Grid, GridColumn, Button, Icon } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router'

function CoverLetterEdit() {
  let { id } = useParams();
  const history = useHistory();

  const [coverLetter, setCoverLetter] = useState({})

  useEffect(() => {
    // Simulating API call delay with setTimeout
    setTimeout(() => {
      const coverLetterData = {
        id: id,
        description: 'Sample Cover Letter',
        employee: { id: 7 }
      };
      setCoverLetter(coverLetterData);
    }, 1000); // Delay for 1 second
  }, [id])

  console.log(coverLetter.employee?.id)

  const initialValues = {
    id: coverLetter.id,
    description: coverLetter.description || "",
    employeeId: coverLetter.employee?.id
  }

  const schema = Yup.object({
    description: Yup.string().required("Açıklama zorunludur"),
  })

  const handleCoverLetterValue = (values) => {
    return {
      id: values.id,
      description: values.description,
      employee: { id: values.employeeId }
    }
  }

  const handleSubmit = (values) => {
    const updatedCoverLetter = handleCoverLetterValue(values);
    setCoverLetter(updatedCoverLetter);
    toast.success("Özet bilgi güncellendi");
    history.push("/coverLetters");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className="ui form">
        <Card fluid>
          <Grid>
            <GridColumn width="10">
              <Card.Header>
                <h1 style={{ margin: "0.2em" }}>Summary</h1>
              </Card.Header>
            </GridColumn>
          </Grid>
          <Card.Content>
            <Card.Description>
              {/* <HrmsLongTextInput name="description" placeholder="description" /> */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button type="submit" floated="right" icon labelPosition="right" color="green">
              Güncelle<Icon name="add" />
            </Button>
          </Card.Content>
        </Card>
      </Form>
    </Formik>
  )
}

export default CoverLetterEdit;
