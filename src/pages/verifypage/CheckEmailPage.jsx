// CheckEmailPage.js
import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const VerificationSentPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const VerificationSentPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 32px;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dff2bf;
  color: #4f8a10;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 32px;
  width: 100%;
`;

const ResendButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 16px;

  &:hover {
    background-color: #3e8e41;
  }
`;

const ReturnButton = styled.button`
  background-color: #ffffff;
  color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 4px;
  padding: 16px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
    color: #ffffff;
  }
`;

export default function CheckEmailPage() {
  return (
    <VerificationSentPageWrapper>
      <VerificationSentPageContainer>
        <Title>Doğrulama E-postası Gönderildi</Title>
        <Description>
          Lütfen e-posta hesabınızı kontrol edin ve doğrulama bağlantısına
          tıklayarak hesabınızı doğrulayın.
        </Description>
        <Alert>Doğrulama e-postası başarıyla gönderildi.</Alert>
        <div>
          <Link to="/mailsent">
            <ResendButton>E-postayı yeniden gönder</ResendButton>
          </Link>
          <Link to="/verifySuccessPage">
            <ReturnButton>Giriş sayfasına dön</ReturnButton>
          </Link>
        </div>
      </VerificationSentPageContainer>
    </VerificationSentPageWrapper>
  );
}
