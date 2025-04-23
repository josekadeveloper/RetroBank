import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetUsers } from "../../hooks/use-get-users.hook";
import BalanceValidator from "../BalanceValidator/balance-validator";
import {
  Notification,
  toastNotification,
} from "../ToastNotification/toast-notification";

export default function TransactionForm() {
  const storedUser = localStorage.getItem("username");
  const remitter = storedUser ? JSON.parse(storedUser).username : null;
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { data: usersList } = useGetUsers(remitter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toastNotification(
      Notification.SUCCESS,
      `$${amount} sent to ${beneficiary}`
    );
    setTriggerValidation(true);
  };

  const handleSuccess = () => {
    navigate(`/history/${remitter}`);
  };

  const handleError = (error: string) => {
    setError(error);
    alert(error);
  };

  useEffect(() => {
    if (error !== "" && !hasShownError) {
      toastNotification(Notification.ERROR, error);
      setHasShownError(true);
    }
  }, [error, hasShownError]);

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transfer-to">Transfer to:</label>
        <select
          id="transfer-to"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">-- Select user --</option>
          {usersList?.map((name) => (
            <option key={name.toString()} value={name}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isSubmitting}
        />

        <button type="submit" disabled={isSubmitting}>
          Send
        </button>
      </form>

      {triggerValidation && (
        <BalanceValidator
          remitter={remitter}
          beneficiary={beneficiary}
          balance={Number(amount)}
          date={new Date().toLocaleString()}
          trigger={triggerValidation}
          onSuccess={handleSuccess}
          onError={handleError}
          onDone={handleDone}
        />
      )}
    </section>
  );
}
