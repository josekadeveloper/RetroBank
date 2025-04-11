import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../utils/constant";
import { Balance } from "../models/model";

export const useRegisterUser = (
  username: string,
  password: string,
  balance: number
) =>
  useQuery<Balance>({
    queryKey: ["newuser", username, password, balance],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, balance }),
      });
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(`Error: ${errorDetails.message}!!`);
      } else {
        return res.json();
      }
    },
    enabled: !!username && !!password && !!balance,
  });
