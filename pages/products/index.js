import React from 'react';
import ProductItems from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import PaginationProvider from '../../context/PaginationProvider';

const Index = ({ query }) => {
  const { page } = query;

  return (
    <div>
      <PaginationProvider page={page}>
        <Pagination/>
        <ProductItems/>
        <Pagination/>
      </PaginationProvider>
    </div>
  );
};

export default Index;
