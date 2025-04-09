import { useEffect } from "react";

import { useUpdateBalance } from "../../hooks/use-update-balance.hook";

type Props = {
  remitter: string;
  beneficiary: string;
  balance: number;
  date: string;
  trigger: boolean;
  onSuccess: (balance: number) => void;
  onError: (error: string) => void;
  onDone: () => void;
};

export default function BalanceValidator({
  remitter,
  beneficiary,
  balance,
  date,
  trigger,
  onSuccess,
  onError,
  onDone,
}: Props) {
  const { refetch } = useUpdateBalance(remitter, beneficiary, balance, date);

  useEffect(() => {
    if (!trigger) return;

    (async () => {
      const { data, error } = await refetch();
      if (data) {
        onSuccess(data.balance);
      } else {
        onError(error?.message ?? "Invalid credentials");
      }
      onDone();
    })();
  }, [onDone, onError, onSuccess, refetch, trigger]);

  return null;
}
