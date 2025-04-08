import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../utils/constant";
import { Balance } from "../models/model";

export const useGetBalance = (username: string) =>
  useQuery<Balance>({
    queryKey: ["user", username],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    enabled: !!username,
  });
