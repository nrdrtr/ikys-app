import React, { useState, useEffect } from 'react';
import HrmsEditButton from '../../utilities/customFormControls/HrmsEditButton';

import { useHistory } from 'react-router-dom';
import { Card, CardContent, GridColumn} from 'semantic-ui-react';
import { SocialIcon } from 'react-social-icons';

import ResumeService from '../../services/ResumeService';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import AddToResume from './AddToResume';
import styled from 'styled-components';

export default function ResumeDetail() {
  const [resume, setResume] = useState({});
  const history = useHistory();
  const jobSeeker = useSelector((state) => state.auth.jobSeeker) || {};

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const resumeService = new ResumeService();
        const response = await resumeService.getByCandidateId(jobSeeker.id);
        setResume(response.data.data);
      } catch (error) {
        console.error('Hata: CV alınamadı:', error);
      }
    };

    if (jobSeeker.id) {
      fetchResume();
    }
  }, [jobSeeker.id]);

  const editPersonelInfoHandler = () => {
    history.push(`/employeeUpdate/${jobSeeker.id}`);
  };

  const editSocialMediaHandler = () => {
    history.push(`/employeeSocialMedia`);
  };

  const editSchoolHandler = () => {
    history.push(`/school`);
  };

  const editExperienceHandler = () => {
    history.push(`/jobExperience`);
  };

  const editLanguageHandler = () => {
    history.push(`/employeeLanguage`);
  };

  const editSkillHandler = () => {
    history.push(`/skill`);
  };

  if (!resume) {
    return <AddToResume />;
  }


  const StyledCard = styled(Card)`
  width: 50%;
  margin-bottom: 100px;`;

  return (
    <Container> 
      <h1>Özgeçmişim </h1>
    <div style={{ marginBottom: '1rem' }}>
      <Card fluid>
        <Card.Content><Card.Content extra>
            <HrmsEditButton name="edit" onClick={editPersonelInfoHandler} />
          </Card.Content>
          <Card.Header style={{ textAlign: 'left' }}> Hakkımda</Card.Header>
          <Card.Description>
          Cumhuriyet Üniversitesi Bilgisayar Mühendisliği son sınıf öğrencisiyim. Öğrencilik zamanım boyunca
Java, Spring Boot gibi alanlarda çalışmalarım mevcut.
 Şu anda Spring Boot ile bir İnsan
Kaynakları Yönetim Sistemi uygulaması geliştiriyorum. Backend tarafına olan ilgimin giderek arttığını düşünüyorum ve gelecekte bu alanda profesyonel olarak çalışmayı hedefliyorum.
          </Card.Description>
          
        </Card.Content>
      </Card>
    </div>
  
    <div style={{ display: 'flex', marginBottom: '1rem' }}>
    
      <Card.Group itemsPerRow={2} style={{ width: '110%' }}>
        <Card fluid>
          <Card.Content>
          <Card.Content width={2} verticalAlign="middle">
               <HrmsEditButton onClick={editSchoolHandler} />
             </Card.Content>
            <Card.Header   style={{ textAlign: 'left' }} >Eğitim Bilgileri</Card.Header>
            <Card.Description>
              {resume.educations?.map((education) => (
                <Card.Content key={education.id}>
                  <Card.Header>Okul Adı:{education.school.schoolName}</Card.Header>
                  <Card.Meta>Bölüm Adı:{education.department.departmentName}</Card.Meta>
                  <Card.Meta>Start Date: {education.startDate}</Card.Meta>
                  <Card.Meta>End Date: {education.endDate}</Card.Meta>
              </Card.Content>))}
            
               
            </Card.Description>
          </Card.Content>
        </Card>
  
        <Card fluid>
          <Card.Content>
             <Card.Content extra>
                <HrmsEditButton name="edit" onClick={editPersonelInfoHandler} />
              </Card.Content>
               <Card.Header style={{ textAlign: 'left' }}> İş Deneyimleri</Card.Header>
            <Card.Description>
              <Card.Content>
                <Card.Header>Şirket Adı</Card.Header>
                <Card.Meta> Pozisyon Adı</Card.Meta>
                <Card.Meta>Başlangıç Tarihi: 2021-07-15</Card.Meta>
                <Card.Meta> Bitiş Tarihi: 2021-07-15</Card.Meta>
              </Card.Content>
            
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  
    <div style={{ display: 'flex', marginBottom: '1rem' }}>
      <Card.Group itemsPerRow={3} style={{ width: '110%' }}>
        <Card fluid>
        
          
          <Card.Content> <Card.Content extra>
              <HrmsEditButton name="edit" onClick={editPersonelInfoHandler} />
              </Card.Content>
            <Card.Header style={{ textAlign: 'left' }}>Yabanıcı Diller</Card.Header>
            <Card.Description>
            {resume.jobseekerLanguages?.map((language) => (
              <Card.Content key={language.id}>
                <Card.Header>{language.language?.languageName}</Card.Header>
                <Card.Meta>orta</Card.Meta>
              </Card.Content>
            ))}
            
             
            </Card.Description>
          </Card.Content>
        </Card>
              
            
  
        <Card fluid>
          <Card.Content><Card.Content extra>
                <HrmsEditButton name="edit" onClick={editPersonelInfoHandler} />
              </Card.Content>
            <Card.Header style={{ textAlign: 'left' }}>Yetenekler</Card.Header>
            <Card.Description>
              {resume.skills?.map((skill) => (
                <Card.Content key={skill.id}>
                  <Card.Header>{skill.programmingLanguage}</Card.Header>
                  <Card.Meta>{skill.technologyName}</Card.Meta>
                </Card.Content>
              ))}
              
            </Card.Description>
          </Card.Content>
        </Card>
  
        <Card fluid>
          <Card.Content> <Card.Content extra>
                <HrmsEditButton name="edit" onClick={editPersonelInfoHandler} />
              </Card.Content>
            <Card.Header style={{ textAlign: 'left' }}>Sosyal Medya</Card.Header>
            <Card.Description>
              <Card.Content>
                <Card.Header><SocialIcon url="https://linkedin.com/in/nurullah-diri" /></Card.Header>
                 
                <a href=""><Card.Meta>https://www.linkedin.com/in/nurullah-diri/</Card.Meta></a>
              </Card.Content>
             
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  </Container>
  

  );
};

 




