import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { useRouter } from 'next/dist/client/router';
import { StyledSearchContainer, DropDownItem, ResultBox } from '../styles/StyledSearchElements';
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
    setLoading(true);
    const timer = setTimeout(() => {
      setInput(inputRef.current);
    }, 1000);
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [inputRef.current]);
  useEffect(() => {
    if (!input) {
      setLoading(false);
    }
    if (inputRef.current === input && !!input) {
      setLoading(false);
      findItems({
        variables: {
          searchTerm: input,
        },
      });
    }
  }, [findItems, input]);

  const notFound = !items.length;
  const text = !!loading ? 'Looking for your product' : '';


  return (
    <StyledSearchContainer>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: !!dataLoading || loading ? 'loading' : '',
          })}
        />
      </div>
      <ResultBox {...getMenuProps()} isOpen={isOpen}>
        {
          !!isOpen && !loading && (
            items?.map?.((item, index) => (
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
            ))
          )
        }
        {


          <DropDownItem>{}</DropDownItem>


        }
        {
          !loading && !items.length && (
            <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
          )
        }
      </ResultBox>

    </StyledSearchContainer>
  );
}
