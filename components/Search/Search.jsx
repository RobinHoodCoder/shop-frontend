import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { Q_SEARCH_PRODUCTS } from '../../gql/queries';
import { useCallback, useEffect } from 'react';
import { useCart } from '../../context/CartState';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

export default function Search() {
  const router = useRouter();

  resetIdCounter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    Q_SEARCH_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];

  /* const findItemsButChill = debounce(async (variables) => {
    console.log(variables, '?');
    if (!!variables?.searchTerm) {
      console.log(variables, 'chilout');
      await findItems(variables);
    }
  }, 350);*/
  const findItemsButChill = debounce(findItems, 350);


  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log(selectedItem);
      // return router.push({
      //   pathname: `/product/${selectedItem.id}`,
      // });
    },
    itemToString: item => item?.name || '',
  });


  console.log('rerender', { data, inputValue });
  return (
    <SearchStyles>
      {
        !isOpen && null
      }
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && (
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))
        )}
        {isOpen && !items.length && !loading && (
          <div>Sorry, No items found for {inputValue}</div>
        )}
      </DropDown>
    </SearchStyles>
  );
}
