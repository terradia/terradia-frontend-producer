import React from 'react';

interface UserContextProps {
    id: string;
}

const UserContext = React.createContext<Partial<UserContextProps>>({});

export default UserContext;
