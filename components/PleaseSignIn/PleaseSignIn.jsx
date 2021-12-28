import React from 'react';
import { useUser } from '../../hooks';
import Login from '../Login/Login';

const PleaseSignIn = ({ children }) => {
  const [user] = useUser();
  return (
    <div>
      {!!user ? (
        children
      ) : (
        <Login/>
      )}
    </div>
  );
};

export default PleaseSignIn;
