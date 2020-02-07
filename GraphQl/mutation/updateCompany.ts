import {gql} from "apollo-boost";

const UPDATE_COMPANY = gql`
    mutation updateCompany ($id: ID!, $name: String, $description: String, $email: String, $phone: String) {
        updateCompany(id: $id, name: $name, description: $description, email: $email, phone: $phone) {
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

export default UPDATE_COMPANY;