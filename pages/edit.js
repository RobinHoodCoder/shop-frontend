import ProductEditor from '../components/ProductEditor/ProductEditor';

const Edit = ({ query }) => {
  // console.log({ query });
  return (
    <div>
      <ProductEditor id={query.id}/>
    </div>
  );
};

export default Edit;
