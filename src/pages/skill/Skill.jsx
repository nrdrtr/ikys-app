import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Label, Card, Icon, Container } from 'semantic-ui-react'
import SkillService from '../../services/skillService'
import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';
import { useSelector } from 'react-redux';

function Skill() {

    const [skills, setSkills] = useState([]);
    const jobSeeker = useSelector(state => state.auth.jobSeeker)

    const history = useHistory();

    useEffect(() => {
        let skillService = new SkillService();
        skillService.getAllByEmployeeId(jobSeeker.id).then(result => setSkills(result.data.data))
    }, [])

    const handleClick = (id) => {
        history.push("/skillUpdate/" + id)
    }

    const handleDeleteClick = (id) => {
        let skillService = new SkillService();
        skillService.delete(id).then(result => toast.success(result.data.message))
            .catch(error => toast.error("işlem tamamlanamadı"));

        let newList = skills.filter(skill => {
            return skill.id !== id
        });

        setSkills(newList)
    }

    const handleForwardClick = () => {
        history.push("/skillAdd")
    }

    return (
        <Container style  = {{marginBottom : "5em"}}>
        <Card fluid>
            <Card.Header><h1 style={{ margin: "0.2em" }}>Beceriler - Programlama Dili ve Teknolojisi
            <Button onClick={() => handleForwardClick()} color="green" floated="right" icon labelPosition="right">
                    <Icon name="add" />Ekle</Button>
            </h1></Card.Header>
            {skills.map((skill) => (
                <Card.Content key={skill.id}>
                    <Button onClick={() => handleClick(skill.id)} style={{ opacity: "0.6" }} size="tiny" floated="right" color="linkedin" circular icon='edit' />
                    <HrmsModalDeleteButton onClick={() => handleDeleteClick(skill.id)} />
                    <Label style={{ margin: "0.5em" }} color="blue">
                        {skill.programmingLanguage}
                    </Label>
                    <Label style={{ margin: "0.5em" }} color="orange">
                        {skill.technologyName}
                    </Label>
                </Card.Content>
            ))}
        </Card>
    </Container>
    )
}

export default Skill
