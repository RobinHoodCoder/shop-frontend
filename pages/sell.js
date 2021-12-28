import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';
import CreateProduct from '../components/CreateProduct/CreateProduct';

const SellPage = (props) => {
  const { dummy } = props;

  return (
    <div>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
};

export default SellPage;


