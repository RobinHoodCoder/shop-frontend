import gql from 'graphql-tag';

export const Q_ALL_PRODUCTS = gql`
    query ALL_PRODUCTS ( $first: Int = 1, $skip: Int = 0, )
    {
    allProducts (
     first: $first
     skip: $skip
    ) {
        id
        name
        description
        price
        photo {
            altText
            id
            image
            {
                publicUrlTransformed
            }
        }
    }
}
`;
export const Q_CURRENT_USER = gql`
    query  {
    authenticatedItem {
        ...on User {
                id
                email
                name
                cart {
                    id
                    quantity
                    product {
                        id
                        name
                        description
                        price
                        photo {
                            altText
                            id
                            image
                            {
                                publicUrlTransformed
                            }
                        }
                    }
                }
                # Query the curruser once we have it
            }
        }
    }
`;

export const Q_SINGLE_PRODUCT = gql`
    query SINGLE_PRODUCT (
       $id: ID!
    )
    {
        Product(where: {id: $id}) {
            id
            name
            description
            price
            photo {
                altText
                id
                image
                {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export const Q_SEARCH_PRODUCTS = gql`
    query SEARCH_PRODUCTS (
        $searchTerm: String!
    )
    {
        searchResult: allProducts(
            where: {OR: [
                {name_contains: $searchTerm},
                {description_contains: $searchTerm}
            ]}
        ) {
            id
            name
            description
            price
            photo {
                altText
                id
                image
                {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export const Q_PAGINATION = gql`
    query PAGINATION_QUERY
    {
        _allProductsMeta {
            count
        }
    }
`;

export const Q_SINGLE_ORDER = gql`
  query SINGLE_ORDER_QUERY (
    $id: ID!
  )
  {
    Order(
        where: {id: $id}
    ) {
      id
      charge
      items {
       name
       description
       price
       quantity
       photo {
       altText
       image {
       publicUrlTransformed
       }
       }
      }
    }
  }
`;
