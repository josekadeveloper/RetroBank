// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import TransactionForm from "../../components/TransactionForm/transaction-form";
import { useGetBalance } from "../../hooks/use-get-balance.hook";

export default function Home() {
  const navigate = useNavigate();

  const actualUserName = localStorage.getItem("username");
  const balance = useGetBalance(actualUserName?.toString() ?? "");

  const onLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="terminal">
      <h1>WELCOME, {actualUserName?.toUpperCase()}</h1>
      <p>Balance: ${balance.data?.balance.toFixed(2)}</p>
      {/* <TransactionForm user={user.username} /> */}
      {/* <button onClick={() => navigate("/history")}>View History</button> */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
