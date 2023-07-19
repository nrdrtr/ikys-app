import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, Button, Icon, Container } from 'semantic-ui-react'
import SchoolService from '../../services/schoolService';
import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';
import { useSelector } from 'react-redux';

function School() {

    const history = useHistory();

    const [schools, setSchools] = useState([])
    const jobSeeker = useSelector((state) => state.auth.jobSeeker);


    useEffect(() => {
        let schoolService = new SchoolService();
        schoolService.findAllByEmployeeIdOrderBySchoolGraduationDateDesc(jobSeeker.id).then(result => setSchools(result.data.data))
    }, [])

    console.log(schools)

    const handleClick = (id) => {
        history.push("/schoolUpdate/" + id)
    }

    const handleDeleteClick = (id) => {
        let schoolService = new SchoolService();
        schoolService.delete(id).then(result => toast.success(result.data.message))
            .catch(error => toast.error("işlem tamamlanamadı")); 
        let newList = schools.filter(school => {
            return school.id !== id
        });

        setSchools(newList)
    }

    const handleForwardClick = () => {
        history.push("/school/add/"+jobSeeker.id)
    }

    return (
        <Container style={{ marginBottom: "5em" }}>
        <Card fluid>
            <Card.Header><h1 style={{ margin: "0.2em" }}>Eğitim Bilgileri
            <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                    <Icon name="add" />Ekle</Button></h1></Card.Header>
            {schools?.map((school) => (
                <Card.Content key={school.id}>
                    <Card.Header>{school.school.schoolName}</Card.Header>
                    <Button onClick={() => handleClick(school.id)} style={{ opacity: "0.6" }} size="tiny" floated="right" color="linkedin" circular icon='edit' />
                    <HrmsModalDeleteButton onClick={() => handleDeleteClick(school.id)} />
                    <Card.Meta>{school.department.departmentName}</Card.Meta>
                    <Card.Description>
                        <strong>{school.startDate} - {school.endDate ? school.endDate : "Devam Ediyor"}</strong>
                    </Card.Description>
                </Card.Content>
            ))}
        </Card>
        </Container>
    )
}

export default School
