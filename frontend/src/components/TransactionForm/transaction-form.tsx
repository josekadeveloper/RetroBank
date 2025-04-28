import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetUsers } from "../../hooks/use-get-users.hook";
import BalanceValidator from "../BalanceValidator/balance-validator";
import { toastNotification } from "../ToastNotification/toast-notification";
import AnimatedLetters from "../AnimatedLetters/animated-letters";
import { Notification } from "../../models/model";

import "./transaction-form.scss";

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
  const [letterClass, setLetterClass] = useState("text-animate");
  const [t] = useTranslation("global");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  }, []);

  const { data: usersList } = useGetUsers(remitter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount === "" || beneficiary === "") {
      toastNotification(Notification.ERROR, t("errors.transfer"));
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
              letterClass={letterClass}
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
            letterClass={letterClass}
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
            letterClass={letterClass}
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
