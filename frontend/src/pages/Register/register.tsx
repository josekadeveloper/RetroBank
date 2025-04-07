import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../store/storage";

type Props = {
  readonly onRegister: (username: string) => void;
};

export default function Register({ onRegister }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await registerUser(username, password, parseInt(balance))) {
      alert("User registered!");
      onRegister(username);
      navigate("/");
    } else {
      alert("Username already exists.");
    }
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
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="balance">Balance:</label>
        <input
          id="balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
