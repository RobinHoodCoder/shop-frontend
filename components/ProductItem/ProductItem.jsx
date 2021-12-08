import React from 'react';
import ItemStyles from '../styles/ItemStyles';
import Link from 'next/link';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import LinkBlock from '../styles/LinkBlock';
import TitleBlock from '../TitleBlock/TitleBlock';
const ProductItem = (props) => {
  const { name, description, photo, price, id } = props;

  const { altText = '', image } = photo || {};
  const imageSrc = image?.publicUrlTransformed || '';

  return (
    <LinkBlock>
      <Link
        href={`/product/${id}`}
      >
        <ItemStyles>
          <img
            alt={altText}
            src={imageSrc}
          />
          {price && (
            <PriceTag>
              {formatMoney(price)}
            </PriceTag>
          )}
          <TitleBlock
            name={name}
            description={description}
          />
        </ItemStyles>
      </Link>
    </LinkBlock>
  );
};

export default ProductItem;
