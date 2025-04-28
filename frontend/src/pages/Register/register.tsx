import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RegisterValidator from "../../components/RegisterValidator/register-validator";
import { toastNotification } from "../../components/ToastNotification/toast-notification";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";
import { Notification } from "../../models/model";

import "./register.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [error, setError] = useState("");
  const [exitStatus, setExitStatus] = useState(0);
  const navigate = useNavigate();
  const [letterClass, setLetterClass] = useState("text-animate");
  const [t] = useTranslation("global");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleSuccess = (exit: number) => {
    setExitStatus(exit);
    localStorage.setItem("username", JSON.stringify({ username }));
    navigate("/home");
  };

  const handleError = (error: string) => {
    setError(error);
  };

  useEffect(() => {
    if (error !== "" && !hasShownError) {
      toastNotification(Notification.ERROR, error);
      setHasShownError(true);
    } else if (exitStatus === 1) {
      toastNotification(Notification.SUCCESS, t("register.successful"));
    }
  }, [error, hasShownError, exitStatus, t]);

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  const back = () => {
    navigate("/");
  };

  return (
    <section className="terminal">
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={t("register.h1").split("")}
          idx={15}
        />
      </h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("register.username").split("")}
            idx={15}
          />
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSubmitting}
        />
        <label htmlFor="password">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("register.password").split("")}
            idx={15}
          />
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
        <label htmlFor="balance">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("register.balance").split("")}
            idx={15}
          />
        </label>
        <input
          id="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          onClick={() => setTriggerValidation(true)}
          disabled={isSubmitting}
        >
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("register.create-account").split("")}
            idx={15}
          />
        </button>
        <button onClick={() => back()}>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("register.back").split("")}
            idx={15}
          />
        </button>
      </form>
      {triggerValidation && (
        <RegisterValidator
          username={username}
          password={password}
          balance={parseInt(balance)}
          trigger={triggerValidation}
          onSuccess={handleSuccess}
          onError={handleError}
          onDone={handleDone}
        />
      )}
    </section>
  );
}
