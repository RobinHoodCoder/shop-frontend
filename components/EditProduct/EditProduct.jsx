import React from 'react';

const EditIcon = () => {
  return <>
      🖋
  </>;
};

const EditProduct = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  );
};

const defaultProps = {

  // The product to be deleted
  children: <EditIcon />,
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

EditProduct.defaultProps = {
  ...defaultProps,
};

export default EditProduct;
