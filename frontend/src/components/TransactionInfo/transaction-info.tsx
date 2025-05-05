import { Transaction, TransactionInfoProps } from "../../models/model";
import AnimatedLetters from "../AnimatedLetters/animated-letters";
import { formatCurrency, formatDate } from "../../utils/functions";

import "./transaction-info.scss";

export const TransactionInfo = ({ history }: TransactionInfoProps) => {
  const getDateText = (tx: Transaction) => formatDate(tx.date);
  const getTransactionText = (tx: Transaction) =>
    `${tx.remitter} → ${tx.beneficiary}: `;
  const getCurrencyText = (tx: Transaction) =>
    formatCurrency(Number(tx.amount));

  return (
    <ul className="transaction-info">
      {history.map((tx, idx) => (
        <li key={idx}>
          <AnimatedLetters strArray={getDateText(tx).split("")} idx={3} />
          <br />
          <AnimatedLetters
            strArray={getTransactionText(tx).split("")}
            idx={12}
          />
          <AnimatedLetters strArray={getCurrencyText(tx).split("")} idx={12} />
        </li>
      ))}
    </ul>
  );
};
