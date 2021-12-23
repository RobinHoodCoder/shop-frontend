import gql from 'graphql-tag';

export const M_CREATE_PRODUCT = gql`
    mutation CREATE_PRODUCT_MUTATION (
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $name
                description: $description
                price: $price
                status: "AVAILABLE"
                photo: {
                    create: {
                        image: $image,
                        altText: $name
                    }
                }
            }
        ) {
            id
            price
            description
            name
            id
        }
    }
`;

export const M_UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT (
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
#    $image: Upload
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
#        photo: {
#          create: {
#            image: $image,
#            altText: $name
#          }
#        }
      }
    ) {
      id
      price
      description
      name
      id
    }
  }
`;

export const M_DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT (
    $id: ID!
  ) {
    deleteProduct(
      id: $id
    ) {
      name
      id
    }
  }
`;

export const M_LOGIN = gql`
    mutation LOGIN (
        $email: String!
        $password: String!
    ) {
        authenticateUserWithPassword(
            email: $email
            password: $password
        ) {
           ...on UserAuthenticationWithPasswordSuccess {
             item {
                 email
                 name
             }
           }
           ...on UserAuthenticationWithPasswordFailure {
            code
            message
           }
        }
    }
`;

export const M_LOGOUT = gql`
  mutation LOGOUT {
    endSession
  }
`;


export const M_SIGNUP = gql`
  mutation SIGNUP_MUTATION (
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(
    data: {
      name: $name
      email: $email
      password: $password
    }
    ) {
        email
        id
        name
    }
  }
`;

export const M_REQUEST_RESET_PASSWORD = gql`
  mutation REQUEST_RESET_PASSWORD_MUTATION (
    $email: String!
  ) {
    sendUserPasswordResetLink(
      email: $email
    ) {
      code
      message
    }
  }
`;

export const M_RESET_PASSWORD = gql`
    mutation RESET_PASSWORD_MUTATION (
        $email: String!
        $token: String!
        $password: String!
    ) {
        redeemUserPasswordResetToken(
            email: $email
            token: $token
            password: $password
        ) {
            code
            message
        }
    }
`;

export const M_ADD_TO_CART = gql`
    mutation ADD_TO_CART_MUTATION($id: ID!) {
        addToCart(productId: $id) {
            id
        }
    }
`;

export const M_REMOVE_FROM_CART = gql`
    mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
        deleteCartItem(id: $id) {
            id
        }
    }
`;

export const M_CREATE_ORDER = gql`
    mutation M_CREATE_ORDER($token: String!) {
        checkout(token: $token) {
            id
            charge
            total
            items {
                id
                name
            }
        }
    }
`;
