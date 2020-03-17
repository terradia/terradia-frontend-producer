import React from 'react'

interface UserContextProps {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    logo: string;
    cover: string;
    users: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    products: {
      id: string;
      name: string;
      image: string;
      description: string;
      categories: {
        id: string;
        name: string;
        parentCategoryId: string;
      };
    };
  };
}

const UserContext = React.createContext<Partial<UserContextProps>>({})

export default UserContext
