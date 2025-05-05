import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import { ErrorBoundary } from "./components/ErrorBoundary/error-boundary";
import App from "./App";

import global_es from "./locales/es.json";
import global_en from "./locales/en.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ErrorBoundary>
  </I18nextProvider>
);
