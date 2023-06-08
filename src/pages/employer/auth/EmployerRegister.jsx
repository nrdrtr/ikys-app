import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from "mdb-react-ui-kit";
import { Container } from "semantic-ui-react";
//import EmployerService from "../../../services/EmployerService";

export default function EmployerRegister() {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const history = useHistory();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   surname: "",
  //   birthDate: "",
  //   identityNumber: "",
  //   password: "",
  //   passwordAgain: "",
  //   email: ""
  // });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let employerService = new EmployerService();
  //     let response = await employerService.add(formData);

  //     console.log(response); // Print successful response to the console
  //     // Perform additional actions or redirect after successful operation
  //     history.push("/email-sent"); // Redirect to EmailSentPage
  //   } catch (error) {
  //     console.error(error); // Print error message to the console in case of an error
  //     // Perform error handling or display error message to the user
  //   }
  // };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      !companyName ||
      !website ||
      !email ||
      !phoneNumber ||
      !password ||
      !passwordAgain
    ) {
      toast.error("Lütfen tüm alanları doldurunuz.");
    } else if (password !== passwordAgain) {
      toast.error("Şifreler eşleşmiyor.");
    } else {
      history.push("/checkemailpage"); // Redirect to CheckEmailPage
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  İşveren Kayıt
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Şirket Adı"
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="globe me-3" size="lg" />
                  <MDBInput
                    label="Website"
                    id="website"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="E-posta"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size="lg" />
                  <MDBInput
                    label="Telefon Numarası"
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Şifre"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Şifre Tekrar"
                    id="passwordAgain"
                    type="password"
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                  />
                </div>

                <div className="mb-4"></div>
                <MDBBtn
                  type="submit"
                  className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                  onClick={handleRegister}
                >
                  Kayıt Ol
                </MDBBtn>
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2"
                style={{ borderRadius: "25px" }}
              >
                <MDBCardImage
                  src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                  alt="..."
                  fluid
                  style={{ borderRadius: "25px" }}
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </Container>
  );
}
