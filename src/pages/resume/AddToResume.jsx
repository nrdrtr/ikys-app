import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ResumeService from '../../services/ResumeService';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

export default function AddToResume() {
  const history = useHistory();

  const jobSeeker = useSelector((state) => state.auth.jobSeeker);

  const [formData, setFormData] = useState({
    id: 0,
    imageUrl: '',
    jobSeeker: {
      id: jobSeeker.id,
      userType: '',
      passwordAgain: '',
      verified: true
    },
    coverLetters: [
      {
        id: 0,
        description: '',
        jobSeeker: {
          id: 0,
          userType: '',
          passwordAgain: '',
          verified: true
        }
      }
    ],
    jobSeekerSocialMedia: [
      {
        id: 0,
        socialMedia: {
          id: 0,
          socialMediaName: ''
        },
        socialMediaAdress: '',
        jobSeeker: {
          id: 0,
          userType: '',
          passwordAgain: '',
          verified: true
        }
      }
    ],
    educations: [
      {
        id: 0,
        startDate: '2023-07-09',
        endDate: '2023-07-09',
        school: {
          id: 0,
          schoolName: ''
        },
        department: {
          id: 0,
          departmentName: ''
        },
        jobSeeker: {
          id: 0,
          userType: '',
          passwordAgain: '',
          verified: true
        }
      }
    ],
    jobExperiences: [
      {
        id: 0,
        companyName: '',
        positionName: '',
        startDate: '2023-07-09',
        endDate: '2023-07-09',
        jobSeeker: {
          id: 0,
          userType: '',
          passwordAgain: '',
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
          languageName: ''
        },
        jobSeeker: {
          id: 0,
          userType: '',
          passwordAgain: '',
          verified: true
        }
      }
    ],
    skills: [
      {
        id: 0,
        programmingLanguage: '',
        technologyName: '',
        jobSeeker: {
          id: 0,
          userType: ' ',
          passwordAgain: ' ',
          verified: true
        }
      }
    ]
  });

  const createResume = () => {

    fetch('http://localhost:8080/api/resumes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Hata:', response.statusText);
        }
      })
      .then((data) => {
        console.log('Başarılı:', data);
        history.push(`/resumeDetail/${jobSeeker.id}`);


        window.location.reload();
      })
      .catch((error) => {
        console.error('Hata:', error);
      });
  };

  return (
    <div>
      <Button onClick={createResume}>CV Oluştur</Button>
    </div>
  );
}
