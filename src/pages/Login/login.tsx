import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = Readonly<{
  onLogin: (username: string) => void;
}>;

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://retro-bank.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      onLogin(data.user.username); // o `data.user.id` si prefieres
      navigate("/home");
    } catch (error) {
      alert("Login fallido: " + (error as Error).message);
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button type="button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}
