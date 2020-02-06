import {gql} from "apollo-boost";
import GET_USER from "./getUser";

const GET_ALL_PRODUCTS = gql`
    {
        getAllProducts {
            id
            name
            description
            categories{name}
        }
    }
`;

export default GET_ALL_PRODUCTS;
