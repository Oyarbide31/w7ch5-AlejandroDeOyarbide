export type User = {
  id: string;
  userName: string;
  passwd: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
};

export type UserLoginData = {
  userName: string;
  passwd: string;
  email: string;
};
