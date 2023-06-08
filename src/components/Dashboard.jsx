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
import JobSeekerNotifications from "../pages/jobseeker/dropdown/JobSeekerNotifications";
import JobSeekerResumes from "../pages/jobseeker/dropdown/JobSeekerResumes";
import EmployerAccount from "../pages/employer/dropdown/EmployerAccount";
import EmployerAdvertisements from "../pages/employer/dropdown/EmployerAdvertisements";
import EmployerNotifications from "../pages/employer/dropdown/EmployerNotifications";
import CoverLetterAdd from "../pages/coverletter/CoverLetterAdd";
import CoverLetterEdit from "../pages/coverletter/CoverLetterEdit";
import JobPositionAdd from "../pages/jobposition/JobPositionAdd";
import UpdateEmployerAccount from "../pages/employer/dropdown/UpdateEmployerAccount ";
import JobPostingForm from "../pages/jobadverts/JobAdvertisementAdd";



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
      <Route exact path="/ispozisyonlari" component={JobPositions} />
      <Route exact path="/ispozisyonlari/:id" component={JobPositionDetails} />
      <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
      <Route exact path="/checkemailpage" component={CheckEmailPage} />
      <Route exact path="/jobPostings/getById/:id" component={JobAdvertisementDetails} />

      <Route exact path="/email-sent" component={CheckEmailPage} />
      <Route exact path="/verifySuccessPage" component={VerificationSuccessPage} />

      <Route path="/jobseekeraccount" component={JobSeekerAccount} />
      <Route path="/jobseekeralerts" component={JobSeekerNotifications} />
      <Route path="/jobseekerfavorites" component={JobSeekerFavorites} />
      <Route path="/jobseekercv" component={JobSeekerResumes} />
      <Route path="/employeraccount/:id" component={EmployerAccount} />
      <Route path="/employerjobadvertisements" component={EmployerAdvertisements} />
      <Route path="/employeralerts" component={EmployerNotifications} />
      <Route path="/jobadvertisementAdd" component={JobPostingForm} />
      <Route path="/coverLetterAdd" component={CoverLetterAdd} />
      <Route path="/coverLetterUpdate" component={CoverLetterEdit} />
      <Route path="/update-employer-account" component={UpdateEmployerAccount} />
      <Route path="/add-job-position" component={JobPositionAdd} />
    </div>
  );
}
