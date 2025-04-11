import { useQuery } from "@tanstack/react-query";

import { UserList } from "../models/model";
import { API_URL } from "../utils/constant";

export const useGetUsers = (username: string) =>
  useQuery<UserList[]>({
    queryKey: ["userNamesList", username],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/users`, {
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
  });
