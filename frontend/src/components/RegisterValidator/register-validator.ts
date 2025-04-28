import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      const { data, error } = await refetch();
      if (data) {
        const exit = 1;
        onSuccess(exit);
      } else {
        onError(error?.message ?? t("errors.invalid-credentials"));
      }
      onDone();
    })();
  }, [onDone, onError, onSuccess, refetch, trigger, t]);

  return null;
}
