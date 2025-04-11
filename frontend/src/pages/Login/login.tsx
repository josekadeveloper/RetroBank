import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserValidator from "../../components/UserValidator/user-validator";
import {
  Notification,
  toastNotification,
} from "../../components/ToastNotification/toast-notification";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleError = (error: string) => {
    setError(error);
    setHasShownError(false);
  };

  useEffect(() => {
    if (error !== "" && !hasShownError) {
      toastNotification(Notification.ERROR, error);
      setHasShownError(true);
    } else if (token !== "") {
      toastNotification(Notification.SUCCESS, "Login successful");
    }
  }, [error, hasShownError, token]);

  const handleSuccess = (token: string) => {
    setToken(token);
    localStorage.setItem("username", JSON.stringify({ username }));
    navigate("/home");
  };

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  return (
    <div className="terminal">
      <h1>RETRO BANK</h1>
      <form onSubmit={handleLogin}>
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

        <button
          type="submit"
          onClick={() => setTriggerValidation(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => navigate("/register")}
        disabled={isSubmitting}
      >
        Register
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
    </div>
  );
}
