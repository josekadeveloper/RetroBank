import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateUser } from "../../store/storage";

type Props = Readonly<{
  onLogin: (username: string) => void;
}>;

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = validateUser(username, password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await user) {
      onLogin(username);
    } else {
      alert("Invalid credentials");
    }
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
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <button
        type="button"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
    </div>
  );
}
