import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useUpdateBalance } from "../../hooks/use-update-balance.hook";
import { BalanceValidatorProps } from "../../models/model";

export default function BalanceValidator({
  remitter,
  beneficiary,
  balance,
  date,
  trigger,
  onSuccess,
  onError,
  onDone,
}: BalanceValidatorProps) {
  const { refetch } = useUpdateBalance(remitter, beneficiary, balance, date);
  const [t] = useTranslation("global");

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      const { data, error } = await refetch();
      if (data) {
        onSuccess(data.balance);
      } else {
        onError(error?.message ?? t("errors.invalid-credentials"));
      }
      onDone();
    })();
  }, [onDone, onError, onSuccess, refetch, trigger, t]);

  return null;
}
