import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      try {
        const { data, error } = await refetch();

        if (error) {
          onError(error.message);
        } else if (data?.token) {
          onSuccess(data?.token);
        }
      } catch (error) {
        onError(
          error instanceof Error ? error.message : t("errors.unexpected")
        );
      } finally {
        onDone();
      }
    })();
  }, [onDone, onError, onSuccess, refetch, trigger, t]);

  return null;
}
