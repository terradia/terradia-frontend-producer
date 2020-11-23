export interface Review {
  id: string;
  title: string;
  description: string;
  customerMark: number;
  createdAt: string;
  reply: string;
  customer: {
    id: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
}
