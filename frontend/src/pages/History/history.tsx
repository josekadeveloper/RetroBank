import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Transaction } from "../../models/model";
import { useGetTransactions } from "../../hooks/use-get-transactions.hook";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";
import { TransactionInfo } from "../../components/TransactionInfo/transaction-info";

import "./history.scss";

export default function History() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username");
  const remitter = storedUser ? JSON.parse(storedUser).username : null;
  const { data, isLoading, error } = useGetTransactions(remitter);
  const [t, i18n] = useTranslation("global");

  const history: Transaction[] = data ?? [];
  const isEmpty = !isLoading && history.length === 0;

  if (error) {
    return (
      <section className="terminal">
        <h1 className="history-title">
          <AnimatedLetters strArray={error?.message.split("")} idx={3} />
        </h1>
        <button onClick={() => navigate(-1)}>
          <AnimatedLetters
            strArray={t("transactions-history.back").split("")}
            idx={12}
          />
        </button>
      </section>
    );
  }

  return (
    <section className="terminal">
      <h1 className="history-title">
        <AnimatedLetters
          strArray={t("transactions-history.h1").split("")}
          idx={i18n.language === "en" ? 12 : 5}
        />
      </h1>

      {isLoading ? (
        <p className="loading">
          <AnimatedLetters
            strArray={t("transactions-history.loading").split("")}
            idx={15}
          />
        </p>
      ) : isEmpty ? (
        <ul className="transaction-info">
          <AnimatedLetters
            strArray={t("transactions-history.empty").split("")}
            idx={i18n.language === "en" ? 0 : -3}
          />
        </ul>
      ) : (
        <TransactionInfo history={history} />
      )}

      <button onClick={() => navigate(-1)}>
        <AnimatedLetters
          strArray={t("transactions-history.back").split("")}
          idx={12}
        />
      </button>
    </section>
  );
}
