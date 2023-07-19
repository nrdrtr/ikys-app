import React from "react";
import { Route } from "react-router-dom";
import Menü from "./menu/Menu";
import JobPositions from "../pages/jobposition/JobPositionList";
import JobPositionDetails from '../pages/jobposition/JobPositionDetails';
import JobSeekerAccount from "../pages/jobseeker/dropdown/JobSeekerAccount";
import HomePage from '../pages/homepage/HomePage';
import CheckEmailPage from '../pages/verifypage/CheckEmailPage';
import JobAdvertisementDetails from '../pages/jobadverts/JobAdvertisementDetails';
import JobSeekerRegister from '../pages/jobseeker/auth/JobSeekerRegister';
import EmployerRegister from '../pages/employer/auth/EmployerRegister';
import EmployerLogin from '../pages/employer/auth/EmployerLogin';
import JobSeekerLogin from '../pages/jobseeker/auth/JobSeekerLogin';
import VerificationSuccessPage from "../pages/verifypage/VerificationSuccessPage";
import JobAdvertisementList from "../pages/jobadverts/JobAdvertisementList";
import JobSeekerFavorites from "../pages/jobseeker/dropdown/JobSeekerFavorites";
import EmployerAccount from "../pages/employer/dropdown/EmployerAccount";
import EmployerAdvertisements from "../pages/employer/dropdown/EmployerAdvertisements";
import EmployerNotifications from "../pages/employer/dropdown/EmployerNotifications";
import JobPositionAdd from "../pages/jobposition/JobPositionAdd";
import UpdateEmployerAccount from "../pages/employer/dropdown/UpdateEmployerAccount ";
import JobAdvertisementAdd from "../pages/jobadverts/JobAdvertisementAdd";
import JobSeekerApplication from "../pages/jobseeker/dropdown/JobSeekerApplication";
import EmployerPage from "../pages/employer/EmployerPage ";
import JobSeekerPage from "../pages/jobseeker/JobSeeekerPage";
import SchoolAdd from './../pages/school/SchoolAdd';
import SchoolUpdate from './../pages/school/SchoolUpdate';
import ResumeDetail from "../pages/resume/ResumeDetail";
import JobExperience from './../pages/jobExperience/JobExperience';
import JobExperienceAdd from './../pages/jobExperience/JobExperienceAdd';
import JobExperienceUpdate from './../pages/jobExperience/JobExperienceUpdate';
import EmployeeLanguage from './../pages/employeeLanguage/EmployeeLanguage';
import EmployeeLanguageAdd from './../pages/employeeLanguage/EmployeeLanguageAdd';
import EmployeeLanguageUpdate from './../pages/employeeLanguage/EmployeeLanguageUpdate';
import Skill from './../pages/skill/Skill';
import SkillAdd from './../pages/skill/SkillAdd';
import SkillUpdate from './../pages/skill/SkillUpdate';
import EmployeeSocialMedia from './../pages/employeeSocialMedia/EmployeeSocialMedia';
import EmployeeSocialMediaAdd from './../pages/employeeSocialMedia/EmployeeSocialMediaAdd';
import EmployeeSocialMediaUpdate from './../pages/employeeSocialMedia/EmployeeSocialMediaUpdate';
import School from "../pages/school/School";
import CoverLetter from "../pages/coverLetter/CoverLetter";
import CoverLetterAdd from './../pages/coverLetter/CoverLetterAdd';
import CoverLetterUpdate from './../pages/coverLetter/CoverLetterUpdate';
import JobAdvertisementConfirm from './../pages/Uyarı';
 


export default function Dashboard() {
  return (
    <div>
      <Menü />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/JobSeekerRegister" component={JobSeekerRegister} />
      <Route exact path="/EmployerRegister" component={EmployerRegister} />
      <Route exact path="/EmployerLogin" component={EmployerLogin} />
      <Route exact path="/JobSeekerLogin" component={JobSeekerLogin} />
      <Route exact path="/ispozisyonlari" component={CoverLetterAdd} />
      <Route exact path="/ispozisyonlari/:id" component={JobPositionDetails} />
      <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
      <Route exact path="/checkemailpage" component={CheckEmailPage} />
      <Route exact path="/jobAdvertisements/getById/:id" component={JobAdvertisementDetails} />
      <Route exact path="/JobAdvertisementConfirm" component={JobAdvertisementConfirm} />

      <Route exact path="/email-sent" component={CheckEmailPage} />
      <Route exact path="/verifySuccessPage" component={VerificationSuccessPage} />

      <Route path="/jobseekeraccount/:id" component={JobSeekerAccount} />
      <Route path="/employer/:id" component={EmployerPage} />

      <Route path="/jobseekerfavorites" component={JobSeekerFavorites} />

      <Route path="/employeraccount/:id" component={EmployerAccount} />
      <Route path="/employerjobadvertisements" component={EmployerAdvertisements} />
      <Route path="/employeralerts" component={EmployerNotifications} />
      <Route path="/jobadvertisementAdd" component={JobAdvertisementAdd} />


      <Route path="/update-employer-account" component={UpdateEmployerAccount} />
      <Route path="/add-job-position" component={JobPositionAdd} />
      <Route path="/basvurularım" component={JobSeekerApplication} />
      <Route path="/jobSeekerPage/:id" component={JobSeekerPage}></Route>
      <Route exact path="/resumeDetail/:id" component={ResumeDetail} />


      <Route exact path="/coverLetters" component={CoverLetter} />
      <Route exact path="/coverLetterAdd" component={CoverLetterAdd} />
      <Route exact path="/coverLetterUpdate/:id" component={CoverLetterUpdate} />

      <Route exact path="/school" component={School} />
      <Route path="/school/add/:resumeId" component={SchoolAdd} />
      <Route exact path="/schoolUpdate/:id" component={SchoolUpdate} />

      <Route exact path="/jobExperience" component={JobExperience} />
      <Route exact path="/jobExperienceAdd" component={JobExperienceAdd} />
      <Route exact path="/jobExperienceUpdate/:id" component={JobExperienceUpdate} />

      <Route exact path="/employeeLanguage" component={EmployeeLanguage} />
      <Route exact path="/employeeLanguageAdd" component={EmployeeLanguageAdd} />
      <Route exact path="/employeeLanguageUpdate/:id" component={EmployeeLanguageUpdate} />

      <Route exact path="/skill" component={Skill} />
      <Route exact path="/skillAdd" component={SkillAdd} />
      <Route exact path="/skillUpdate/:id" component={SkillUpdate} />


      <Route exact path="/employeeSocialMedia" component={EmployeeSocialMedia} />
      <Route exact path="/employeeSocialMediaAdd" component={EmployeeSocialMediaAdd} />
      <Route exact path="/employeeSocialMediaUpdate/:id" component={EmployeeSocialMediaUpdate} />
    </div>
  );
}
