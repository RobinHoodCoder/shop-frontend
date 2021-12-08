import React from 'react';
import ItemStyles from '../styles/ItemStyles';
import Link from 'next/link';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import LinkBlock from '../styles/LinkBlock';
import TitleBlock from '../TitleBlock/TitleBlock';
import DeleteProduct from '../DeleteProduct/DeleteProduct';
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
          <div className="buttonList">
            <DeleteProduct id={id}/>
          </div>
        </ItemStyles>
      </Link>
    </LinkBlock>
  );
};

export default ProductItem;
