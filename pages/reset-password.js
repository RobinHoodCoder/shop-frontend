import React from 'react';
import RequestReset from '../components/ResetPassword/RequestReset/RequestReset';
import ChangePassword from '../components/ResetPassword/ChangePassword/ChangePassword';


const ResetPasswordPage = ({ query }) => {
  return (
    <div>
      {
        !query?.token ? (
          <RequestReset/>
        ) : (
          <ChangePassword query={query}/>
        )
      }
    </div>
  );
};

export default ResetPasswordPage;
