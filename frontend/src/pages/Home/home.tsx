// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import TransactionForm from "../../components/TransactionForm/transaction-form";
import { useGetBalance } from "../../hooks/use-get-balance.hook";

export default function Home() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("username");
  const actualUserName = storedUser ? JSON.parse(storedUser).username : null;
  console.log("actualUserName", actualUserName);
  const balance = useGetBalance(actualUserName);
  console.log("balance", balance);

  const onLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="terminal">
      <h1>WELCOME, {actualUserName?.toUpperCase()}</h1>
      <p>Balance: $</p>
      {/* <TransactionForm user={user.username} /> */}
      {/* <button onClick={() => navigate("/history")}>View History</button> */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
