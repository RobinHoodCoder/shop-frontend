import React from 'react';
import ItemStyles from '../../styles/ItemStyles';
import PriceTag from '../../styles/PriceTag';
import formatMoney from '../../../lib/formatMoney';
import LinkBlock from '../../styles/LinkBlock';
import TitleBlock from '../../TitleBlock/TitleBlock';
import DeleteProduct from '../../DeleteProduct/DeleteProduct';
import EditProduct from '../../EditProduct/EditProduct';
import { AddToCartButton } from '../../CartButtons/AddToCartButton/AddToCartButton';
const Ankeiler = (props) => {
  const { name, description, photo, price, id } = props;

  const { altText = '', image } = photo || {};
  const imageSrc = image?.publicUrlTransformed || '';

  return (
    <ItemStyles>
      <LinkBlock
        href={`/product/${id}`}
      >
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
      </LinkBlock>
      <div className="buttonList">
        <DeleteProduct
          id={id}
          name={name}
        >
          🗑️
        </DeleteProduct>
        <EditProduct id={id}>
          🖊️
        </EditProduct>
        <AddToCartButton id={id}/>
      </div>
    </ItemStyles>
  );
};

export default Ankeiler;
