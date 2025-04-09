import { useState } from "react";

import { useGetUsers } from "../../hooks/use-get-users.hook";
import BalanceValidator from "../BalanceValidator/balance-validator";

export default function TransactionForm() {
  const remitter = localStorage.getItem("username") ?? "";
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const { data: usersList } = useGetUsers();
  console.log("usersList", usersList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = +amount;
    if (!beneficiary || isNaN(amt) || amt <= 0) return;

    // const success = updateBalance(user, to, amt);
    // if (!success) {
    //   alert("Insufficient balance or user not found");
    //   return;
    // }

    // saveTransaction({
    //   from: user,
    //   to,
    //   amount: amt,
    //   date: new Date().toLocaleString(),
    // });

    alert(`$${amt} sent to ${beneficiary}`);
    setAmount("");
    setBeneficiary("");
  };

  const handleSuccess = () => {
    // navigate("/history:username");
  };

  const handleError = (error: string) => {
    alert(error);
  };

  const handleDone = () => {
    setIsSubmitting(false);
    setTriggerValidation(false);
  };

  return (
    <section>
      <form>
        <label htmlFor="transfer-to">Transfer to:</label>
        <select
          id="transfer-to"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">-- Select user --</option>
          {usersList?.map((u) => (
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
          disabled={isSubmitting}
        />

        <button type="submit" onSubmit={handleSubmit} disabled={isSubmitting}>
          Send
        </button>
      </form>

      {triggerValidation && (
        <BalanceValidator
          remitter={remitter}
          beneficiary={beneficiary}
          balance={Number(amount)}
          date={new Date().toLocaleString()}
          trigger={triggerValidation}
          onSuccess={handleSuccess}
          onError={handleError}
          onDone={handleDone}
        />
      )}
    </section>
  );
}
