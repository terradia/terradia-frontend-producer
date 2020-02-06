import {gql} from "apollo-boost";

const CREATE_COMPANY = gql`
    mutation createComp($name: String!, $description: String, $email: String, $phone: String) {
        createCompany (name: $name, description: $description, email: $email, phone: $phone) {
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
`;

export default CREATE_COMPANY;