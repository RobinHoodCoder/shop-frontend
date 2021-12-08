import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { M_DELETE_PRODUCT } from '../../gql/mutations';
import { toast, ToastContainer } from 'react-toastify';


const Trash = () => {
  return (<>
        🗑 -- Delete
  </>);
};

// ----------------------------------------

const DeleteProduct = (props) => {
  const { children, id } = props;

  const [deleteProduct, { data, loading }] = useMutation(M_DELETE_PRODUCT, { variables: { id } });


  const handleClick = async (e) => {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!!confirmed) {
      await deleteProduct();
    }
  };

  useEffect(() => {
    if (!!data?.deleteProduct && !loading) {
      const { name } = data.deleteProduct;
      toast.promise(`${name} has been deleted.`)
        .then(r => console.log(r));
    }
  }, [data, loading]);


  return (
    <>
      <ToastContainer/>
      <button onClick={handleClick}>{children}</button>
    </>
  );
};


const defaultProps = {

  // The product to be deleted
  children: <Trash/>,
  product: {
    id: '',
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    quantity: 0,
  },

  // The function to be called when the delete button is clicked
  onDelete: () => {},

  // The function to be called when the cancel button is clicked
  onCancel: () => {},
};
DeleteProduct.defaultProps = defaultProps;
export default DeleteProduct;
