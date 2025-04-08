import { Transaction, User } from "../models/model";
import { API_URL } from "../utils/constant";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`${API_URL}/api/users`);
    if (!res.ok) {
      throw new Error("Error fetching users");
    }
    const users = await res.json();
    return users;
  } catch (err) {
    console.error("Failed to get users:", err);
    return [];
  }
};

export const registerUser = async (
  username: string,
  password: string,
  balance: number
): Promise<boolean> => {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, balance }),
  });

  return res.ok;
};

export const validateUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) return null;
  return await res.json();
};

export const getUserBalance = async (username: string): Promise<number> => {
  const res = await fetch(`${API_URL}balance/${username}`);
  if (!res.ok) return 0;
  const user: User = await res.json();
  return Number(user.balance);
};

export const updateBalance = async (
  from: string,
  to: string,
  amount: number
): Promise<boolean> => {
  const res = await fetch(`${API_URL}transfer`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, amount }),
  });

  return res.ok;
};

export const getHistory = async (): Promise<Transaction[]> => {
  const res = await fetch(`${API_URL}/api/history`);
  if (!res.ok) return [];
  return await res.json();
};

export const saveTransaction = async (tx: Transaction) => {
  await fetch(`${API_URL}history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });
};
