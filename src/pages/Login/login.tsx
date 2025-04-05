import { useState } from "react";

import "../../index.scss";

type Props = {
  onLogin: (username: string) => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) onLogin(username);
  };

  return (
    <div className="terminal">
      <h1>RETRO BANK TERMINAL</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">LOGIN:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
