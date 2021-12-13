import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { M_DELETE_PRODUCT } from '../../gql/mutations';
import { toast } from 'react-toastify';
import Toaster from '../Toaster/Toaster';


const Trash = () => {
  return (<>
        🗑
  </>);
};

// ----------------------------------------

const update = (cache, payload) => {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = (props) => {
  const { children, id, name } = props;
  const [productName, setProductName] = useState();

  const [deleteProduct, { data, loading }] = useMutation(
    M_DELETE_PRODUCT,
    {
      variables: { id },
      update,
    }
  );


  const handleClick = async (e) => {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!!confirmed) {
      try {
        await toast.promise(
          deleteProduct(), {
            success: `Deleted ${name}`,
            pending: `Deleting ${name}`,
            error: `Could not delete ${name} (${id})`,
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (!!data?.deleteProduct && !loading) {
      const { name } = data.deleteProduct;
    }
  }, [data, loading]);


  return (
    <>
      <Toaster/>
      <button
        disabled={loading}
        onClick={handleClick}
      >{children}
      </button>
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
