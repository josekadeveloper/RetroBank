import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserBalance } from "../../store/storage";
import TransactionForm from "../../components/transaction-form";

type Props = {
  readonly user: string;
  readonly onLogout: () => void;
};

export default function Home({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    setBalance(getUserBalance(user));
  }, [user]);

  return (
    <div className="terminal">
      <h1>WELCOME, {user.toUpperCase()}</h1>
      <p>Balance: ${balance.toFixed(2)}</p>
      <TransactionForm user={user} />
      <button onClick={() => navigate("/history")}>View History</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
