import { useEffect } from "react";
import { useRegisterUser } from "../../hooks/use-register-user.hook";

type Props = {
  username: string;
  password: string;
  balance: number;
  trigger: boolean;
  onSuccess: (balance: number) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export default function RegisterValidator({
  username,
  password,
  balance,
  trigger,
  onSuccess,
  onError,
  onDone,
}: Props) {
  const { refetch } = useRegisterUser(username, password, balance);

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      const { data, error } = await refetch();
      if (data) {
        const exit = 1;
        onSuccess(exit);
      } else {
        onError(error?.message ?? "Invalid credentials");
      }
      onDone();
    })();
  }, [onDone, onError, onSuccess, refetch, trigger]);

  return null;
}
