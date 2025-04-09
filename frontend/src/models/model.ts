export type Transaction = {
  to: string;
  from: string;
  amount: number;
  date: string;
};

export type Balance = {
  balance: number;
};

export type UserList = string[];

export type User = {
  username: string;
  password: string;
  balance: Balance;
};

export type LoginResponse = {
  user: User;
  token: string;
};
