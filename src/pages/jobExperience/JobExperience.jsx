import React, { useState, useEffect } from 'react'
import JobExperienceService from '../../services/jobExperienceService'
import {Card, Button, Icon, Container} from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify';
import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';
import { useSelector } from 'react-redux';

function JobExperience() {

    const history = useHistory();

    const [jobExperiences, setJobExperiences] = useState([])
    const jobSeeker = useSelector(state => state.auth.jobSeeker)


    useEffect(() => {
        let jobExperienceService = new JobExperienceService();
        jobExperienceService.getAllByEmployeeIdOrderByJobLeaveDateDesc(jobSeeker.id).then(result => setJobExperiences(result.data.data))

    }, [])

    const handleClick = (id) => {
        history.push("/jobExperienceUpdate/"+id)
    }

    const handleDeleteClick = (id) => {
        let jobExperienceService = new JobExperienceService();
        jobExperienceService.delete(id).then(result=> toast.success(result.data.message))
        .catch(error=>toast.error("işlem tamamlanamadı")); 

        let newList = jobExperiences.filter(jobExperience=> {
            return jobExperience.id !== id
        });

        setJobExperiences(newList)
    }

    const handleForwardClick = () => {
        history.push("/jobExperienceAdd")
    }


    return (
        <Container style  = {{marginBottom : "5em"}}>
        <Card fluid>
            <Card.Header><h1 style={{ margin: "0.2em" }}>Deneyimler
            <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                    <Icon name="add" />Oluştur</Button>
            </h1></Card.Header>
            {jobExperiences?.map((jobExperience) => (
                <Card.Content key={jobExperience.id} >
                    <Button onClick={()=>handleClick(jobExperience.id)} style={{opacity: "0.6"}} size="tiny" floated="right" color="linkedin"  circular icon='edit' />
                    <HrmsModalDeleteButton onClick={()=> handleDeleteClick(jobExperience.id)}/>     
                    <Card.Header>{jobExperience.positionName}</Card.Header>
                    <Card.Meta>{jobExperience.companyName}</Card.Meta>
                    <Card.Description>
                        <strong>{jobExperience.startDate} - {jobExperience.endDate ? jobExperience.endDate : "Devam Ediyor"}</strong>
                    </Card.Description>
                </Card.Content>
            ))}
        </Card>
        </Container>
    )
}

export default JobExperience
