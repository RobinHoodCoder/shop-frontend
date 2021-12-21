import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';


const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
        searchTerms: allProducts(
            where: {
                OR: [
                    { name_contains_i: $searchTerm }
                    { description_contains_i: $searchTerm }
                ]
            }
        ) {
            id
            name
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export default function Search() {
  // const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'network-only',
    }
  );
  const items = !loading ? (data?.searchTerms || []) : [];
  const findItemsButChill = debounce(findItems, 350);
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
    onInputValueChange() {
      return findItemsButChill({
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
  console.log('rerender');
  return (
    <div>
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
    </div>
  );
}
