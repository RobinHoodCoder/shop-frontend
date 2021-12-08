import EditProduct from '../components/ProductEditor/ProductEditor';

const Edit = ({ query }) => {
  console.log({ query });
  return (
    <div>
      <EditProduct id={query.id}/>
    </div>
  );
};

export default Edit;
