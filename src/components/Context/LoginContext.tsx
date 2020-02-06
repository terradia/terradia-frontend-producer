import React from "react";

interface LoginContextProps {
    loggedIn: boolean,
}

export const LoginContext = React.createContext<Partial<LoginContextProps>>({});