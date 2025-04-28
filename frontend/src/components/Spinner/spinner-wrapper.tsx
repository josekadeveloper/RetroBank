import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { SpinnerWrapperProps } from "../../models/model";

import Spinner from "./spinner";

export default function SpinnerWrapper({ children }: SpinnerWrapperProps) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) return <Spinner />;

  return <>{children}</>;
}
