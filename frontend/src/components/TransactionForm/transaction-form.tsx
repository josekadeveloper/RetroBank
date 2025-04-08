import { useEffect, useState } from "react";
import { getUsers, saveTransaction, updateBalance } from "../store/storage";

type Props = {
  readonly user: string;
};

export default function TransactionForm({ user }: Props) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState<{ username: string }[]>([]);

  useEffect(() => {
    getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers.filter((u) => u.username !== user));
    });
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = +amount;
    if (!to || isNaN(amt) || amt <= 0) return;

    const success = updateBalance(user, to, amt);
    if (!success) {
      alert("Insufficient balance or user not found");
      return;
    }

    saveTransaction({
      from: user,
      to,
      amount: amt,
      date: new Date().toLocaleString(),
    });

    alert(`$${amt} sent to ${to}`);
    setAmount("");
    setTo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="transfer-to">Transfer to:</label>
      <select
        id="transfer-to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="">-- Select user --</option>
        {users.map((u) => (
          <option key={u.username} value={u.username}>
            {u.username}
          </option>
        ))}
      </select>

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
}
