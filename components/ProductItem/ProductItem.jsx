import React from 'react';
import ItemStyles from '../styles/ItemStyles';
import Title from '../styles/Title';
import Link from 'next/link';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import Description from '../styles/Description';
import LinkBlock from '../styles/LinkBlock';
const ProductItem = (props) => {
  const { name, description, photo, price } = props;

  const { altText = '', image, id } = photo || {};
  const imageSrc = image?.publicUrlTransformed || '';

  return (
    <LinkBlock>
      <Link href={`product/${id}`}>
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
            <span>{name}</span>
          </Title>
          <Description>
            {description}
          </Description>
        </ItemStyles>
      </Link>
    </LinkBlock>
  );
};

export default ProductItem;
