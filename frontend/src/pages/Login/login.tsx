import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useValidateUser } from "../../hooks/use-validate-users";

type Props = Readonly<{
  onLogin: (username: string) => void;
}>;

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const validateUser = useValidateUser(username, password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data, error } = await validateUser.refetch();

    if (data?.token) {
      onLogin(username);
    } else {
      alert(error?.message ?? "Invalid credentials");
    }

    setIsSubmitting(false);
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
        onClick={() => {
          navigate("/register");
        }}
        disabled={isSubmitting}
      >
        Register
      </button>
    </div>
  );
}
