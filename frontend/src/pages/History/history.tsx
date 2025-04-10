import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Transaction } from "../../models/model";
import { useGetTransactions } from "../../hooks/use-get-transactions.hook";
import { formatCurrency, formatDate } from "../../utils/functions";

export default function History() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username");
  const remitter = storedUser ? JSON.parse(storedUser).username : null;
  const { data } = useGetTransactions(remitter);
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    const transactions = [] as Transaction[];
    data?.map((transaction) => {
      transactions.push(transaction);
    });
    setHistory(transactions);
  }, [data]);

  return (
    <div className="terminal">
      <h1>Transaction History</h1>
      <ul>
        {history.map((tx, idx) => (
          <li key={idx}>
            [{formatDate(tx.date)}] {tx.beneficiary} → {tx.remitter}:{" "}
            {formatCurrency(Number(tx.amount))}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
