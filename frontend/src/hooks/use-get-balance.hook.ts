import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../utils/constant";
import { Balance } from "../models/model";

export const useGetBalance = (username: string) =>
  useQuery<Balance>({
    queryKey: ["balance", username],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(`Error: ${errorDetails.message}!!`);
      } else {
        return res.json();
      }
    },
    enabled: !!username,
  });
