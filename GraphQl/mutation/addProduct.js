import {gql} from "apollo-boost";

const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $description: String!) {
        createProduct(name: $name, description: $description) {
            description
            id
            name
        }
    }
`;

export default ADD_PRODUCT;