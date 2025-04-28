import { useTranslation } from "react-i18next";

import "./not-found.scss";

export default function NotFound() {
  const [t] = useTranslation("global");

  localStorage.removeItem("token");

  return (
    <section className="terminal">
      <span className="not-found-icon">⚠️</span>
      <h1>{t("not-found.h1")}</h1>
      <p>{t("not-found.info")}</p>
    </section>
  );
}
