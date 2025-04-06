import { useState } from "react";

import { registerUser } from "../../store/storage";

type Props = {
  readonly onRegister: (username: string) => void;
};

export default function Register({ onRegister }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerUser(username, password)) {
      alert("User registered!");
      onRegister(username);
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

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
