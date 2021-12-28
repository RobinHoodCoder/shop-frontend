import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';
import AccountEditor from '../components/ProductEditor/AccountEditor';

const SellPage = (props) => {
  const { dummy } = props;

  return (
    <div>
      <PleaseSignIn>
        <AccountEditor />
      </PleaseSignIn>
    </div>
  );
};

export default SellPage;
