import React from 'react';
import styled from 'styled-components';
import RequestReset from '../components/ResetPassword/RequestReset/RequestReset';
import ChangePassword from '../components/ResetPassword/ChangePassword/ChangePassword';


const ResetPasswordPage = ({ query }) => {
  const { token } = query;
  return (
    <div>
      {
        !token ? (
          <RequestReset/>
        ) : (
          <ChangePassword token={token}/>
        )
      }
    </div>
  );
};

export default ResetPasswordPage;
