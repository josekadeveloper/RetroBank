import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../utils/constant";
import { LoginResponse } from "../models/model";

export const useValidateUser = (username: string, password: string) =>
  useQuery<LoginResponse>({
    queryKey: ["user", username],
    queryFn: async () => {
      console.log("Username:", username);
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    enabled: !!username && !!password,
  });
