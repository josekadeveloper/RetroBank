import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUsers } from "../../hooks/use-get-users.hook";
import BalanceValidator from "../BalanceValidator/balance-validator";
import { toastNotification } from "../ToastNotification/toast-notification";
import AnimatedLetters from "../AnimatedLetters/animated-letters";
import { Notification } from "../../models/model";
import { useGetBalance } from "../../hooks/use-get-balance.hook";

import "./transaction-form.scss";

export default function TransactionForm() {
  const storedUser = localStorage.getItem("username");
  const remitter = storedUser ? JSON.parse(storedUser).username : null;
  const { data } = useGetBalance(remitter);
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const { data: usersList } = useGetUsers(remitter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      toastNotification(Notification.ERROR, t("errors.invalid-amount"));
      return;
    }

    if (numericAmount > (data?.balance ?? 0)) {
      toastNotification(
        Notification.ERROR,
        t("errors.insufficient-balance", { balance: data?.balance })
      );
      return;
    }

    if (!beneficiary || !usersList?.map(String).includes(beneficiary)) {
      toastNotification(Notification.ERROR, t("errors.select-beneficiary"));
      return;
    }

    setTriggerValidation(true);
    toastNotification(
      Notification.SUCCESS,
      `$${amount} ${t("transaction-form.sent-to")} ${beneficiary}`
    );
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
    <section className="transaction-form">
      <form onSubmit={handleSubmit}>
        <div className="transfer-to-container">
          <label htmlFor="transfer-to">
            <AnimatedLetters
              strArray={t("transaction-form.transfer-to").split("")}
              idx={15}
            />
          </label>
          <select
            id="transfer-to"
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">{t("transaction-form.select-user")}</option>
            {usersList?.map((name) => (
              <option key={name.toString()} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="amount">
          <AnimatedLetters
            strArray={t("transaction-form.amount").split("")}
            idx={15}
          />
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit">
          <AnimatedLetters
            strArray={t("transaction-form.send").split("")}
            idx={15}
          />
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
