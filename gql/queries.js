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
export const Q_PAGINATION = gql`
    query PAGINATION_QUERY
    {
        _allProductsMeta {
            count
        }
    }
`;
