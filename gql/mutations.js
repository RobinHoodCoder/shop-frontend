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


export const M_RESET_PASSWORD = gql`
  mutation RESET_PASSWORD (
    $email: String!
  ) {
    sendUserPasswordResetLink(
      email: $email
      password: $password
    ) {
      code
      message
    }
  }
`;
