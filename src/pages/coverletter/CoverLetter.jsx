import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify';
import { Card, Button, Icon } from 'semantic-ui-react'
 import HrmsModalDeleteButton from '../../utilities/customFormControls/HrmsModalDeleteButton';
import { useSelector } from 'react-redux';
import CoverLetterService from '../../services/CoverLetterService ';

export default function CoverLetter() {

    const history = useHistory();
    const jobSeeker = useSelector((state) => state.auth.jobSeeker);
    
    const [coverLetters, setCoverLetters] = useState([])

    useEffect(() => {
        let coverLetterService = new CoverLetterService();
        coverLetterService.getAllByEmployeeId(jobSeeker.id).then(result => setCoverLetters(result.data.data))
    }, [])

    console.log(coverLetters)

    const handleClick = (id) => {
        history.push("/coverLetterUpdate/"+id)
    }

    const handleDeleteClick = (id) => {
        let coverLetterService = new CoverLetterService();
        coverLetterService.delete(id).then(result=> toast.success(result.data.message))
        .catch(error=>toast.error("işlem tamamlanamadı")); 

        let newList = coverLetters.filter(coverLetter=> {
            return coverLetter.id !== id
        });

        setCoverLetters(newList)
    }

    const handleForwardClick = () => {
        history.push("/coverLetterAdd")
    }


    return (
        <Card fluid >
            <Card.Header><h1 style={{ margin: "0.2em" }}>Hakkımda
            <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                    <Icon name="add" />Oluştur</Button></h1></Card.Header>
            {coverLetters.map(coverLetter => (
                <Card.Content key={coverLetter.id} >
                    <Card.Description>
                        <strong>{coverLetter?.description}</strong>
                        <Button onClick={()=>handleClick(coverLetter.id)} style={{opacity: "0.6"}} size="tiny" floated="right" color="linkedin"  circular icon='edit' />
                        <HrmsModalDeleteButton style={{ opacity: "0.6" }} circular color="youtube" size="tiny" floated="right" icon='trash' onClick={()=>handleDeleteClick(coverLetter.id)} />
                    </Card.Description>
                </Card.Content>
            ))}
        </Card>
    )
}
