import React from 'react';
import { Container, Grid, Image, Table } from 'semantic-ui-react';
import { styled } from 'styled-components';

const JobSeekerDetails = () => {

  
  const jobSeekerDetails = {
    success: true,
    message: "string",
    data: {
      id: 0,
      imageUrl: "https://res.cloudinary.com/dztwwdpj9/image/upload/v1688248684/a7slxqosjqvoovqkmcrh.png",
      coverLetter: "Cumhuriyet Üniversitesi Bilgisayar Mühendisliği son sınıf öğrencisiyim. Öğrencilik zamanım boyunca Java, Spring Boot gibi alanlarda çalışmalarım mevcut. Backend tarafına olan ilgimin giderek arttığını düşünüyorum ve gelecekte bu alanda profesyonel olarak çalışmayı hedefliyorum",
      jobSeeker: {
        id: 6,
        userType: "string",
        passwordAgain: "string",
        verified: true,
        email: "nurullahdiri875@gmail.com",
        name: "NURULLAH",
        surname: "DİRİ",
        birthDate: "2000-08-31",
      },
      jobSeekerSocialMedia: [
        {
          id: 0,
          socialMedia: {
            id: 0,
            socialMediaName: "string"
          },
          socialMediaAdress: "string",
          jobSeeker: {
            id: 0,
            userType: "string",
            passwordAgain: "string",
            verified: true
          }
        }
      ],
      educations: [
        {
          id: 0,
          startDate: "2023-07-16",
          endDate: "2023-07-16",
          school: {
            id: 0,
            schoolName: "string"
          },
          department: {
            id: 0,
            departmentName: "string"
          },
          jobSeeker: {
            id: 0,
            userType: "string",
            passwordAgain: "string",
            verified: true
          }
        }
      ],
      jobExperiences: [
        {
          id: 0,
          companyName: "string",
          positionName: "string",
          startDate: "2023-07-16",
          endDate: "2023-07-16",
          jobSeeker: {
            id: 0,
            userType: "string",
            passwordAgain: "string",
            verified: true
          }
        }
      ],
      jobseekerLanguages: [
        {
          id: 0,
          languageLevel: 5,
          language: {
            id: 0,
            languageName: "string"
          },
          jobSeeker: {
            id: 0,
            userType: "string",
            passwordAgain: "string",
            verified: true
          }
        }
      ],
      skills: [
        {
          id: 0,
          programmingLanguage: "string",
          technologyName: "string",
          jobSeeker: {
            id: 0,
            userType: "string",
            passwordAgain: "string",
            verified: true
          }
        }
      ]
    }
  };

  const {
    imageUrl,
    jobSeeker,
    coverLetter,
    educations,
    jobExperiences,
    jobseekerLanguages,
    skills
  } = jobSeekerDetails.data;

  return (
    <Container style={{ marginBottom: '5em' }}>
  <h2>İş Arayan Bilgileri</h2>
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell width={4}>
          <div className="col-md-4 text-center">
            <Image src={imageUrl} alt="İş Arayan" size="small"  style = {{marginLeft : '25px'}} />
          </div>
          <p style = {{marginLeft: '45px' , marginTop: '10px', color :'black'}}>{jobSeeker.name} {jobSeeker.surname}</p>
      
        </Table.Cell>
        <Table.Cell width={12}>
            <h3>Hakkımda</h3> 
              <p style = {{marginTop : '5px'}}>{coverLetter}</p>
              <h3>İletişim</h3>
              <p>E-posta: <a href="mailto:{jobSeeker.email}">{jobSeeker.email}</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/nurullah-diri/">https://www.linkedin.com/in/nurullah-diri/</a></p>
        
         
        
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <h2>Eğitim Bilgileri</h2>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Okul</Table.HeaderCell>
                <Table.HeaderCell>Bölüm</Table.HeaderCell>
                <Table.HeaderCell>Tarih</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {educations.map((education) => (
                <Table.Row key={education.id}>
                  <Table.Cell>{education.school.schoolName}</Table.Cell>
                  <Table.Cell>{education.department.departmentName}</Table.Cell>
                  <Table.Cell>
                    {education.startDate} - {education.endDate}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <h2>İş Deneyimleri</h2>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Şirket</Table.HeaderCell>
                <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                <Table.HeaderCell>Tarih</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {jobExperiences.map((experience) => (
                <Table.Row key={experience.id}>
                  <Table.Cell>{experience.companyName}</Table.Cell>
                  <Table.Cell>{experience.positionName}</Table.Cell>
                  <Table.Cell>
                    {experience.startDate} - {experience.endDate}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <h2>Diller</h2>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Dil</Table.HeaderCell>
                <Table.HeaderCell>Seviye</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {jobseekerLanguages.map((language) => (
                <Table.Row key={language.id}>
                  <Table.Cell>{language.language.languageName}</Table.Cell>
                  <Table.Cell>{language.languageLevel}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <h2>Yetenekler</h2>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan="3">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Programlama Dili</Table.HeaderCell>
                <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {skills.map((skill) => (
                <Table.Row key={skill.id}>
                  <Table.Cell>{skill.programmingLanguage}</Table.Cell>
                  <Table.Cell>{skill.technologyName}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
</Container>



  );
};
export default JobSeekerDetails;
