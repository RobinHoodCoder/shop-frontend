import React from 'react';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const Search = (props) => {
  const { dummy } = props;

  return (
    <SearchStyles>
      <div>
        <input type="search"/>
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
