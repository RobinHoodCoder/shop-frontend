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
