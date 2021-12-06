import React from 'react';
import ItemStyles from '../styles/ItemStyles';
import Title from '../styles/Title';
import Link from 'next/link';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
const ProductItem = (props) => {
  const { name, description, photo, price } = props;

  const { altText = '', image, id } = photo || {};
  const imageSrc = image?.publicUrlTransformed || '';

  return (
    <div>
      <ItemStyles>
        <img alt={altText} src={imageSrc}/>
        {
          price && (
            <PriceTag>
              {formatMoney(price)}
            </PriceTag>
          )
        }
        <Title>
          <Link href={`product/${id}`}>{name}</Link>
        </Title>
      </ItemStyles>
    </div>
  );
};

export default ProductItem;
