import React from "react";
import { useTranslation } from "react-i18next";

import { SelectLanguageProps } from "../../models/model";

import "./select-language.scss";

const SelectLanguage: React.FC<SelectLanguageProps> = ({
  currentLanguage,
  onChangeLanguage,
}) => {
  const { i18n, t } = useTranslation("global");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeLanguage(e.target.value);

    if (e.target.value === "es") {
      i18n.changeLanguage("es");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <section className="select-language">
      <label htmlFor="language-select">{t("select-language.language")}</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">{t("select-language.english")}</option>
        <option value="es">{t("select-language.spanish")}</option>
      </select>
    </section>
  );
};

export default SelectLanguage;
