import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Spinner from "./spinner";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function SpinnerWrapper({ children }: Props) {
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
