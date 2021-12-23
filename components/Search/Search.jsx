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


  const [findItems, { loading, data, error }] = useLazyQuery(
    Q_SEARCH_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchResult || [];

  /* const findItemsButChill = debounce(async (variables) => {
    console.log(variables, '?');
    if (!!variables?.searchTerm) {
      console.log(variables, 'chilout');
      await findItems(variables);
    }
  }, 350);*/
  const findItemsButChill = debounce(findItems, 1000);

  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('input Changed??');
      console.log('rerender', { items });
      if (!!inputValue) {
        findItemsButChill({
          variables: {
            searchTerm: inputValue,
          },
        });
      }
    },
    onSelectedItemChange({ selectedItem }) {
      console.log(selectedItem);
      // return router.push({
      //   pathname: `/product/${selectedItem.id}`,
      // });
    },
    itemToString: item => item?.name || '',
  });

  useEffect(() => {
    console.log(isOpen, { items });
  }, [isOpen]);


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
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
