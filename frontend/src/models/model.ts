export type Transaction = {
  remitter: string;
  beneficiary: string;
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

export type TransactionInfoProps = {
  history: Transaction[];
};

export type UserValidatorsProps = {
  username: string;
  password: string;
  trigger: boolean;
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export type RegisterValidatorProps = {
  username: string;
  password: string;
  balance: number;
  trigger: boolean;
  onSuccess: (balance: number) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export type BalanceValidatorProps = {
  remitter: string;
  beneficiary: string;
  balance: number;
  date: string;
  trigger: boolean;
  onSuccess: (balance: number) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export enum Notification {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export type SpinnerWrapperProps = {
  readonly children: React.ReactNode;
};

export type ErrorBoundaryProps = {
  readonly children: React.ReactNode;
};

export type SelectLanguageProps = {
  currentLanguage: string;
  onChangeLanguage: (language: string) => void;
};
