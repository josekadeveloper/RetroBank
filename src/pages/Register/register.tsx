import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = Readonly<{
  onRegister: (username: string) => void;
}>;

export default function Register({ onRegister }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://retro-bank.vercel.app/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar usuario");
      }

      const data = await response.json();
      onRegister(data.user.username);
      navigate("/");
    } catch (error) {
      alert("Registro fallido: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="terminal">
      <h1>REGISTRO</h1>
      <form onSubmit={handleRegister}>
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
          onChange={(e) => setBalance(Number(e.target.value))}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Register"}
        </button>
      </form>
      <button type="button" onClick={() => navigate("/")}>
        Volver al login
      </button>
    </div>
  );
}
