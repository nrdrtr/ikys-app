import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const VerificationSuccessPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const VerificationSuccessPageContainer = styled.div`
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
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 32px;
  width: 100%;
`;

const ReturnButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3e8e41;
  }
`;

function VerificationSuccessPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Burada API isteğinizi gerçekleştirebilirsiniz
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/verification/verify-jobSeeker?id=14');
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.log('API isteği başarısız:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <VerificationSuccessPageWrapper>
      <VerificationSuccessPageContainer>
        <Title>Hesabınız Başarıyla Doğrulandı</Title>
        <Description>
          Artık hesabınıza giriş yapabilir ve tüm özellikleri kullanabilirsiniz.
        </Description>
        <Alert>{message}</Alert>
        <Link to="/home"> 
        <ReturnButton>Giriş yap</ReturnButton>
        </Link>

      </VerificationSuccessPageContainer>
    </VerificationSuccessPageWrapper>
  );
}

export default VerificationSuccessPage;
