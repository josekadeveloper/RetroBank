import { ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type Props = Readonly<{
  children: ReactNode;
}>;

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  toast.error("Algo salió mal. Por favor, recarga la página.", {
    position: "top-center",
    autoClose: 5000,
  });

  return (
    <div className="error-boundary">
      <h1>❌ Error inesperado</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );
}

export function ErrorBoundary({ children }: Props) {
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
