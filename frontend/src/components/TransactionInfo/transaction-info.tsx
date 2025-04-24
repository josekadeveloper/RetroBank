import { useEffect, useState } from "react";
import { Transaction } from "../../models/model";
import { formatCurrency, formatDate } from "../../utils/functions";
import AnimatedLetters from "../AnimatedLetters/animated-letters";

import "./transaction-info.scss";

interface TransactionInfoProps {
  history: Transaction[];
}

const TransactionInfo = ({ history }: TransactionInfoProps) => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  }, []);

  const getDateText = (tx: Transaction) => {
    return (
      "[" +
      formatDate(tx.date) +
      "]" +
      " " +
      tx.remitter +
      " → " +
      tx.beneficiary +
      ":" +
      " "
    );
  };

  const getCurrencyText = (tx: Transaction) => {
    return formatCurrency(Number(tx.amount)) + "";
  };

  return (
    <ul className="transaction-info">
      {history.map((tx, idx) => (
        <li key={idx}>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={getDateText(tx).split("")}
            idx={-15}
          />
          <AnimatedLetters
            letterClass={letterClass}
            strArray={getCurrencyText(tx).split("")}
            idx={12}
          />
        </li>
      ))}
    </ul>
  );
};

export default TransactionInfo;
