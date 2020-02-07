import {gql} from "apollo-boost";

const REGISTER = gql`
    mutation Register ($firstname: String!, $lastname: String!, $password: String!, $email: String!, $phone: String!) {
        register (
            firstName: $firstname
            lastName: $lastname
            password: $password
            email: $email
            phone: $phone
        )
        {
            token
            userId
            message
        }
    }
`;

export default REGISTER;