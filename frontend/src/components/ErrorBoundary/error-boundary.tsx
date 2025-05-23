import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { ErrorBoundaryProps } from "../../models/model";

import "react-toastify/dist/ReactToastify.css";
import "./error-boundary.scss";

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  const [t] = useTranslation("global");

  toast.error(t("errors.toast-error"), {
    position: "top-center",
    autoClose: 5000,
  });

  return (
    <section className="terminal">
      <span className="error-boundary-icon">❌</span>
      <h1>{t("errors.error-boundary-h1")}</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>
        {t("errors.error-boundary-retry")}
      </button>
    </section>
  );
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
