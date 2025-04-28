import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import UserValidator from "../../components/UserValidator/user-validator";
import { toastNotification } from "../../components/ToastNotification/toast-notification";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";
import SelectLanguage from "../../components/SelectLanguage/select-language";
import { Notification } from "../../models/model";

import "./login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken).username : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [letterClass, setLetterClass] = useState("text-animate");
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleError = (error: string) => {
    setError(error);
    setHasShownError(false);
  };

  useEffect(() => {
    if (token === null && error !== "" && !hasShownError) {
      toastNotification(Notification.ERROR, error);
      setHasShownError(true);
    } else if (token !== null) {
      toastNotification(Notification.SUCCESS, t("login.successful"));
    }
  }, [error, hasShownError, token, t]);

  const handleSuccess = (token: string) => {
    localStorage.setItem("token", JSON.stringify({ token }));
    localStorage.setItem("username", JSON.stringify({ username }));
    navigate("/home");
  };

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  return (
    <section className="terminal">
      <SelectLanguage
        currentLanguage={language}
        onChangeLanguage={handleLanguageChange}
      />
      <h1 className="cursor">
        <AnimatedLetters
          letterClass={letterClass}
          strArray={t("login.h1").split("")}
          idx={15}
        />
      </h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={t("login.username").split("")}
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
            strArray={t("login.password").split("")}
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
        <button
          type="submit"
          onClick={() => setTriggerValidation(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t("login.loggin-in").split("")}
              idx={15}
            />
          ) : (
            <AnimatedLetters
              letterClass={letterClass}
              strArray={t("login.login").split("")}
              idx={15}
            />
          )}
        </button>
      </form>
      <button
        type="button"
        onClick={() => navigate("/register")}
        disabled={isSubmitting}
      >
        <AnimatedLetters
          letterClass={letterClass}
          strArray={t("login.register").split("")}
          idx={15}
        />
      </button>
      {triggerValidation && (
        <UserValidator
          username={username}
          password={password}
          trigger={triggerValidation}
          onSuccess={handleSuccess}
          onError={handleError}
          onDone={handleDone}
        />
      )}
    </section>
  );
}
