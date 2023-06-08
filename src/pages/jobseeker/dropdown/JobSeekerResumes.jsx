import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify';
import { Card, Button, Icon } from 'semantic-ui-react'

export default function JobSeekerResumes() {

    const history = useHistory();
    
    const [coverLetters, setCoverLetters] = useState([])

    useEffect(() => {
        // Simulating API call delay with setTimeout
        setTimeout(() => {
            const staticData = [
                { id: 1, description: 'Cover Letter 1' },
                { id: 2, description: 'Cover Letter 2' },
                { id: 3, description: 'Cover Letter 3' },
            ];
            setCoverLetters(staticData);
        }, 1000); // Delay for 1 second
    }, [])

    console.log(coverLetters)

    const handleClick = (id) => {
        history.push("/coverLetterUpdate/"+id)
    }

    const handleDeleteClick = (id) => {
        // Simulating API call delay with setTimeout
        setTimeout(() => {
            // Logic to delete the cover letter with the given id from the static data
            const newList = coverLetters.filter(coverLetter => coverLetter.id !== id);
            setCoverLetters(newList);
            toast.success("Cover letter deleted successfully");
        }, 500); // Delay for 0.5 seconds
    }

    const handleForwardClick = () => {
        history.push("/coverLetterAdd")
    }


    return (
        <Card fluid >
            <Card.Header>
                <h1 style={{ margin: "0.2em" }}>Summary
                    <Button onClick={handleForwardClick} color="green" floated="right" icon labelPosition="right">
                        <Icon name="add" />Add New
                    </Button>
                </h1>
            </Card.Header>
            {coverLetters.map(coverLetter => (
                <Card.Content key={coverLetter.id} >
                    <Card.Description>
                        <strong>{coverLetter?.description}</strong>
                        <Button
                            onClick={() => handleClick(coverLetter.id)}
                            style={{ opacity: "0.6" }}
                            size="tiny"
                            floated="right"
                            color="linkedin"
                            circular
                            icon='edit'
                        />
                        <Button
                            onClick={() => handleDeleteClick(coverLetter.id)}
                            style={{ opacity: "0.6" }}
                            size="tiny"
                            floated="right"
                            color="youtube"
                            circular
                            icon='trash'
                        />
                    </Card.Description>
                </Card.Content>
            ))}
        </Card>
    )
}
