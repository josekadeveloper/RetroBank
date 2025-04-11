import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../utils/constant";
import { Balance } from "../models/model";

export const useUpdateBalance = (
  remitter: string,
  beneficiary: string,
  balance: number,
  date: string
) =>
  useQuery<Balance>({
    queryKey: ["updatebalance", remitter, beneficiary, balance, date],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/update-balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remitter, beneficiary, balance }),
      });
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(`Error: ${errorDetails.message}!!`);
      } else {
        return res.json();
      }
    },
    enabled: !!remitter && !!beneficiary && !!balance && !!date,
  });
