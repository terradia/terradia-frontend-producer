// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  validated: boolean;
  phone: string;
  password: string;
  avatar: string;
  companies: {
    id;
  };
};
