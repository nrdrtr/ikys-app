import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Card, Container, Icon, Rating } from 'semantic-ui-react'
import EmployeeLanguageService from '../../services/employeeLanguageService';
import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';
import { useSelector } from 'react-redux';

function EmployeeLanguage() {

    const history = useHistory();
    const jobSeeker = useSelector((state) => state.auth.jobSeeker);
    const [employeeLanguages, setEmployeeLanguages] = useState([]);


    useEffect(() => {
        let employeeLanguageService = new EmployeeLanguageService();
        employeeLanguageService.getAllByEmployeeId(jobSeeker.id).then(result => setEmployeeLanguages(result.data.data))
    }, [])

    console.log(employeeLanguages)

    const handleUpdateClick = (id) => {
        history.push("/employeeLanguageUpdate/" + id)
    }

    const handleDeleteClick = (id) => {
        let employeeLanguageService = new EmployeeLanguageService();
        employeeLanguageService.delete(id).then(response => toast.success(response.data.message))
            .catch(error => toast.error("işlem tamamlanamadı")); //database cascade kurallarına bak. Eğer işlem başarısızsa ekrandan silinmemesi gerekir

        let newList = employeeLanguages.filter(employeeLanguage => {
            return employeeLanguage.id !== id
        });

        setEmployeeLanguages(newList);
    }

    const handleForwardClick = () => {
        history.push("/employeeLanguageAdd")
    }

    return (
        <Container style  = {{marginBottom : "5em"}}>
            <Card fluid>
                <Card.Header><h1 style={{ margin: "0.2em" }}>Yabancı Dil
                <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                        <Icon name="add" />Oluştur</Button></h1></Card.Header>
                {employeeLanguages?.map(employeeLanguage => (
                    <Card.Content key={employeeLanguage.id}>
                        <Card.Header>{employeeLanguage.language.languageName}
                            <Rating style={{ marginLeft: "1em" }} defaultRating={employeeLanguage.languageLevel} maxRating={5} disabled />
                            <Button onClick={() => handleUpdateClick(employeeLanguage.id)} style={{ opacity: "0.6" }} size="tiny" floated="right" color="linkedin" circular icon='edit' />
                            <HrmsModalDeleteButton onClick={() => handleDeleteClick(employeeLanguage.id)} />
                        </Card.Header>
                    </Card.Content>
                ))}
            </Card>
            </Container>
    )
}

export default EmployeeLanguage
