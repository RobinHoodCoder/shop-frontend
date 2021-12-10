import React from 'react';
import ProductItems from '../../components/Products/Products';
import Pagination from '../../components/Pagination/Pagination';
import { useRouter } from 'next/router';
import { perPage } from '../../config';

const Index = ({ query }) => {
  const { page: pageString } = query;
  const pageNumber = Number(pageString);
  const page = pageNumber || 1;


  const { query: query2 } = useRouter();

  console.log(query2);

  return (
    <div>
      <Pagination page={page} perPage={perPage} />
      <ProductItems page={page} perPage={perPage}/>
      <Pagination page={page} perPage={perPage}/>
    </div>
  );
};

export default Index;
