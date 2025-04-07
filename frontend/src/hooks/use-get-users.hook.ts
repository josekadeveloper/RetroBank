import { useQuery } from "@tanstack/react-query";
import { User } from "../models/model";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://retro-bank-backend.vercel.app/api/users"
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
