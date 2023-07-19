import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobSeekerService from '../../../services/JobSeekerService';
import { Container, Table, Button } from 'semantic-ui-react';
import HrmsModalDeleteButton from '../../../utilities/customFormControls/HrmsModalDeleteButton';

const JobSeekerApplication = () => {
    const [applications, setApplications] = useState([]);
    const jobSeeker = useSelector((state) => state.auth.jobSeeker);
    const jobseekerService = new JobSeekerService();

    useEffect(() => {
        const fetchJobseekerApplications = async () => {
            try {
                const response = await jobseekerService.getApplicationsByJobSeekerId(jobSeeker.id);
                setApplications(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobseekerApplications();
    }, [jobSeeker.id]);

    const getColorClass = (status) => {
        if (status === 'pending') {
            return '# ';
        } else if (status === 'rejected') {
            return '# ';
        } else if (status === 'Approved') {
            return '# ';
        }
    };

    const handleCancelApplication = async (applicationId) => {
        try {
            await jobseekerService.cancelApplication(applicationId);
            setApplications(applications.filter((application) => application.id !== applicationId));
        } catch (error) {
            console.error(error);
        }
    };

    const renderDeleteButton = (advertisementId) => {
        return (
            <HrmsModalDeleteButton color="red" onClick={() => handleCancelApplication(advertisementId)}>
                Sil
            </HrmsModalDeleteButton>
        );
    };

    return (
        <div>
            <Container style={{ height: '95vh', margin: '20px', backgroundColor: '#FBF7E4' }}>
                <h1>Başvurularım</h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>İş Başlığı</Table.HeaderCell>
                            <Table.HeaderCell>İşveren</Table.HeaderCell>
                            <Table.HeaderCell>Durum</Table.HeaderCell>
                            <Table.HeaderCell>İşlemler</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {applications.map((application) => (
                            <Table.Row key={application.id}>
                                <Table.Cell>{application.jobPositionTitle}</Table.Cell>
                                <Table.Cell>{application.employerName}</Table.Cell>
                                <Table.Cell style={{ backgroundColor: getColorClass(application.status) }}>
                                    {application.status === 'pending'
                                        ? 'Beklemede'
                                        : application.status === 'rejected'
                                        ? 'Reddedildi'
                                        : 'Onaylandı'}
                                </Table.Cell>
                                <Table.Cell>
                                    {renderDeleteButton(application.advertisementId)}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Container>
        </div>
    );
};

export default JobSeekerApplication;
