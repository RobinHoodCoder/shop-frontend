import React from 'react';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
import { resetIdCounter, useCombobox } from 'downshift';

const Search = (props) => {
  resetIdCounter();
  const { getComboboxProps, getInputProps, getMenuProps  } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('oke');
    },
    onSelectedItemChange() {

    },
    onHighlightedIndexChange() {

    },
    getMenuProps() {

    },

  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input type="search" {...getInputProps({
          placeholder: 'Search products...',
          className: 'loading',
        })} />
      </div>
      <DropDown>
        <DropDownItem>
         Skrrt
        </DropDownItem>
        <DropDownItem>
          Papapap
        </DropDownItem>
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
