import React from 'react';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import styled from 'styled-components';


const LoginPage = ({ query }) => {
  const GridStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
`;
  return (
    <GridStyles>
      <Login query={query}/>
      <SignUp/>
    </GridStyles>
  );
};

export default LoginPage;
