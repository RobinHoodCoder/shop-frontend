import React from 'react';

const ProductImage = ({ photo }) => {
  const { image, altText } = photo;
  console.log(image);
  return (
    <img src={image?.publicUrlTransformed} alt={altText}/>
  );
};

export default ProductImage;
