import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useRegisterUser } from "../../hooks/use-register-user.hook";
import { RegisterValidatorProps } from "../../models/model";

export default function RegisterValidator({
  username,
  password,
  balance,
  trigger,
  onSuccess,
  onError,
  onDone,
}: RegisterValidatorProps) {
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
