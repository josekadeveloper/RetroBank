import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getHistory } from "../../store/storage";
import { Transaction } from "../../models/model";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const data = await getHistory();
      setHistory(data);
    }
    fetchHistory();
  }, []);

  return (
    <div className="terminal">
      <h1>Transaction History</h1>
      <ul>
        {history.map((tx, idx) => (
          <li key={idx}>
            [{tx.date}] {tx.from} → {tx.to}: ${tx.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
