import React from 'react';
import ItemStyles from '../styles/ItemStyles';

const ProductItem = (props) => {
  const { name, description, photo } = props;
  console.log(photo);

  return (
    <div>
      <ItemStyles>
        <h2>{name}</h2>
        <p>{description}</p>
        <img src={photo?.image?.publicUrlTransformed}/>
        {description}
      </ItemStyles>
    </div>
  );
};

export default ProductItem;
