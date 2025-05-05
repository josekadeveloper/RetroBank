import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import TransactionForm from "../../components/TransactionForm/transaction-form";
import { useGetBalance } from "../../hooks/use-get-balance.hook";
import AnimatedLetters from "../../components/AnimatedLetters/animated-letters";

export default function Home() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("username");
  const actualUserName = storedUser ? JSON.parse(storedUser).username : null;
  const { data } = useGetBalance(actualUserName);
  const [balance, setBalance] = useState<number | null>(null);
  const [t] = useTranslation("global");
  const homeTitle = t("home.h1") + actualUserName?.toUpperCase();

  useEffect(() => {
    if (data?.balance !== undefined) {
      setBalance(data.balance);
    }
  }, [data?.balance]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <section className="terminal">
      <h1>
        <AnimatedLetters strArray={homeTitle.split("")} idx={15} />
      </h1>
      <p>
        <AnimatedLetters strArray={t("home.balance").split("")} idx={15} />
        {balance !== null ? (
          <AnimatedLetters strArray={balance.toString().split("")} idx={15} />
        ) : (
          <AnimatedLetters strArray={t("home.loading").split("")} idx={15} />
        )}
      </p>
      <TransactionForm />
      <button onClick={() => navigate(`/history/${actualUserName}`)}>
        <AnimatedLetters strArray={t("home.history").split("")} idx={15} />
      </button>
      <button onClick={onLogout}>
        <AnimatedLetters strArray={t("home.logout").split("")} idx={15} />
      </button>
    </section>
  );
}
