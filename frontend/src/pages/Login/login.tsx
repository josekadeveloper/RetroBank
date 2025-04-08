import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserValidator from "../../components/UserValidator/user-validator";

// type Props = Readonly<{
//   onLogin: (username: string) => void;
// }>;

export default function Login() {
  console.log("Login component rendered");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    console.log("handleLogin", username, password);
    e.preventDefault();
    setIsSubmitting(true);
    setTriggerValidation(true);
  };

  const handleSuccess = () => {
    console.log("handleSuccess", username, password);
    // onLogin(username);
    navigate("/dashboard");
  };

  const handleError = (error: string) => {
    console.log("handleError", username, password, error);
    alert(error);
  };

  const handleDone = () => {
    console.log("handleDone", username, password);
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

        <button type="submit" disabled={isSubmitting}>
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

      <UserValidator
        username={username}
        password={password}
        trigger={triggerValidation}
        onSuccess={handleSuccess}
        onError={handleError}
        onDone={handleDone}
      />
    </div>
  );
}