// import React, { useState, useEffect } from 'react';
//import HrmsEditButton from '../../utilities/customFormControls/HrmsEditButton';

// import { useHistory } from 'react-router-dom';
// import { Card, Grid, GridColumn, Image, Label, Rating } from 'semantic-ui-react';

// import ResumeService from '../../services/ResumeService';
// import { useSelector } from 'react-redux';
// import { Container } from '@mui/material';
// import AddToResume from './AddToResume';

// export default function ResumeDetail() {
//   const [resume, setResume] = useState({});
//   const history = useHistory();
//   const jobSeeker = useSelector((state) => state.auth.jobSeeker) || {};

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const resumeService = new ResumeService();
//         const response = await resumeService.getByCandidateId(jobSeeker.id);
//         setResume(response.data.data);
//       } catch (error) {
//         console.error('Hata: CV alınamadı:', error);
//       }
//     };

//     if (jobSeeker.id) {
//       fetchResume();
//     }
//   }, [jobSeeker.id]);

//   const editPersonelInfoHandler = () => {
//     history.push(`/employeeUpdate/${jobSeeker.id}`);
//   };

//   const editSocialMediaHandler = () => {
//     history.push(`/employeeSocialMedia`);
//   };

//   const editSchoolHandler = () => {
//     history.push(`/school`);
//   };

//   const editExperienceHandler = () => {
//     history.push(`/jobExperience`);
//   };

//   const editLanguageHandler = () => {
//     history.push(`/employeeLanguage`);
//   };

//   const editSkillHandler = () => {
//     history.push(`/skill`);
//   };

//   if (!resume) {
//     return <AddToResume />;
//   }

