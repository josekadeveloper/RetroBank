import { useEffect } from "react";

import { useValidateUser } from "../../hooks/use-validate-users.hook";

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
      try {
        const { data, error } = await refetch();

        if (data?.token) {
          onSuccess(data.token);
        } else if (error) {
          onError(error.message);
        }
      } catch (error) {
        onError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        onDone();
      }
    })();
  }, [onDone, onError, onSuccess, refetch, trigger]);

  return null;
}
