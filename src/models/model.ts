export type Transaction = {
  to: string;
  from: string;
  amount: number;
  date: string;
};

export type User = {
  username: string;
  password: string;
  balance: number;
};
