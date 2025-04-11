import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterValidator from "../../components/RegisterValidator/register-validator";
import {
  Notification,
  toastNotification,
} from "../../components/ToastNotification/toast-notification";

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

  return (
    <div className="terminal">
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />

        <label htmlFor="balance">Balance:</label>
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
          Create Account
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