//   return (
//     <Container >
//       <Card.Group>
//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//               <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Hakkımda</h2>
//               </Card.Header>
//               <Card.Content>
//                 <Card.Header style={{ marginTop: '0.3em' }}>
//                   {resume.jobSeeker && `${resume.jobSeeker.name} ${resume.jobSeeker.surname}`}
//                 </Card.Header>
//                 <Card.Meta>{resume.jobSeeker?.email}</Card.Meta>
//                 <Card.Meta>{resume.jobSeeker?.birthDate}</Card.Meta>
//                 {resume.jobSeekerSocialMedia?.map((account) => (
//                   <Card.Content key={account.id}>
//                     <Card.Meta>
//                       {account.socialMedia?.socialMediaName} - {account.socialMedia?.socialMediaAdress}
//                     </Card.Meta>
//                     <Card.Content>
//                       <Card.Description>
//                         <strong>{resume.coverLetter?.description}</strong>
//                       </Card.Description>
//                     </Card.Content>
//                   </Card.Content>
//                 ))}
//               </Card.Content>
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editPersonelInfoHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>

//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//             <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Eğitim</h2>
//               </Card.Header>
//               {resume.educations?.map((education) => (
//                 <Card.Content key={education.id}>
//                   <Card.Header>{education.school.schoolName}</Card.Header>
//                   <Card.Meta>{education.department.departmentName}</Card.Meta>
//                   <Card.Meta>{education.school.schoolName}</Card.Meta>
//                   <Card.Description>
//                     <strong>
//                       {`${education.startDate} - ${education.endDate ? education.endDate : 'Devam Ediyor'}`}
//                     </strong>
//                   </Card.Description>
//                 </Card.Content>
//               ))}
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editSchoolHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>

//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//               <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Deneyim</h2>
//               </Card.Header>
//               {resume.jobExperiences?.map((experience) => (
//                 <Card.Content key={experience.id}>
//                   <Card.Header>{experience.positionName}</Card.Header>
//                   <Card.Meta>{experience.companyName}</Card.Meta>
//                   <Card.Description>
//                     <strong>
//                       {`${experience.startDate} - ${experience.endDate ? experience.endDate : 'Devam Ediyor'}`}
//                     </strong>
//                   </Card.Description>
//                 </Card.Content>
//               ))}
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editExperienceHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>
        


//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//             <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Diller</h2>
//               </Card.Header>
//               {resume.jobseekerLanguages?.map((language) => (
//                 <Card.Content key={language.id}>
//                   <Card.Header>
//                     {`${language.language.languageName} `}
//                     <Rating
//                       style={{ marginLeft: '1em' }}
//                       defaultRating={language.languageLevel}
//                       maxRating={5}
//                       disabled
//                     />
//                   </Card.Header>
//                 </Card.Content>
//               ))}
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editLanguageHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>

//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//             <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Yetenekler</h2>
//               </Card.Header>
//               {resume.skills?.map((skill) => (
//                 <Card.Content key={skill.id}>
//                   <Label color="blue">{skill.programmingLanguage}</Label>
//                   <Label color="orange">{skill.technologyName}</Label>
//                 </Card.Content>
//               ))}
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editSkillHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>

//         <Card fluid>
//           <Grid>
//             <GridColumn width={14}>
//             <Card.Header style={{ textAlign: 'left' }}>
//                 <h2 style={{ margin: '0.2em' }}>Sosyal Medya</h2>
//               </Card.Header>
//               {resume.jobSeekerSocialMedia?.map((socialMedia) => (
//                 <Card.Content key={socialMedia.id}>
//                   <Label color="blue">{socialMedia.socialMedia.socialMediaName}</Label>
//                   <Label color="orange">{socialMedia.socialMedia.socialMediaAdress}</Label>
//                 </Card.Content>
//               ))}
//             </GridColumn>
//             <GridColumn width={2} verticalAlign="middle">
//               <HrmsEditButton onClick={editSocialMediaHandler} />
//             </GridColumn>
//           </Grid>
//         </Card>

        
//       </Card.Group>
//     </Container>
//   );
// }





