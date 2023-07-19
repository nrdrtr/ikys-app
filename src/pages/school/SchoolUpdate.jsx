import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Card, Grid, GridColumn, Button, Icon, Container } from 'semantic-ui-react'
import * as Yup from 'yup'

import HrmsDateInput from '../../utilities/customFormControls/HrmsDateInput'
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput'
import SchoolService from '../../services/schoolService'
import { useSelector } from 'react-redux'

function SchoolUpdate() {

    let { id } = useParams();

    const [school, setSchool] = useState({})
    const jobSeeker = useSelector(state => state.auth.jobSeeker)

    useEffect(() => {
        let schoolService = new SchoolService();
        schoolService.getById(id).then(result => setSchool(result.data.data))
    }, [id])

    console.log(school?.resume)

    const history = useHistory()

    const initialValues = {
        id: school.id,
        schoolName: school.schoolName || "",
        departmentName: school.departmentName || "",
        schoolStartDate: school.schoolStartDate || "",
        schoolGraduationDate: school.schoolGraduationDate || "",
        employeeId: school.employee?.id || "",
        resumeId: school.resume?.id || ""
    }

    const schema = Yup.object({
        schoolName: Yup.string().required("Okul bilgisi zorunludur"),
        departmentName: Yup.string().required("Departman bilgisi zorunludur"),
        schoolStartDate: Yup.date().required("Tarih giriniz"),
        schoolGraduationDate: Yup.date()
    })

    const handleSchoolSubmit = (values) => {
        return {
            id: values.id,
            schoolName: values.schoolName,
            departmentName: values.departmentName,
            schoolStartDate: values.schoolStartDate,
            schoolGraduationDate: values.schoolGraduationDate,
            employee: { id: values.employeeId },
            resume: { id: values.resumeId }
        }
    }

    return (
        <Container style={{ marginBottom: "5em" }}>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                enableReinitialize
                onSubmit={(values) => {
                    console.log(values);
                    let schoolService = new SchoolService();
                    schoolService.add(handleSchoolSubmit(values)).then(toast.success("Eğitim bilgisi eklendi"))
                    history.push("/school")
                }}
            >
                <Form className="ui form">
                    <Card fluid>
                        <Grid>
                            <GridColumn width="10">
                                <Card.Header><h1 style={{ margin: "0.2em" }}>Eğitimler</h1></Card.Header>
                            </GridColumn>
                        </Grid>
                        <Card.Content>
                            <Card.Description>
                                <label style={{ margin: "0.5em" }}>Okul Adı</label>
                                <HrmsTextInput name="schoolName" placeholder="schoolName" />
                            </Card.Description>
                            <Card.Description>
                                <label style={{ margin: "0.5em" }}>Bölüm Adı</label>
                                <HrmsTextInput name="departmentName" placeholder="departmentName" />
                            </Card.Description>
                            <Card.Description>
                                <label style={{ margin: "0.5em" }}>Başlangıç Tarihi </label><HrmsDateInput name="schoolStartDate" placeholder="schoolStartDate" />
                            </Card.Description>
                            <Card.Description>
                                <label style={{ margin: "0.5em" }}>Mezuniyet Tarihi</label><HrmsDateInput name="schoolGraduationDate" placeholder="schoolGraduationDate" />
                            </Card.Description>
                            <Card.Content extra>
                                <Button style={{ margin: "0.5em" }} type="submit" floated="right" icon labelPosition="right" color="green" >Update<Icon name="add"></Icon></Button>
                            </Card.Content>
                        </Card.Content>
                    </Card>
                </Form>
            </Formik>
        </Container>
    )
}

export default SchoolUpdate

