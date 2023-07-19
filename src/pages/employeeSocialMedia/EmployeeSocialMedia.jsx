import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Table, Card, Button, Icon, Container } from 'semantic-ui-react'
import EmployeeSocialMediaService from '../../services/employeeSocialMediaService';
import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';

function EmployeeSocialMedia() {

    const history = useHistory();

    const [employeeSocialMedias, setEmployeeSocialMedias] = useState([]);

    useEffect(() => {
        let employeeSocialMediaService = new EmployeeSocialMediaService();
        employeeSocialMediaService.getAllByEmployeeId(6).then(result => setEmployeeSocialMedias(result.data.data));
    }, [])

    console.log(employeeSocialMedias)

    const handleClick = (id) => {
        history.push("/employeeSocialMediaUpdate/" + id)
    }

    const handleForwardClick = () => {
        history.push("/employeeSocialMediaAdd")
    }

    const handleDeleteClick = (id) => {
        let employeeSocialMediaService = new EmployeeSocialMediaService();
        employeeSocialMediaService.delete(id).then(response => toast.success(response.data.message))
        .catch(error=>toast.error("işlem tamamlanamadı")); 

        let newList = employeeSocialMedias.filter(employeeSocialMedia => {
            return employeeSocialMedia.id !== id
        });

        setEmployeeSocialMedias(newList);
    }

    return (
        <Container style  = {{marginBottom : "5em"}}> 
        <Card fluid>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        
                        <Table.HeaderCell width="3">Sosyal Medya </Table.HeaderCell>
                        <Table.HeaderCell width="7">Sosyal Medya Adres </Table.HeaderCell>
                        <Table.HeaderCell width="4">
                            <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                                <Icon name="add" />
                                yeni ekle
                             </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employeeSocialMedias.map(employeeSocialMedia => (
                        <Table.Row key={employeeSocialMedia.id}>
                            <Table.Cell>{employeeSocialMedia.id}</Table.Cell>
                            <Table.Cell>{employeeSocialMedia.socialMedia.socialMediaName}</Table.Cell>
                            <Table.Cell>{employeeSocialMedia.socialMediaAdress}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => handleClick(employeeSocialMedia.id)} style={{ opacity: "0.6" }} size="tiny" floated="right" color="linkedin" circular icon='edit' />
                                <HrmsModalDeleteButton onClick={() => handleDeleteClick(employeeSocialMedia.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Card>
        </Container>
    )
}

export default EmployeeSocialMedia
