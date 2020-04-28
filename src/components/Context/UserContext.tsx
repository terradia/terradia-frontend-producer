import React from "react";

interface UserContextProps {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    validated: boolean
}

const UserContext = React.createContext<Partial<UserContextProps>>({});

export default UserContext;
