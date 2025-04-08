import { useEffect } from "react";
import { useValidateUser } from "../../hooks/use-validate-users";

type Props = {
  username: string;
  password: string;
  trigger: boolean;
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export default function UserValidator({
  username,
  password,
  trigger,
  onSuccess,
  onError,
  onDone,
}: Props) {
  const { refetch } = useValidateUser(username, password);

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      const { data, error } = await refetch();
      if (data?.token) {
        onSuccess(data.token);
      } else {
        onError(error?.message ?? "Invalid credentials");
      }
      onDone();
    })();
  }, [onDone, onError, onSuccess, refetch, trigger]);

  return null;
}
