import {gql} from "apollo-boost";

const GET_USER = gql`
    {
        getUser {
            id
            firstName
            lastName
            email
            phone
            password
            validated
            company {
                id
                name
                description
                email
                phone
                logo
                cover
                users {
                    id
                    firstName
                    lastName
                    email
                    phone
                }
                products {
                    id
                    name
                    image
                    description
                    categories {
                        id
                        name
                        parentCategoryId
                    }
                }
            }
        }
    }
`;

export default GET_USER;

