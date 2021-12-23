import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { Q_SEARCH_PRODUCTS } from '../../gql/queries';
import { useCallback, useEffect } from 'react';
import { SearchStyles } from '../styles/DropDown';

export default function Search() {
  // const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    Q_SEARCH_PRODUCTS,
    {
      fetchPolicy: 'network-only',
    }
  );
  const items = !loading ? (data?.searchResults || []) : [];

  const findItemsButChill = (props) => {
    console.log({ props });
    const options = {
      fetchPolicy: 'network-only',
      ...props,
    };
    debounce(() => findItems(options), 300);
  };

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
    items,
    onInputValueChange({ inputValue }) {
      console.log('inputValue', inputValue, data);
      return findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log({ selectedItem });
      // return router.push({
      //   pathname: `/product/${selectedItem.id}`,
      // });
    },
    itemToString: item => item?.name || '',
  });

  useEffect(() => {
    findItems({
      variables: {
        searchTerm: 'yeti',
      },
      fetchPolicy: 'network-only',
    });
    findItemsButChill({ variables: { searchTerm: inputValue } });
  }, [inputValue]);


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
      <div {...getMenuProps()}>
        {isOpen && (
          items.map((item, index) => (
            <div
              {...getItemProps({ item, index })}
              key={item.id}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </div>
          ))
        )}
        {isOpen && !items.length && !loading && (
          <div>Sorry, No items found for {inputValue}</div>
        )}
      </div>
    </SearchStyles>
  );
}
