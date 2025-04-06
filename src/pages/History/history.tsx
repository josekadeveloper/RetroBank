import { useNavigate } from "react-router-dom";
import { getHistory } from "../../store/storage";

export default function History() {
  const navigate = useNavigate();
  const history = getHistory();

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
