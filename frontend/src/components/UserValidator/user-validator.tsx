import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useValidateUser } from "../../hooks/use-validate-users.hook";
import { UserValidatorsProps } from "../../models/model";

export default function UserValidator({
  username,
  password,
  trigger,
  onSuccess,
  onError,
  onDone,
}: UserValidatorsProps) {
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
