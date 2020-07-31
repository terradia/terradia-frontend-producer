import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Home = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      {t("title")}
      <button onClick={() => i18n.changeLanguage("fr")}>fr</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
    </div>
  );
};

export default Home;
