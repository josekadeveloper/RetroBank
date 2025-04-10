import { useQuery } from "@tanstack/react-query";

import { Transaction } from "../models/model";
import { API_URL } from "../utils/constant";

export const useGetTransactions = (username: string) =>
  useQuery<Transaction[]>({
    queryKey: ["transactions", username],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/transactions-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
  });
