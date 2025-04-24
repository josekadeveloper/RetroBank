import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterValidator from "../../components/RegisterValidator/register-validator";
import {
  Notification,
  toastNotification,
} from "../../components/ToastNotification/toast-notification";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";

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
      toastNotification(Notification.SUCCESS, "Register successful");
    }
  }, [error, hasShownError, exitStatus]);

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  const back = () => {
    navigate("/");
  };

  return (
    <div className="terminal">
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={"REGISTER".split("")}
          idx={15}
        />
      </h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Username:".split("")}
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
            strArray={"Password:".split("")}
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
            strArray={"Balance:".split("")}
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
            strArray={"Create Account".split("")}
            idx={15}
          />
        </button>
        <button onClick={() => back()}>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Back".split("")}
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
    </div>
  );
}
