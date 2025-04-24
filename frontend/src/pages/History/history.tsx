import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Transaction } from "../../models/model";
import { useGetTransactions } from "../../hooks/use-get-transactions.hook";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";
import TransactionInfo from "../../components/TransactionInfo/transaction-info";

export default function History() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username");
  const remitter = storedUser ? JSON.parse(storedUser).username : null;
  const { data } = useGetTransactions(remitter);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  }, []);

  useEffect(() => {
    const transactions = [] as Transaction[];
    data?.map((transaction) => {
      transactions.push(transaction);
    });
    setHistory(transactions);
  }, [data]);

  return (
    <div className="terminal">
      <h1>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={"Transactions History".split("")}
          idx={12}
        />
      </h1>
      <TransactionInfo history={history} />
      <button onClick={() => navigate(-1)}>
        <AnimatedLetters
          letterClass={letterClass}
          strArray={"Back".split("")}
          idx={12}
        />
      </button>
    </div>
  );
}
