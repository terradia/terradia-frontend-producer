import {gql} from "apollo-boost";

const DELETE_COMPANY = gql`
    mutation deleteCompanyMutation ($id: ID!) {
        deleteCompany (id: $id) {
            id
            name
        }
    }
`;

export default DELETE_COMPANY;