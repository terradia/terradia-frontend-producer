import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("common");
  return (
    <div>
      {t("title")}
    </div>
  );
};

export default Home;
