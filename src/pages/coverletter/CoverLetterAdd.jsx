import { Formik, Form } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import HrmsLongTextInput from '../../utilities/customFormControls/HrmsLongTextInput'
import { Card, Grid, GridColumn, Button, Icon, Container } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import CoverLetterService from '../../services/CoverLetterService '

function CoverLetterAdd() {

    const history = useHistory();
    const jobSeeker = useSelector((state) => state.auth.jobSeeker);


    const initialValues = {
        description: "",
        employeeId: jobSeeker.id,
        curriculumVitaeId: 2
    }

    const schema = Yup.object({
        description: Yup.string().required("Açıklama zorunludur"),
    })

    const handleCoverLetterValue = (values) => {
        return {
            description: values.description,
            employee: { id: values.employeeId },
            curriculumVitae: { id: values.curriculumVitaeId }

        }
    }

    return (
        <Container style={{ marginBottom: '5em' }}>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
            let coverLetterService = new CoverLetterService();
            coverLetterService
              .add(handleCoverLetterValue(values))
              .then(toast.success("Özet bilgi eklendi"));
            history.push("/coverLetters");
          }}
        >
          <Form className="ui form">
          <Card fluid style={{ backgroundColor: '#FBF7E4' }}>
            
               
             
              <Card.Content style={{ textAlign: 'left' }}>  <Card.Header textAlign="center">
                  <h1 style={{ margin: "0.2em", color: 'black' }}>Hakkımda Ekle</h1>
                </Card.Header>  
                <Card.Description  style  = {{ color:'black'}}>
                    <label  >Kendini Tanıt</label>
                  <HrmsLongTextInput
                    name="description"
                    placeholder="Örn: Yazılım geliştiriciyim..."
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  type="submit"
                  floated="right"
                  icon
                  labelPosition="right"
                  color="green"
                >
                  Ekle<Icon name="add" />
                </Button>
              </Card.Content>
            </Card>
          </Form>
        </Formik>
      </Container>
      
    )
}

export default CoverLetterAdd
