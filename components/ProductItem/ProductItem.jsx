import React from 'react';
import ItemStyles from '../styles/ItemStyles';
import Image from 'next/image';
const ProductItem = (props) => {
  const { name, description, photo } = props;
  console.log({ photo });

  const { altText = '', image, id } = photo || {};
  const imageSrc = image?.publicUrlTransformed || '';

  return (
    <div>
      <ItemStyles>
        <h2>{name}</h2>
        <p>{description}</p>
        <img alt={altText} src={imageSrc}/>
        {description}
      </ItemStyles>
    </div>
  );
};

export default ProductItem;
