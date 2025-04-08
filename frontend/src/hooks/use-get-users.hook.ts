import { useQuery } from "@tanstack/react-query";
import { User } from "../models/model";
import { API_URL } from "../utils/constant";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
