import { MOCK_USERS } from "../mock/mock-data";
import { Transaction, User } from "../models/model";

const USERS_KEY = "retro_users";
const HISTORY_KEY = "retro_history";

export const getUsers = (): User[] => {
  return MOCK_USERS;
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (username: string, password: string): boolean => {
  const users = getUsers();
  if (users.find((u) => u.username === username)) return false;
  users.push({ username, password, balance: 1000 });
  saveUsers(users);
  return true;
};

export const validateUser = (
  username: string,
  password: string
): User | null => {
  const user = getUsers().find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};

export const updateBalance = (from: string, to: string, amount: number) => {
  const users = getUsers();
  const sender = users.find((u) => u.username === from);
  const receiver = users.find((u) => u.username === to);
  if (!sender || !receiver) return false;
  if (sender.balance < amount) return false;

  sender.balance -= amount;
  receiver.balance += amount;
  saveUsers(users);
  return true;
};

export const getUserBalance = (username: string): number => {
  const user = getUsers().find((u) => u.username === username);
  return user?.balance ?? 0;
};

export const getHistory = (): Transaction[] => {
  return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
};

export const saveTransaction = (tx: Transaction) => {
  const history = getHistory();
  history.unshift(tx);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};
