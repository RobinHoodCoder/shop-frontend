import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
import { Q_SEARCH_PRODUCTS } from '../../gql/queries';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef('');

  const [findItems, { loading: dataLoading, data, error }] = useLazyQuery(
    Q_SEARCH_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchResult || [];

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
      inputRef.current = inputValue;
    },
    onSelectedItemChange({ selectedItem }) {
      return router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: item => item?.name || '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setInput(inputRef.current);
    }, 1000);
    return () => clearTimeout(timer);
  }, [inputRef.current]);

  useEffect(() => {
    if (inputRef.current === input) {
      findItems({
        variables: {
          searchTerm: input,
        },
      });
    }
  }, [findItems, input]);


  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: !!dataLoading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
