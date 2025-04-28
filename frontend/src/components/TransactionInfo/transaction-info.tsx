import { useEffect, useState } from "react";
import { Transaction, TransactionInfoProps } from "../../models/model";
import { formatCurrency, formatDate } from "../../utils/functions";
import AnimatedLetters from "../AnimatedLetters/animated-letters";

import "./transaction-info.scss";

const TransactionInfo = ({ history }: TransactionInfoProps) => {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 4000);
  }, []);

  const getDateText = (tx: Transaction) => {
    return "[" + formatDate(tx.date) + "]";
  };

  const getTransactionText = (tx: Transaction) => {
    return tx.remitter + " → " + tx.beneficiary + ":" + " ";
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
            idx={0}
          />
          <br></br>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={getTransactionText(tx).split("")}
            idx={12}
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
