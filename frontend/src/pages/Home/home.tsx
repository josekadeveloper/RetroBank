import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TransactionForm from "../../components/TransactionForm/transaction-form";
import { useGetBalance } from "../../hooks/use-get-balance.hook";

export default function Home() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username");
  const actualUserName = storedUser ? JSON.parse(storedUser).username : null;
  const { data } = useGetBalance(actualUserName);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (data?.balance !== undefined) {
      setBalance(data.balance);
    }
  }, [data?.balance]);

  const onLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="terminal">
      <h1>WELCOME, {actualUserName?.toUpperCase()}</h1>
      <p>Balance: ${balance ?? "Loading..."}</p>
      <TransactionForm />
      <button onClick={() => navigate(`/history/${actualUserName}`)}>
        View History
      </button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
