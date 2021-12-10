import gql from 'graphql-tag';

export const Q_ALL_PRODUCTS = gql`query ALL_PRODUCTS {
    allProducts {
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
