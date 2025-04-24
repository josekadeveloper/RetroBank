import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserValidator from "../../components/UserValidator/user-validator";
import {
  Notification,
  toastNotification,
} from "../../components/ToastNotification/toast-notification";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";

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
      toastNotification(Notification.SUCCESS, "Login successful");
    }
  }, [error, hasShownError, token]);

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
    <div className="terminal">
      <h1 className="cursor">
        <AnimatedLetters
          letterClass={letterClass}
          strArray={"RETRO BANK".split("")}
          idx={15}
        />
      </h1>
      <form onSubmit={handleLogin}>
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

        <button
          type="submit"
          onClick={() => setTriggerValidation(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"Logging in...".split("")}
              idx={15}
            />
          ) : (
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"Login".split("")}
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
          strArray={"Register".split("")}
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
    </div>
  );
}
